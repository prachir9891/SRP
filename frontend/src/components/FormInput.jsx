import './FormInput.css';

const FormInput = ({ label, type = "text", name, value, onChange, placeholder, required = false }) => {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={name}>
        {label} {required && <span className="required">*</span>}
      </label>
      <input
        className="form-input"
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default FormInput;
