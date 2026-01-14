import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.log("Stream API key and secret must be set");
}
export const chatClient = StreamChat.getInstance(apiKey, apiSecret);
export const streamClient= new StreamClient(apiKey,apiSecret);

export const upsertStreamUser = async (userData) => {
    try{
        await chatClient.upsertUser(userData);
         console.log("User upserted  successfully",userData);
    }
    catch(error){
        console.error("Error upserting Stream user:", error);
    }
}

export const deleteStreamUser = async (userId) => {
    try{
        await chatClient.deleteUser(userId);
        console.log("User deleted from Stream successfully",userId);
    }
    catch(error){
        console.error("Error deleting Stream user:", error);
    }
}