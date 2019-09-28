import React, { useState, useEffect  } from 'react';
import { connect } from 'react-redux';
// @material-ui/core components
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
// core redux
import * as actions from '../store/actions/actions';

import logo from "../assets/img/logo-login.png";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Evol
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
  },
  img:{
    height: '100px',
    padding: '5px',
  }
}));

function SignIn(props) {
  const classes = useStyles();

  const [state, setState] = useState({ username: "", password: ""});

    useEffect(() => {
      if (props.isAuthenticated){ // if we are loged, this send us to the dashboard
        props.history.push('/');
      }else{
        props.initializingForm();
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
                <p style={{color:"red"}}>{"ERROR: " + props.error.message}</p>
                <hr className={classes.hr} /><br />
              </div>
        );
        }
    }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} alt="logo" className={classes.img} />
        {props.loading ?  //if this.props.loading==true: shows loading icon
        <div>
          <p style={{color:"blue"}}>Autentificando...</p>
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
            Iniciar Sesion
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
      onAuth: (username, password) => dispatch(actions.authLogin(username, password)),
      initializingForm: () => dispatch(actions.initializingForm()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);