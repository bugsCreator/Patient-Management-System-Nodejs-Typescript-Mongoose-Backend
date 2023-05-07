import {Response } from "express";
export default function requestSuccess(res: Response, data: any){
    return res.status(200).json({error:false, data});
}