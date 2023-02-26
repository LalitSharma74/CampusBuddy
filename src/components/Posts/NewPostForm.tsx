// Creating multitab component using State

import { Box, Flex, Icon, Text } from "@chakra-ui/react";

import React, { useState } from "react";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { BiPoll } from "react-icons/bi";
import PageContent from "../Layout/PageContent";
import { BsMic, BsLink45Deg } from "react-icons/bs";
import TabItem from "./TabItem";
import TextInputs from "./PostForm/TextInputs";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";

type NewPostFormProps = {};

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

const NewPostForm: React.FC<NewPostFormProps> = () => {
  // formTabs.map((item) => console.log(item));
  //We need to know at which Tabitem we are currently clicked on because the style changed and it also changes which component we are actually seeing in the form so we need some form of state to track which tabitem is currently selected

  // State variables
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);

  // Textinputs State

  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const [selectedFile, setSelectedFile] = useState<string>();
  const [loading, setLoading] = useState(false);

  //~ function that is responsible for handling post
  const handleCreatePost = async () => {};
  //~ function onselectImage
  const onSelectImage = () => {};
  //~ function that will handle when user click on input field
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
        )}
      </Flex>
    </Flex>
  );
};
export default NewPostForm;
