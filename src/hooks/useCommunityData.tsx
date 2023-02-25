import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { call } from "safe-json-stringify";
import { authModalState } from "../atoms/authModalAtom";
import {
  Community,
  CommunitySnippet,
  communityState,
} from "../atoms/communitiesAtom";
import { auth, firestore } from "../firebase/clientApp";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);

  const setAuthModalState = useSetRecoilState(authModalState);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    // first thing i am gonna check is Is the user signed In
    // if not signed In open auth model and prompt him to sign in

    if (!user) {
      // open the auth modal

      setAuthModalState({ open: true, view: "login" });
      return; // returning out of the function as we dont want to proceed to join or leave community
    }

    if (isJoined) {
      // if the user signed in
      //  if the user not signed in then open the auth model

      setLoading(true);
      leaveCommunity(communityData.id);
      return;
    }

    joinCommunity(communityData);
  };

  //   we want to call this function as soon as application loads and DOM mounts
  const getMySnippets = async () => {
    setLoading(true);
    try {
      // getting user snippets

      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );
      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
      }));

      console.log("Here are snippets", snippets);
    } catch (error: any) {
      console.log("Get my snippets error", error);
      setError(error.message);
    }

    setLoading(false); // when fetching is complete setLoading to false
  };

  const joinCommunity = async (communityData: Community) => {
    try {
      // batch writes
      // Creating a new community snippet

      const batch = writeBatch(firestore);

      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageUrl: communityData.imageUrl || "",
      };

      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id
        ),
        newSnippet
      );
      // updating the number of Members(1)
      batch.update(doc(firestore, "communities", communityData.id), {
        numberOfMembers: increment(1),
      });

      await batch.commit();

      //Update recoil state  on the client-- communityState.mySnippets

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      console.log("Join Community error", error);
      setError(error.message);
    }

    setLoading(false);
  };
  const leaveCommunity = async (communityId: string) => {
    // batch writes
    // Deleting the community snippet from the user
    // updating the number of Members(-1)
    // update recoil state -- communityState.mySnippets

    try {
      const batch = writeBatch(firestore);
      // Deleting the community snippet from the user

      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets`, communityId)
      );

      batch.update(doc(firestore, "communities", communityId), {
        numberOfMembers: increment(-1),
      });

      //   update the numberOfMembers {-1 }
      await batch.commit();

      //updating recoil state -- > communityState.mySnippets

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
      }));
    } catch (error: any) {
      console.log("leave community error", error.message);
      setError(error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!user) return;
    getMySnippets();
  }, [user]); // this hook gonna be triggered each time user changes

  return {
    // data and functions
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};
export default useCommunityData;

//Batch writes and transactions are most critical part of reddit build.. it is the huge functionality of reddit
