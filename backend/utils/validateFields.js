export const validateFields = (fields) => {

  if (!Array.isArray(fields)) {
    return "Fields must be an array";
  }

  if (fields.length === 0) {
    return "At least one field required";
  }

  for (const field of fields) {

    if (!field.name) {
      return "Field name is required";
    }

    if (!field.type) {
      field.type = "text";
    }

    const allowedTypes = [
      "text",
      "number",
      "email",
      "date",
      "password",
      "textarea"
    ];

    if (!allowedTypes.includes(field.type)) {
      field.type = "text";
    }

  }

  return null;
};