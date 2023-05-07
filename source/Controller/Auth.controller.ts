import { Request, Response } from 'express';

function getRouter(depenedencies: Map<String, any>) {
  const router = depenedencies.get("express").Router();
  router.get('/', (req: any, res: any) => {
    res.send("Hello World")
  })
  router.post('/login', (req: Request, res: Response) => {
    try {
      let Auth = depenedencies.get("Auth_Bussiness");
      return Auth(depenedencies).login(req, res)
    } catch (err) {
      let requestError = depenedencies.get("requestError");
      return requestError(res, err, "Internal server error");
    }
  
  });

  router.post('/signup', (req: Request, res: Response) => {
    try {
      let Auth = depenedencies.get("Auth_Bussiness");
      return Auth(depenedencies).register(req, res)
    } catch (err) {
      let requestError = depenedencies.get("requestError");
      return requestError(res, err, "Internal server error");
    }
  });
  return router
}


export default getRouter;
