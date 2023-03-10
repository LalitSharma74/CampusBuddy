import { Post, postState } from "../atoms/postAtoms";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../firebase/clientApp";

import React from "react";
import { useRecoilState } from "recoil";

//
type usePostsProps = {};

const usePosts = () => {
  // we need this data across all the pages
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const onVote = async () => {};

  const onSelectPost = () => {};

  const onDeletePost = async (post: Post): Promise<boolean> => {
    //1. First we need to check post we are trying to delete has an image or not

    if (post.imageURL) {
      const imageRef = ref(storage, `posts/${post.id}/image`);
      await deleteObject(imageRef);
    }
    //2. Then it will delete the post document itself from firestore

    const postDocRef = doc(firestore, "posts", post.id!);

    await deleteDoc(postDocRef);

    //3. Then it will update our recoil state so that we donot see the post on our UI'

    setPostStateValue((prev) => ({
      ...prev,
      posts: prev.posts.filter((item) => item.id !== post.id),
    }));

    try {
      return true;
    } catch (error) {
      return false;
    }
  };

  // we need 6 or 7 state variables

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
};
export default usePosts;
