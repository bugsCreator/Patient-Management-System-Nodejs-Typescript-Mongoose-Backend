import { Jwt, Secret, SignOptions, VerifyOptions } from "jsonwebtoken";
import IJwtPayload from "./IJwtPayload";


export default interface IJWT {
    sign(
        payload: string | Buffer | object,
        secretOrPrivateKey: Secret,
        options?: SignOptions,
    ): string;
    verify(token: string, secretOrPublicKey: Secret, options: VerifyOptions & { complete: true }): Jwt;
    verify(token: string, secretOrPublicKey: Secret): IJwtPayload;
}