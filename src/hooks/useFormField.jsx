import { useState } from "react";

export const useFormField = (initialValue = "", errorMessage = "") => {
  const [field, setField] = useState({
    value: initialValue,
    error: "",
  });

  const onChange = (event) => {
    setField((prev) => ({ ...prev, value: event.target.value }));
  };

  const validate = () => {
    let hasError = false;
    if (field.value.trim() === "") {
      hasError = true;
    }

    setField((prev) => ({ ...prev, error: hasError ? errorMessage : "" }));

    return !hasError;
  };

  return { value: field.value, errorMessage: field.error, onChange, validate };
};
