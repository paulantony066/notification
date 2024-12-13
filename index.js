/**import admin from "firebase-admin";

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

$env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\raphyantony\notify\familyevent-934de-firebase-adminsdk-vmndn-187065aab1.json"**/

import {initializeApp, applicationDefault } from 'firebase-admin/app';
import { getMessaging } from "firebase-admin/messaging";
import express, { json } from "express";
import cors from "cors";

process.env.GOOGLE_APPLICATION_CREDENTIALS;
const app = express();
app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

app.use(
    cors({
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
);

app.use(function(req, res, next){
    res.setHeader("Content-Type","application/json");
    next();
});


initializeApp({
    Credential: applicationDefault(),
    projectId: 'familyevent-934de',
});

app.post("/send", function(req, res){

    const recievedToken = req.body.fcmToken;
    const message = {
        notification: {
          title: 'notify',
          body: 'testttttt'
        },
        token: recievedToken
    };

    getMessaging()
        .send(message)
        .then((response)=>{
            res.status(200).json({
                message: "successs",
                token: recievedToken,
            });
            console.log("message sent success:", response);
        })
        .catch((error)=>{
            res.status(400);
            res.send(error);
            console.log("error sending message:", error);
        });


});

app.listen(3000, function(){
    console.log("server started on 3000");
})