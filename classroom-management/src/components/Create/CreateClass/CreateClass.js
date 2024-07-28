// Style
import { useStyles } from "./CreateClass.style";

// Mui
import { Button, FormHelperText, Grid, TextField, Typography } from "@mui/material";

const CreateClass = ({classId,handleChangeClassId,error,className,handleChangeClassName,maxSeats,handleChangeMaxSeats,hasClassErrors,handleCreateClass}) => {
  const classes=useStyles()

    return (
      <Grid container alignItems="center" justifyContent="center" item xs={5}>
        <Typography variant="h4" className={classes.marginB2}>
          Create new Class
        </Typography>
        <Grid sx={{ px: 25 }}>
          <TextField
            label="Id"
            value={classId}
            onChange={handleChangeClassId}
            sx={{ marginBottom: 2 }}
            fullWidth
            error={!!error.classId}
          />
          {error.classId && (
            <FormHelperText error className={classes.marginB2}>
              {error.classId}
            </FormHelperText>
          )}
          <TextField
            label="Class Name"
            value={className}
            onChange={handleChangeClassName}
            sx={{ marginBottom: 2 }}
            fullWidth
            error={!!error.className}
          />
          {error.className && (
            <FormHelperText error className={classes.marginB2}>
              {error.className}
            </FormHelperText>
          )}
          <TextField
            label="Total Places"
            value={maxSeats}
            onChange={handleChangeMaxSeats}
            sx={{ marginBottom: 2 }}
            fullWidth
            error={!!error.maxSeats}
          />
          {error.maxSeats && (
            <FormHelperText error className={classes.marginB2}>
              {error.maxSeats}
            </FormHelperText>
          )}
        </Grid>
        <Button
          variant="contained"
          disabled={hasClassErrors()}
          onClick={handleCreateClass}
        >
          Create Class
        </Button>
      </Grid>
    );
}

export default CreateClass;
