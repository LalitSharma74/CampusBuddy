import { Button, Flex, Input, Stack, Textarea } from "@chakra-ui/react";
import React, { useRef } from "react";

import DraftEditor from "./DraftEditor";
import { Editor } from "@tinymce/tinymce-react";

// import ReactMarkdown from "react-markdown";
// import gfm from "remark-gfm";
// import { Editor } from "@tinymce/tinymce-react";

type TextInputsProps = {
  textInputs: {
    title: string;
    body: string;
  };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => void;
  loading: boolean;
};

const TextInputs: React.FC<TextInputsProps> = ({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
}) => {
  return (
    <Stack spacing={3} width="100%">
      <Input
        name="title" // name are required in onChange function
        position="relative"
        value={textInputs.title}
        // will come from props created in NewPostForm
        fontSize="10pt"
        pl="22px"
        borderRadius={4}
        onChange={onChange} // will come from props created in NewPostForm
        placeholder="Title"
        _placeholder={{
          color: "gray.500",
        }} // applying pseudo style to placeholder
        _focus={{
          outline: "none",
          border: "1px solid",
          borderColor: "black",
        }}
      />

      {/* importing draft editor */}
      {/* <DraftEditor /> */}

      <Textarea
        name="body" // name are required in onChange function
        value={textInputs.body}
        fontSize="10pt"
        pl="22px"
        borderRadius={4}
        height="100px"
        onChange={onChange}
        placeholder="Text (optional)"
        _placeholder={{
          color: "gray.500",
        }} // applying pseudo style to placeholder
        _focus={{
          outline: "none",
          border: "1px solid",
          borderColor: "black",
        }}
      />

      <Flex justify="flex-end">
        <Button
          height="34px"
          padding="0px 30px"
          isLoading={loading}
          onClick={handleCreatePost}
          isDisabled={!textInputs.title}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};
export default TextInputs;
