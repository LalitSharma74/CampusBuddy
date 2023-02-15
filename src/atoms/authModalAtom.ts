import { atom } from "recoil";

// Type : interface of authmodalstate

export interface AuthModalState {
  open: boolean;
  view: "login" | "signup" | "resetPassword";
}

// Setting the initial state of the recoil!

const defaultModalState: AuthModalState = {
  open: false,
  view: "login",
};

// exporting the atom

export const authModalState = atom<AuthModalState>({
  key: "authModalState", // key is the unique identifier for each atom
  default: defaultModalState,
});
