import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import admin from "firebase-admin";

if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  throw new Error(
    "FIREBASE_SERVICE_ACCOUNT_KEY não foi encontrada no ambiente."
  );
}

const serviceAccountAdmin = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

let serviceAccount;
try {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
} catch (error) {
  throw new Error(
    "Erro ao analisar FIREBASE_SERVICE_ACCOUNT_KEY. Certifique-se de que o JSON está correto."
  );
}

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const adminDB = getFirestore();

export { adminDB };
