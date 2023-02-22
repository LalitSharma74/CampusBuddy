import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebase/clientApp";
const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);

  const createUserDocument = async (user: User) => {
    // writing the user to our database without the cloud functions same as we created in signup.tsx only difference here is that instead of addDoc we need to use setDoc method
    // setDoc will create a new document if it doesnot exist

    // Creating a docRef to  the potentially existing document or update already existing document
    const userDocRef = doc(firestore, "users", user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button
        variant="oauth"
        mb={2}
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image src="/images/googlelogo.png" width="20px" mr={4} />
        Continue with Google
      </Button>

      <Button variant="oauth">Some other providers</Button>

      {error && <Text>{error.message}</Text>}
    </Flex>
  );
};
export default OAuthButtons;
