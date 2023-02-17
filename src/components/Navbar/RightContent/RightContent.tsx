import { auth } from "@/src/firebase/clientApp";
import { Button, Flex, Menu } from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import React from "react";

import AuthModal from "../../Modal/Auth/AuthModal";
import AuthButtons from "./AuthButtons";
import Icons from "./Icons";
import UserMenu from "./UserMenu";

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal />

      <Flex justify="center" align="center">
        {/* conditionally rendering authbuttons when user found donot render authbutton */}

        {/* if the user is logged in show the Icons otherwise show the AuthButtons */}
        {user ? (
          // <Button onClick={() => signOut(auth)}>Logout</Button>
          <Icons />
        ) : (
          <AuthButtons />
        )}
        {/* since our menu is gonna change when user is logged IN  we need to pass user as a prop to UserMenu*/}
        <UserMenu user={user} />
      </Flex>
    </>
  );
};
export default RightContent;
