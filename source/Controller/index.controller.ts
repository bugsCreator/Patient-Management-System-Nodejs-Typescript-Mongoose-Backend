const getRouter = (depenedencies: Map<String, any>) => {
    const router = depenedencies.get("express").Router();
    router.get('/', (req: any, res: any) => {
        res.send("Hello World")
    })
    router.use('/auth', depenedencies.get("Auth")(depenedencies));
    router.use('/patient', depenedencies.get("Patient")(depenedencies));
    return router
}

export default  getRouter;