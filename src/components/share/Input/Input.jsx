import style from "./Input.module.css";

const Input = ({ typeField, onChange, value, placeholder }) => {
  return (
    <input
      className={style.input}
      type={typeField}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default Input;
