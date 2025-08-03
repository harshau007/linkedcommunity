import { Document, Schema, Types, model } from "mongoose";

export interface IPost extends Document {
  author: Types.ObjectId;
  content: string;
  likes: number;
  createdAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, trim: true, maxlength: 2000 },
    likes: { type: Number, default: 0, min: 0 },
  },
  {
    timestamps: true,
  }
);

postSchema.index({ createdAt: -1 });
postSchema.index({ author: 1 });

const Post = model<IPost>("Post", postSchema);

export default Post;
