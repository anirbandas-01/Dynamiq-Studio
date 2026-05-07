import { supabase } from "../db.js";

export const saveData = async (req, res) => {
    try {

        if(
            !req.body ||
            Object.keys(req.body).length === 0
        ){
           return res.status(400).json({
             error: "No data submitted"
            }); 
        }
        const {error} = await supabase
          .from("app_data")
          .insert([
            {
                app_id: req.params.appId,
                data: req.body
            }
          ]);
          
          if(error) {
            return res.status(400).json({
                error: error.message
            });
          }

          res.json({
            success: true
          });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });        
    }
};

export const getData = async (req, res) => {
    try {
        const {data, error } = await supabase
          .from("app_data")
          .select("data")
          .eq("app_id", req.params.appId);

        if(error) {
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