import { Flex, Image, Link } from "@chakra-ui/react";

import Directory from "./Directory/Directory";
import React from "react";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
import { auth } from "@/src/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth); // we will use this hook a lot
  return (
    <Flex
      bg="white"
      height="44px"
      padding="6px 12px"
      justify={{ md: "space-between" }}
    >
      <Flex
        alignItems="center"
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
      >
        {/* <Image src="/images/redditFace.svg" height="30px" alt="" /> */}
        <Image
          src="vercel.svg"
          height="20px"
          display={{ base: "none", md: "unset" }}
          alt=""
        />
      </Flex>

      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;
