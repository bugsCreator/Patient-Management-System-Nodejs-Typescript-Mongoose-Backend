import {Response } from "express";
export default function requestError(res: Response, error: any,errMsg:string,status=500){
    console.log(error);
    return res.status(status).json({error:true, data:null,errMsg});
}