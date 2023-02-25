import { Timestamp } from "firebase/firestore";
import react from "react";
import { atom } from "recoil";

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restricted" | "private";
  createdAt?: Timestamp;
  imageUrl?: string;
}

export interface CommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}

interface communityState {
  mySnippets: CommunitySnippet[];

  // visited communitiues
}

const defaultCommunityState: communityState = {
  mySnippets: [],
};

export const communityState = atom<communityState>({
  key: "communitiesState",
  default: defaultCommunityState,
});

// In react when we need data as well as functionality shared across global components we can create what called as custom hooks and we can put state and logic that is repeated across our app and we can use this custom hook an any component that requires this repeated functionality

// Custom hook : useCommunityData: --> Having functionality of joining and leaving across two different components we can keep our communitySnippet inside our useCommunityData hook

// In react when we have repeated logic or repeated data that is required at multiple places you can extract that and put it into a single place that is called as hook
