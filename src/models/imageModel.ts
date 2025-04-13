import mongoose, { Schema, Document } from "mongoose";

export interface IImage extends Document {
  url: string;
  publicId: string;
  title?: string;
  tags?: string[];
  createdAt: Date;
}

const ImageSchema: Schema<IImage> = new Schema({
  url: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  tags: {
    type: [String],
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Image =
  mongoose.models.Image || mongoose.model<IImage>("Image", ImageSchema);
export default Image;
