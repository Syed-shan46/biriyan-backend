const admin = require('firebase-admin');

// Path to your service account key JSON file
const serviceAccount = require('../config/firebaese_key.json');

// Initialize Firebase
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log('Firebase app initialized');
} else {
  admin.app(); // If already initialized, use the default app
}

module.exports = admin;
