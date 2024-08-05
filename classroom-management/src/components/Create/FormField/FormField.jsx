// Style
import { useStyles } from "./FormField.style";

// Mui
import { FormHelperText, TextField } from "@mui/material";

// Validation
import { validateInput } from "../../../utils/validation";

const FormField = ({
  error,
  setError,
  label,
  value,
  property,
  validationType,
  setData,
}) => {
  const classes = useStyles();

  const handleChange = (e) => {
    const newValue = e.target.value;
    setData(property, newValue);
    setError((prevErrors) => ({
      ...prevErrors,
      [validationType]: validateInput(newValue, validationType),
    }));
  };

  return (
    <>
      <TextField
        label={label}
        value={value}
        onChange={handleChange}
        sx={{ marginBottom: 2 }}
        fullWidth
        error={!!error[validationType]}
      />
      {error[validationType] && (
        <FormHelperText error className={classes.marginB2}>
          {error[validationType]}
        </FormHelperText>
      )}
    </>
  );
};

export default FormField;
