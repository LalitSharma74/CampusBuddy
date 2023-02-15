import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
import { auth } from "@/src/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <Flex bg="white" height="44px" padding="6px 12px">
      <Flex alignItems="center">
        <Image src="/images/redditFace.svg" height="30px" alt="" />
        <Image
          src="/images/redditText.svg"
          height="40px"
          display={{ base: "none", md: "unset" }}
          alt=""
        />
      </Flex>
      {/* <Directory/> */}
      <SearchInput />
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;
