// Creating cloud functions that relate user with the database and store users as a user table

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Creates and initializes a Firebase app instance
admin.initializeApp();
const db = admin.firestore();

// In onCreate we need to give callback function and it is gonna be triggered if the user is created
export const createUserDocument = functions.auth
  .user()
  .onCreate(async (user) => {
    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      providerData: user.providerData,
    };
    db.collection("users").doc(user.uid).set(newUser);
  });

// Now after successfully creating the function we need to deploy only the functions using command
//!   firebase deploy --only functions
