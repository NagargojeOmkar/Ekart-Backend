// src/config/firebase_config.js
const admin = require('firebase-admin');

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

// Debug — remove after fixing
console.log('FIREBASE_PROJECT_ID:', projectId);
console.log('FIREBASE_CLIENT_EMAIL:', clientEmail);
console.log('FIREBASE_PRIVATE_KEY loaded:', !!privateKey);

if (!projectId || !clientEmail || !privateKey) {
  throw new Error(
    '❌ Firebase env vars missing! Check FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY in your .env'
  );
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

module.exports = admin;