import { Request } from "express";

const getMulter = (depenedencies: Map<String, any>) => {
  function makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  let multer = depenedencies.get("multer")
  const storage = multer.diskStorage({
    destination: function (req: Request, file: any, cb: Function) {
      cb(null, 'uploads/')
    },
    filename: function (req: Request, file: any, cb: Function) {
      let type = file.fieldname;
      let filename = "";
      if (type === "prescription") {
        filename = "prescription_" + makeid(16) + ".jpg"
      } else {
        filename = "photo_" + makeid(16) + ".jpg"
      }
      cb(null, filename)
    }
  })
  // let storage = depenedencies.get("storage")
  return multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5, // 5 MB
      files: 50 // maximum 5 files
    },
    fileFilter: function (req: Request, file: any, cb: Function) {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
      } else {
        cb(null, true)
        //cb(new Error('Only JPEG and PNG files are allowed'))
      }
    }
  }).fields(
    [
      {
        name: 'photo',
        maxCount: 50
      },
      {
        name: 'prescription',
        maxCount: 50
      }
    ]
  ) // Maximum 50 images can be uploaded at once


}

export default getMulter

