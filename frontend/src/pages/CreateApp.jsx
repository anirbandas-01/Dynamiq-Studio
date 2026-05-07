import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateApp() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [fields, setFields] = useState([
    {
      name: "",
      type: "text",
    },
  ]);

  const addField = () => {

    setFields([
      ...fields,
      {
        name: "",
        type: "text",
      },
    ]);
  };

  const handleFieldChange = (
    index,
    key,
    value
  ) => {

    const updated = [...fields];

    updated[index][key] = value;

    setFields(updated);
  };

  const removeField = (index) => {
    
    if (fields.length === 1) {
    return alert(
      "At least one field required"
    );
   }
  const updated = fields.filter(
    (_, i) => i !== index
  );

   setFields(updated);
  };

  const handleSubmit = async () => {

    try {

      const res = await api.post("/apps", {
        name,
        fields,
      });

      navigate(`/app/${res.data.appId}`);

    } catch (err) {

      console.log(err);

    }
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Create App
      </h1>

      <input
        placeholder="App Name"
        className="border p-2 rounded mb-4 w-full"
        onChange={(e) => setName(e.target.value)}
      />

      <div className="space-y-4">

        {fields.map((field, index) => (

          <div
            key={index}
            className="flex gap-4 items-center"
          >

            <input
              placeholder="Field Name"
              className="border p-2 rounded flex-1"
              onChange={(e) =>
                handleFieldChange(
                  index,
                  "name",
                  e.target.value
                )
              }
            />

            <select
              className="border p-2 rounded"
              onChange={(e) =>
                handleFieldChange(
                  index,
                  "type",
                  e.target.value
                )
              }
            >

              <option value="text">
                Text
              </option>

              <option value="number">
                Number
              </option>

              <option value="email">
                Email
              </option>
              
              <option value="date">
                Date
              </option>

              <option value="password">
                Password
              </option>

            </select>
          
            <button
              onClick={() => removeField(index)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

      <div className="flex gap-4 mt-6">

        <button
          onClick={addField}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Add Field
        </button>

        <button
          onClick={handleSubmit}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Generate App
        </button>

      </div>

    </div>
  );
}

export default CreateApp;