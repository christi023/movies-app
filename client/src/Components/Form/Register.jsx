import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
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
//import useInputForm from '../../Hooks/useInputForm';
// contexts
import UserContext from '../../contexts/UserContext';

// styles jss
import styles from '../../styles/FormStyles';

function Register() {
  const { register, control, errors } = useForm(); // initialize the hook

  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [setError] = useState();
  //const { values, handleChange } = useInputForm();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const classes = withStyles();

  // onSubmit
  const onSubmit = async (e) => {
    //console.log(data);
    e.preventDefault();
    try {
      const newUser = { firstname, lastname, email, password };
      await axios.post('http://localhost:5000/api/users/register', newUser);
      // login the user
      const loginRes = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem('auth-token', loginRes.data.token);
      history.push('/movie');
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
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
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required={true}
            fullWidth
            id="firstname"
            label="FirstName"
            name="name"
            autoComplete="firstname"
            autoFocus
            onChange={(e) => setFirstname(e.target.value)}
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
            onChange={(e) => setLastname(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
