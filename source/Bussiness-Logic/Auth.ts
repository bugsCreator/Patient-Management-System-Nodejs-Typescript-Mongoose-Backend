import { Model } from "mongoose";
import { IUserInterface, } from "../Model/User";
import { Request, Response } from "express";
import IBcrypt from "../Model/Interface/IBcrypt";
import IJWT from "../Model/Interface/IJWT";

export function Auth(depenedencies: Map<String, any>) {
    let requestError = depenedencies.get("requestError");
    let requestSuccess = depenedencies.get("requestSuccess");


    async function register(req: Request, res: Response) {


        let userObject: IUserInterface = { ...Object() }
        userObject.username = (req.body.username);
        userObject.password = (req.body.password);

        const User: Model<IUserInterface> = depenedencies.get("User");

        // Check if the user already exists in the database
        const existingUser = await User.findOne({ username: userObject.username });

        // If the user already exists, return an error
        if (existingUser) {
            return requestError(res, new Error("User already exists"), "User already exists", 409);
        }
        let bcrypt: IBcrypt = depenedencies.get("bcrypt");
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(userObject.password, 10);

        // Create a new user document using the Mongoose model
        const newUser = new User({ username: userObject.username, password: hashedPassword });

        // Save the new user to the database
        await newUser.save();

        // Return a success message
        return requestSuccess(res, { message: 'User created successfully' });

    }

    async function login(req: Request, res: Response) {
        // ground highstreet/,2d,enghlish


        let userObject: IUserInterface = { ...Object() }
        userObject.username = (req.body.username);
        userObject.password = (req.body.password);


        // Find the user in the database by their username
        const User: Model<IUserInterface> = depenedencies.get("User");
        const user = await User.findOne({ username: userObject.username });

        // If the user doesn't exist, return an error
        if (!user) {
            return requestError(res, new Error('Invalid username or password'), 'Invalid username or password', 401)
        }
        let bcrypt: IBcrypt = depenedencies.get("bcrypt");
        // Check if the password matches the hash in the database
        const passwordMatches = await bcrypt.compare(userObject.password, user.password);

        // If the password doesn't match, return an error
        if (!passwordMatches) {
            return requestError(res, new Error('Invalid username or password'), 'Invalid username or password', 401);
        }

        // Generate a JWT token
        const jwt: IJWT = depenedencies.get("jwt");
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });


        // If the password matches, return a success message
        return requestSuccess(res, { token })

    }
    return { login, register }


}