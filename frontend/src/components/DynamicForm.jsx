import { useState } from "react";

function DynamicForm({ fields, onSubmit }) {

  const [formData, setFormData] = useState({});

  const handleChange = (
    fieldName,
    value
  ) => {

    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit(formData);

    setFormData({});
  };

  // fallback input type
  const getInputType = (type) => {

    const supported = [
      "text",
      "number",
      "email",
      "date",
      "password"
    ];

    if (!supported.includes(type)) {
      return "text";
    }

    return type;
  };

  return (
    <div className="border rounded-xl p-6 mb-10">

      <h2 className="text-2xl font-semibold mb-4">
        Dynamic Form
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {fields.length === 0 ? (

          <p>No fields configured.</p>

        ) : (

          fields.map((field, index) => (

            <div key={index}>

              <label className="block mb-1 font-medium">
                {field.name}
              </label>

              <input
                type={getInputType(field.type)}
                placeholder={field.name}
                className="w-full border p-2 rounded"
                value={formData[field.name] || ""}
                onChange={(e) =>
                  handleChange(
                    field.name,
                    e.target.value
                  )
                }
              />

            </div>

          ))

        )}

        <button
          className="bg-black text-white px-4 py-2 rounded"
        >
          Save Data
        </button>

      </form>

    </div>
  );
}

export default DynamicForm;