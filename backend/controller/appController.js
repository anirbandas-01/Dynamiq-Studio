import { supabase } from "../db.js";
import { validateFields } from "../utils/validateFields.js";



export const createApp = async (req, res) => {

    try {
        const { name, fields } = req.body;

        if(!name){
            return res.status(400).json({
                error: "App name required"
            });
        }

        const validationError = validateFields(fields);

        if(validationError) {
            return res.status(400).json({
                error: validationError
            });
        }

        const appId = Date.now().toString();

        const { error } = await supabase
         .from("apps")
         .insert([
            {
                id: appId,
                name,
                user_id: req.user.id,
                config: { 
                    fields
                }
            }
         ]);

         if(error) {
            return res.status(400).json({
                error: error.message
            });
         }

         res.json({ appId });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


export const getApp = async (req, res) => {
    try {
        const { data, error } = await supabase
         .from("apps")
         .select("*")
         .eq("id", req.params.id)
         .eq("user_id", req.user.id)
         .single();

         if (error) {
            return res.status(400).json({
                error: error.message
            });
         }

         res.json(data);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


export const getUserApps = async (req, res) => {

    try {

        const { data, error } = await supabase
            .from("apps")
            .select("*")
            .eq("user_id", req.user.id);

        if (error) {

            return res.status(400).json({
                error: error.message
            });

        }

        res.json(data);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};


export const deleteApp = async (req, res) => {

  try {

    const { id } = req.params;
    
    const { error } = await supabase
      .from("apps")
      .delete()
      .eq("id", id)
      .eq("user_id", req.user.id);

    if (error) {

      return res.status(400).json({
        error: error.message
      });

    }

    await supabase
      .from("app_data")
      .delete()
      .eq("app_id", id);

    res.json({
      success: true,
      message: "App deleted"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
};