import { auth } from "@/src/firebase/clientApp";
import { Button, Flex } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import React from "react";

import AuthModal from "../../Modal/Auth/AuthModal";
import AuthButtons from "./AuthButtons";

type RightContentProps = {
  user: any;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal />

      <Flex justify="center" align="center">
        {/* conditionally rendering authbuttons when user found donot render authbutton */}

        {/* Now what is the user here */}
        {user ? (
          <Button onClick={() => signOut(auth)}>Logout</Button>
        ) : (
          <AuthButtons />
        )}
      </Flex>
    </>
  );
};
export default RightContent;
