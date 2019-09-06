import React, { useState, useEffect  } from 'react';
import { connect } from 'react-redux';
// @material-ui/core components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
// core redux
import * as actions from '../store/actions/actions';
// core components

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'. Built with '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI.
      </Link>
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progress: {
    margin: theme.spacing(2),
  },
  hr:{
    color: "red",
    backgroundColor: "red",
    height: 3
  }
}));

function SignIn(props) {
  const classes = useStyles();

  const [state, setState] = useState({ username: "", password: ""});

    useEffect(() => {
      if (props.isAuthenticated){ // if we are loged, this send us to the dashboard
        props.history.push('/');
      }
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onAuth(state.username, state.password); // this call the dispatch of redux
  }

  const handleChange = (event) => {
    setState({...state, [event.target.name]: event.target.value});
  }

  let errorMessage = null;
    if (props.error) { //this helps to show error message if the auth fail is dispatched
        try {
          errorMessage = (
            <p style={{color:"red"}}>{props.error.response.data.non_field_errors[0]}</p> // shows the auth fail message sent by the backend
        );
        }
        catch(error) {
            errorMessage = ( // if the error is not invalid auth credentials, shows whatever error is
              <div>
                <br /><hr className={classes.hr} />
                <p>{"ERROR: " + props.error.message}</p>
                <hr className={classes.hr} /><br />
              </div>
        );
        }
    }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {props.loading ?  //if this.props.loading==true: shows loading icon
        <div>
          <p>Autentificando...</p>
          <CircularProgress className={classes.progress} />
        </div>
        :
        <div></div>}
        {/* shows error message if we have an error */}
        {errorMessage } 
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email o Nombre de usuario"
            name="username"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
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
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
      loading: state.authLoading,
      error: state.error,
      isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onAuth: (username, password) => dispatch(actions.authLogin(username, password)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);