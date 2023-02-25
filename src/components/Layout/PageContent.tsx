import { Flex } from "@chakra-ui/react";
import React from "react";

type PageContentProps = {};

// Creating reusable layout component and we can reuse them inside any of our

// children is no longer a single component but its an array of 2 components
const PageContent: React.FC<PageContentProps> = ({ children }) => {
  console.log("Here is a children", children);
  return (
    <Flex justify="center" p="16px 0px" border="1px solid red">
      <Flex
        width="95%"
        justify="center"
        border="1px solid green"
        maxWidth="860px"
      >
        {/* Left hand side componen , OMOBILE WE have only left hand side component not left hand side component*/}
        <Flex
          direction="column"
          width={{ base: "100%", md: "65%" }}
          mr={{ base: 0, md: 6 }}
          border="1px solid blue"
        >
          {children && children[0 as keyof typeof children]}
        </Flex>
        {/* Right hand side component */}
        <Flex
          direction="column"
          display={{
            base: "none",
            md: "flex",
          }}
          flexGrow={1}
          border="1px solid orange"
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
