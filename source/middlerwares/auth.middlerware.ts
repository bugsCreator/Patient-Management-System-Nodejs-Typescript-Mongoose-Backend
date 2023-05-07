import { Request, Response, NextFunction } from 'express';
import IJWT from '../Model/Interface/IJWT';
import IJwtPayload from '../Model/Interface/IJwtPayload';



const getMiddleware = (depenedencies: Map<String, any>) => {
    const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        // Check if the Authorization header is present
        if (!authHeader) {
            return res.status(401).json({ error: 'Authorization header missing' });
        }

        // Check if the Authorization header has the correct format
        const [scheme, token] = authHeader.split(' ');
        if (scheme !== 'Bearer' || !token) {
            return depenedencies.get("requestError")(res, new Error("Invalid Authorization header format"), "Invalid Authorization header format", 401);
        }

        try {
            const jwt:IJWT = depenedencies.get("jwt");
            // Verify the JWT token
            const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret') as IJwtPayload;

            // Add the payload to the request object for future use
            req.userId = payload.userId;

            // Call the next middleware function
            next();
        } catch (err) {
            return depenedencies.get("requestError")(res, err, "Invalid token", 401);
        }
    };
    return {
        verifyJwt
    }
}


export default getMiddleware;
