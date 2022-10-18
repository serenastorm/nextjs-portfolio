import admin from "firebase-admin";
import type { ServiceAccount } from "firebase-admin";

export const firebaseServiceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? process.env.FIREBASE_SERVICE_ACCOUNT_KEY.replace(/\\n/g, "\n")
    : undefined,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseServiceAccount),
    databaseURL: process.env.FIRESTORE_DB_URL,
  });
}

export const firestoreDb = admin.firestore();

export const fireStoreAdmin = admin.firestore;
