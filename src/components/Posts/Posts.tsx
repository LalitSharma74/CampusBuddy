//

import { Flex, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { auth, firestore } from "@/src/firebase/clientApp";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

import { Community } from "@/src/atoms/communitiesAtom";
import { Post } from "@/src/atoms/postAtoms";
import PostItem from "./PostItem";
import PostLoader from "./PostLoader";
import { Router } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import usePosts from "@/src/hooks/usePosts";

type PostsProps = {
  communityData: Community;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  // useAuthState

  const [user] = useAuthState(auth);

  // When this component renders we need to fetch data from database and store them in the state and map through them and display as separate component on the feed of each community

  // And separate component for each posts

  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onSelectPost,
    onVote,
    onDeletePost,
  } = usePosts(communityData);

  const getPosts = async () => {
    try {
      setLoading(true);
      // getposts for this community

      // inOrder to create queries we need to form an Index

      const postsQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("creatorId", "desc")
      );

      // Getting all those documents
      const postDocs = await getDocs(postsQuery);

      // After extracting all those data from each of those postdocs and storing them in javascript object and then store in post state
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));

      console.log("posts", posts);
    } catch (error: any) {
      console.log("getPosts error", error.message);
    }

    setLoading(false);
  };

  // getPosts is going to run as soon as component mounts

  useEffect(() => {
    getPosts();
  }, []);

  return (
    // For userCreator we need to first check whether current userId match the cretor ID

    <>
      {loading ? (
        <PostLoader />
      ) : (
        // If loading is not true then show the actual post content
        <Stack>
          {postStateValue.posts.map((item) => (
            <PostItem
              key={item.id}
              post={item}
              userIsCreator={user?.uid === item.creatorId}
              userVoteValue={undefined}
              onVote={onVote}
              onSelectPost={onSelectPost}
              onDeletePost={onDeletePost}
            />
          ))}
        </Stack>
      )}
    </>
  );
};
export default Posts;
