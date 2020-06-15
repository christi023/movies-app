import React from 'react';
// import useInput hook
import useInputState from '../Hooks/useInputState';
// material ui

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import withStyles from '@material-ui/core/styles/withStyles';

// styles jss
import styles from '../../styles/FormStyles';

function Form(props) {
  const [value, handleChange, reset] = useInputState('');
  // const  email, signIn, password, remember ;
  const { classes } = props;
  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">signIn</Typography>

        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">email</InputLabel>
            <Input id="email" name="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">password</InputLabel>
            <Input id="password" name="password" autoFocus />
          </FormControl>
          {/*<FormControlLabel control={<Checkbox color="primary" />} label={remember} />*/}
          <Button
            variant="contained"
            type="submit"
            fullWidth
            color="primary"
            className={classes.submit}
          >
            signIn
          </Button>
        </form>
      </Paper>
    </main>
  );
}

export default withStyles(styles)(Form);
