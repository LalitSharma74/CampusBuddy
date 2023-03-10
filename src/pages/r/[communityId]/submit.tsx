//Submit is for submit page

// One of the most exciting part of the build

// 1 . Post form
// 2 . About Community

import { Box, Text } from "@chakra-ui/react";

import NewPostForm from "../../../components/Posts/NewPostForm";
import PageContent from "@/src/components/Layout/PageContent";
import React from "react";
import { auth } from "@/src/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

type submitProps = {};

const submit: React.FC<submitProps> = () => {
  const [user] = useAuthState(auth);
  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text>Create a Post</Text>
        </Box>

        {/* New Post Form */}

        {user && <NewPostForm user={user} />}
      </>
      <>{/* About */}</>
    </PageContent>
  );
};
export default submit;
