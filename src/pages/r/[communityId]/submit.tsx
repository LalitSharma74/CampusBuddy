//Submit is for submit page

// One of the most exciting part of the build

// 1 . Post form
// 2 . About Community

import PageContent from "@/src/components/Layout/PageContent";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import NewPostForm from "../../../components/Posts/NewPostForm";

type submitProps = {};

const submit: React.FC<submitProps> = () => {
  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text>Create a Post</Text>
        </Box>

        {/* New Post Form */}

        <NewPostForm />
      </>
      <>{/* About */}</>
    </PageContent>
  );
};
export default submit;
