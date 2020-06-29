import React from 'react';
//import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
// material ui
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';
import withStyles from '@material-ui/core/styles/withStyles';
import useInputForm from '../../Hooks/useInputForm';
// styles jss
import styles from '../../styles/FormStyles';

function Register() {
  const { register, handleSubmit, control, errors } = useForm(); // initialize the hook
  /*const onSubmit = (data) => {
      console.log(data);
    };*/
  const { values } = useInputForm();

  const classes = withStyles();

  // onSubmit
  const onSubmit = (data) => {
    console.log(data);
    fetch('/api/users/register', {
      method: 'post',
      headers: {
        'access-control-allow-origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user); // we are loading the user
          //this.props.onRouteChange('/movie'); // here we are changing the route back to home
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
          Register
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required={true}
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          >
            {errors.name && <span>This field is required</span>}
          </TextField>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required={true}
            fullWidth
            id="lastname"
            label="LastName"
            name="lastname"
            autoComplete="lastname"
            autoFocus
          >
            {errors.name && <span>This field is required</span>}
          </TextField>
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
          {errors.password && <span>This field is required</span>}
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
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default withStyles(styles)(Register);
