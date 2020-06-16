/*import React, { useState } from 'react';
import useInputState from '../Hooks/useInputState';
import validate from './validateLogin';
//import './index.css';

export default function Form() {
  const { handleChange, handleSubmit, reset, values, errors } = useInputState(submit, validate);

  function submit() {
    console.log('Submitted Succesfully');
  }

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>Email</label>
          <div>
            <input
              className={`${errors.email && 'inputError'}`}
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
        </div>
        <div>
          <label>Password</label>
          <div>
            <input
              className={`${errors.email && 'inputError'}`}
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
*/
// form
// label / input for email
// label / input for password
// signup button

// handle changes
// handle submit

// custom react hook

// handle errors
// show errors if there are errors
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
//import useInputState from '../Hooks/useInputState';
// material ui
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';
import withStyles from '@material-ui/core/styles/withStyles';

// styles jss
import styles from '../../styles/FormStyles';

function Form(props) {
  const { register, handleSubmit, control, errors } = useForm(); // initialize the hook
  /*const onSubmit = (data) => {
    console.log(data);
  };*/
  const classes = withStyles(props);

  return (
    <Container className={classes.main} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}
        >
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          {errors.email && <span>This field is required</span>}

          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={
              <Controller
                as={Checkbox}
                control={control}
                name="remember"
                color="primary"
                defaultValue={false}
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default withStyles(styles)(Form);
