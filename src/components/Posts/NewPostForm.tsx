// Creating multitab component using State

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import React, { useState } from "react";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, firestore, storage } from "@/src/firebase/clientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

import { BiPoll } from "react-icons/bi";
import DraftEditor from "./PostForm/DraftEditor";
import ImageUpload from "./PostForm/ImageUpload";
import PageContent from "../Layout/PageContent";
import { Post } from "@/src/atoms/postAtoms";
import TabItem from "./TabItem";
import TextInputs from "./PostForm/TextInputs";
import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

type NewPostFormProps = {
  user?: User | null;
};

const formTabs: TabItem[] = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images & Video",
    icon: IoImageOutline,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },

  {
    title: "Talk",
    icon: BsMic,
  },
];

export type TabItem = {
  title: string;
  icon: typeof Icon.arguments;
};

const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
  // formTabs.map((item) => console.log(item));
  //We need to know at which Tabitem we are currently clicked on because the style changed and it also changes which component we are actually seeing in the form so we need some form of state to track which tabitem is currently selected

  const router = useRouter();

  // State variables
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);

  // Textinputs State

  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const [selectedFile, setSelectedFile] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //~ function that is responsible for handling post
  const handleCreatePost = async () => {
    const { communityId } = router.query;

    ///CREATE NEW POST OBJECT  => type Post

    const newPost: Post = {
      communityId: communityId as string,
      creatorId: user?.uid,
      creatorDisplayName: user?.displayName || user?.email?.split("@")[0],
      title: textInputs.title,
      body: textInputs.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
    };

    // Storing the post in db

    setLoading(true);

    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);

      //check for selectFile

      if (selectedFile) {
        //store in storage => getDownloadUrl(return imageURL)

        // Create a child image reference with path delimited by '/'
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");

        const downloadURL = await getDownloadURL(imageRef);

        // updating post doc by the community
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
      }

      //redirect the user back to the community using the router
      router.back();
    } catch (error: any) {
      console.log("handleCreatePost Error", error.message);
      setError(true);
    }

    setLoading(false);
  };
  //~ function onselectImage
  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Reading the event.target.files
    // reading file

    const reader = new FileReader();
    if (event.target.files?.[0]) {
      // console.log(event.target.files);
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };

  // const onSelectDocs = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   // Reading the event.target.files
  //   // reading file

  //   const reader = new FileReader();
  //   if (event.target.files?.[0]) {
  //     // console.log(event.target.files);
  //     reader.readAsDataURL(event.target.files[0]);
  //   }

  //   reader.onload = (readerEvent) => {
  //     if (readerEvent.target?.result) {
  //       setSelectedFile(readerEvent.target.result as string);
  //     }
  //   };
  // };
  // // function that will handle when user click on input field
  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;

    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      {/* Flex for navbar */}
      <Flex width="100%">
        {formTabs.map((item) => (
          <TabItem
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
            key={item.title}
          />
        ))}
      </Flex>

      <Flex p={4}>
        {selectedTab === "Post" && (
          <TextInputs
            textInputs={textInputs}
            handleCreatePost={handleCreatePost}
            onChange={onTextChange}
            loading={loading}
          />
          // <DraftEditor
          //   textInputs={textInputs}
          //   handleCreatePost={handleCreatePost}
          //   onChange={onTextChange}
          //   loading={loading}
          // />
        )}

        {selectedTab === "Images & Video" && (
          <ImageUpload
            selectedFile={selectedFile}
            onSelectImage={onSelectImage}
            setSelectedTab={setSelectedTab}
            setSelectedFile={setSelectedFile}
          />
        )}
      </Flex>

      {error && (
        <Alert status="error">
          <AlertIcon />
          <Text mr={2}>Error Creating Post</Text>
        </Alert>
      )}
    </Flex>
  );
};
export default NewPostForm;
