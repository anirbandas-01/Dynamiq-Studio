import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

export const supabase = createClient(

  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
  
);

const checkDatabaseConnection = async () => {
  try {
    const { error } = await supabase
     .from("users")
     .select("*")
     .limit(1);

     if(error) {
      console.log("Database connection failed:", error.message);
     }else {
       console.log("Connected to database");
     }
  } catch (error) {
     console.log("connection error:", error.message);
  }
};

checkDatabaseConnection();