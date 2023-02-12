import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

const Navbar: React.FC = () => {
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
      <RightContent />
    </Flex>
  );
};
export default Navbar;
