import dotenv from "dotenv";
import { DISCORD_TOKEN, DISCORD_CLIENT_ID } from "./config.json";
dotenv.config();

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
  throw new Error("Missing environment variables");
}

export const config = {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
};
