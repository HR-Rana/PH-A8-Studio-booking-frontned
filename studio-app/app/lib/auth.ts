import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";


const client = new MongoClient(`mongodb+srv://ariyanmahmud02019_db_user:${process.env.DB_PASSWORD}@cluster0.sizzebj.mongodb.net/`);
const db = client.db();

console.log(process.env.DB_PASSWORD)

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  }, 
  socialProviders: { 
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
    }, 
  }, 
});