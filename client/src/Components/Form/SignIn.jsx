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
//import { Redirect } from 'react-router-dom';
import useInputForm from '../../Hooks/useInputForm';
//import validate from './validateLogin';
// material ui
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControl from '@material-ui/core/FormControl';
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

function SignIn(props) {
  //const { register, handleChange, handleSubmit, control, values, errors, reset } = useInputForm(
  //onSubmit,
  //validate,
  //);

  // initialize the hook
  /*const onSubmit = (data) => {
    console.log(data);
  };*/

  // const classes = withStyles();
  // const onRouteChange = props;

  // onSubmit
  /*const onSubmit = (data) => {
    console.log(data, 'Signed In Successfully');
    fetch('/api/users', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        values,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          //return null;
          //} else if (user)           {
          props.loadUser(user);
          props.onRouteChange('/movie');
        }
      });
  };*/
  const { register, handleSubmit, control, errors } = useForm(); // initialize the hook
  const { values, reset } = useInputForm();

  //onSubmit,
  //validate,
  //);
  /*const onSubmit = (data) => {
      console.log(data);
    };*/
  const classes = withStyles();

  // onSubmit
  const onSubmit = (data) => {
    console.log(data);
    fetch('/api/users/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        values,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          //return null;
          //} else if (user)           {
          props.loadUser(user);
        }
      });
  };

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
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            //onChange={handleChange}
          >
            {errors.name && <span>This field is required</span>}
          </TextField>

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
            //onChange={handleChange}
          >
            {errors.name && <span>This field is required</span>}
          </TextField>

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
            type="Submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
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
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default withStyles(styles)(SignIn);
