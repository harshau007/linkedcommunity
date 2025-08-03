import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import config from "../config";
import Post from "../models/post.model";
import User from "../models/user.model";
import { hashPassword } from "./password.utils";

const seedDatabase = async () => {
  try {
    console.log("Clearing existing data...");
    await Post.deleteMany({});
    await User.deleteMany({});

    console.log("Seeding new data...");

    const passwordHash = await hashPassword("demo@4321");
    const dummyUser = await User.create({
      name: "Demo",
      email: "demo@example.com",
      passwordHash,
      bio: "A passionate developer exploring the world of web technologies. Loves coffee and clean code.",
    });

    const posts = [];
    for (let i = 0; i < 50; i++) {
      posts.push({
        author: dummyUser._id,
        content: faker.lorem.paragraph({ min: 2, max: 5 }),
        likes: faker.number.int({ min: 0, max: 150 }),
      });
    }

    await Post.insertMany(posts);

    console.log("Database has been successfully seeded! 🌱");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

const runSeed = async () => {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log("Connected to MongoDB for seeding.");
    await seedDatabase();
    await mongoose.connection.close();
    console.log("Seeding complete. MongoDB connection closed.");
  } catch (error) {
    console.error("Could not connect to the database for seeding:", error);
    process.exit(1);
  }
};

runSeed();
