import Input from "../Input";
import style from "./Field.module.css";

const Field = ({ field, typeField = "text", placeholder }) => {
  return (
    <div className={style.field}>
      <Input
        typeField={typeField}
        onChange={field.onChange}
        value={field.value}
        placeholder={placeholder}
      />

      {field.errorMessage && (
        <p className={style.field__error}>{field.errorMessage}</p>
      )}
    </div>
  );
};

export default Field;
