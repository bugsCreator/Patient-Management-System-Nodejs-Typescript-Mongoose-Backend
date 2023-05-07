import { Model, Schema } from "mongoose";

export default interface IMongoose {
    connect(): void;
    disconnect(): void;
    model<T>(name: string, schema: Schema): Model<T>;
}