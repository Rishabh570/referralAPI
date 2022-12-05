import mongoose from "mongoose";

export const getMongooseId = (id: string) => new mongoose.Types.ObjectId(id);