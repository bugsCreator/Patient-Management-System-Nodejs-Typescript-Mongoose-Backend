import express, { Request, Response, Express } from "express";

import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import bcrypt from "bcrypt";
import cors from 'cors';
import jwt from "jsonwebtoken";
import multer from "multer";


//utils
import requestError from "./utils/requestError";
import requestSuccess from "./utils/requestSuccess";


//controller
import indexRouter from "./Controller/index.controller";
import Auth from "./Controller/Auth.controller";
import Patient from "./Controller/Patient.controller";

//bussness logic
import User from "./Model/User";
import * as Auth_Bussiness from "./Bussiness-Logic/Auth";
import * as Patient_Bussiness from "./Bussiness-Logic/Patient";

//middlerwares
import authMiddlerware from "./middlerwares/auth.middlerware";
dotenv.config();



const depenedencies = new Map<String, any>();
const app: Express = express();
const port = process.env.PORT || 3000;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

//cors
app.use(cors());


//create uploade folder public access
app.use('/images', express.static('uploads'));

declare global {
  namespace Express {
      interface Request {
          userId?: string;
      }
  }
}
intiDepenedencies(depenedencies);

app.get('/index', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});


//authenticated routes
app.get('/list', authMiddlerware(depenedencies).verifyJwt, (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
})

app.use('/', indexRouter(depenedencies));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
//ext install infeng.vscode-react-typescript

function intiDepenedencies(depenedencies: Map<String, any>) {
  depenedencies.set("express", express);
  depenedencies.set("requestError", requestError);
  depenedencies.set("requestSuccess", requestSuccess);
  depenedencies.set("Auth", Auth);
  depenedencies.set("Patient", Patient);
  depenedencies.set("Auth_Bussiness", Auth_Bussiness.Auth);
  depenedencies.set("User", User);
  depenedencies.set("bcrypt", bcrypt);  
  depenedencies.set("jwt", jwt);
  depenedencies.set("Patient_Bussiness", Patient_Bussiness.Patient);
  depenedencies.set("multer", multer);
}



main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI||'mongodb://localhost:27017/varnya');
  console.log("Database connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}