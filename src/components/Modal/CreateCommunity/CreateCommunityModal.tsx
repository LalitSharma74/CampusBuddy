import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import React, { useState } from "react";
import { auth, firestore } from "@/src/firebase/clientApp";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { HiLockClosed } from "react-icons/hi";
// Transactions: a transaction is a set of read and write operations on one or more documents.
// Batched Writes: a batched write is a set of write operations on one or more documents.
import error from "next/error";
import { useAuthState } from "react-firebase-hooks/auth";

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const [user] = useAuthState(auth);
  const [communityName, setCommunityName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setCommunityName(event.target.value);
    setCharsRemaining(21 - event.target.value.length);
  };

  //   Checkbox also makes event just like any input does and we can use that event to actually know which community type we have selected and restrict only one community type selections by some logic

  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommunityType(event.target.name);
  };

  const handleCreateCommunity = async () => {
    if (error) setError("");
    // Validating the community name
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; // check for valid string characters

    if (format.test(communityName) || communityName.length < 3) {
      setError(
        "Community names must be 3-21 characters and can only contains letters , numbers, or underscores"
      );
      return; // if any error return from the function
    }

    setLoading(true);
    //???? If valid community name we,will create the community document in firestore
    // After validation has been done,component gonna communicate with firebase so we will set Loading to true

    //& Now we have valid and unique community name ,now we can create the community

    try {
      const communityDocRef = doc(firestore, "communities", communityName);

      // Here is how we implement transactions in firebase
      await runTransaction(firestore, async (transaction) => {
        // check if community exists in DB
        const communityDoc = await transaction.get(communityDocRef); // getting actual document

        if (communityDoc.exists()) {
          throw new Error(
            `Sorry , r/${communityName} is already taken. Try Another!`
          );
        }
        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: "communityType",
        });

        //Creating the community :->
        // When user creates a community we are doing two major operations

        // 1. We are actually creating the community itself in the community collection
        // 2. We are going to add that community to the userCommunity snippets
        //! Both of the operations should succeed or none of them

        //  So we dont want to create the community to the userCommunity snippets if the community fails to be created so transactions are extremely useful here

        // Create communitySnippet on    //

        transaction.set(
          doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),
          {
            communityId: communityName,
            isModerator: true,
          }
        );
      });
    } catch (error: any) {
      console.log("Handle create community error ", error);
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={15}
            padding={3}
          >
            Create a Clique
          </ModalHeader>
          <Divider />

          <Box pl={3} pr={3}>
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text fontSize={11} color="gray.500">
                Community names including capitalization cannot be changed
              </Text>
              <Text
                position="relative"
                top="28px"
                left="10px"
                width="20px"
                color="gray.400"
              >
                r/
              </Text>
              <Input
                position="relative"
                value={communityName}
                size="sm"
                pl="22px"
                onChange={handleChange}
              />
              {/* Need to make characters length dynamic  */}

              {communityName && (
                <Text
                  fontSize="9pt"
                  color={charsRemaining === 0 ? "red" : "gray:300"}
                >
                  {charsRemaining} characters remaining
                </Text>
              )}

              <Text fontSize="9pt" color="red" pt={1}>
                {error}
              </Text>
              <Box mt={4} mb={4}>
                <Text fontWeight={600} fontSize={15}>
                  Clique type
                </Text>

                {/* {checkbox} */}
                <Stack spacing={2}>
                  <Checkbox
                    name="public"
                    isChecked={communityType === "public"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillPersonFill} color="gray.500" mr={2} />

                      <Text fontSize="10pt" mr={1}>
                        Public
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Anyone can view, post, and comment to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Restricted
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Anyone can view this community, but only approved users
                        can post
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    isChecked={communityType === "private"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={HiLockClosed} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Private
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Only approved users can view and submit to this
                        community
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Button
              height="30px"
              variant="outline"
              mr={3}
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              height="30px"
              onClick={handleCreateCommunity}
              isLoading={loading}
            >
              Create Clique
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;

// CreateCommunity modal will have all of the logic necessary to create a community : ->  COMPONENT INTERACT WITH fireStore database --firestore documents -----> database transactions and batch Writes

//TODO: Now we need to care about people joining in Community
//TODO: Therefore we need to care about modelling data in noSQL database

//? How we gonna modal this data IN NOSQL DATABASE

// What actually happens when the user joins the community from the data stand point

// Relationship between a user and a community: User can be a part of many communities and a user can have many communities so MANY TO MANY RELATIONSHIP

// The relationship between users and communities is the community and number of users so evertime a user leaves or join the community we just update the number of members in the community

// In the  firebase authentication is completely separated from firestore database so we need to somehow store user in firestore database therefore for that we need to implement cloud function and we need to write a single function that gonna listen to our authentication service and firestore database

// How do transactions works reference?
// https://youtu.be/dOVSr0OsAoU
