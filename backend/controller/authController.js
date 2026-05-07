import { supabase } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    const {email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    
    const { error } = await supabase
      .from("users")
      .insert([{ email, password: hashed }]);

      if (error) return res.status(400).json({ error: error.message });

      res.json({ message: "User created" });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase
     .from("users")
     .select("*")
     .eq("email", email)
     .single();

     if(error || !data) 
        return res.status(400).json({ error: "User not found" });
     
     const valid = await bcrypt.compare(password, data.password);

     if(!valid) 
        return res.status(400).json({ error: "Invalid password"});
    
     const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET);

     res.json({token});
};