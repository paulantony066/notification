/**import admin from "firebase-admin";

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

$env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\raphyantony\notify\familyevent-934de-firebase-adminsdk-vmndn-187065aab1.json"**/

import {initializeApp, applicationDefault } from 'firebase-admin/app';
import { getMessaging } from "firebase-admin/messaging";
import express, { json } from "express";

initializeApp({
    Credential: applicationDefault(),
    projectId: 'familyevent-934de',
});