import React , { useState, useEffect } from "react";
import { connect } from 'react-redux';
// @material-ui/core components
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel'
import CircularProgress from '@material-ui/core/CircularProgress';
// core redux
import * as actions from '../../store/actions/actions';
// Variables and other utilities
import getErrorMessages from '../../variables/dataFieldNames.js';



const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    borderColor: 'green',
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    backgroundColor: "#A23DB7",
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    marginLeft: 10,
    marginRight: theme.spacing(1),
    borderColor: "pink",
  },
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
  progress: {
    margin: theme.spacing(2),
  },
}));


function UserForm(props) {
  const style = useStyles();
  const [state, setState] = useState({ username: "", first_name: "",
                                       last_name: "", email: "",
                                       password: "", type: "Guard",
                                       dni: ""},);
  
  useEffect(() => {
    props.initializingForm();
    }, []);

  const handleChange = (event) => {
    setState({...state, [event.target.name]: event.target.value});
  }



  const handleSubmit = (event) => {
    event.preventDefault();
    props.postData(state, props.url); // this call the dispatch of redux
  }

  let errorMessage = null;
    if (props.error) { //this helps to show error message if the auth fail is dispatched
        
      if("Request failed with status code 400" === props.error.message){
        errorMessage = getErrorMessages(props.error.response.data); // this organize the message errors
        console.log(errorMessage);
      }else{
        errorMessage = ( // if the error is not invalid auth credentials, shows whatever error is
          <div>
            <br /><hr className={style.hr} />
            <p style={{color:"red"}}>{"ERROR: " + props.error.message}</p>
            <hr className={style.hr} /><br />
          </div>
        );}
    }

  return (

    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={style.paper}>
          {props.loading ?  //if this.props.loading==true: shows loading icon
          <div>
            <p >Creando usuario...</p>
            <CircularProgress  className={style.progress}/>
          </div>
          :
          <div></div>}
            <form className={style.form}  onSubmit={handleSubmit} >
                <Grid container spacing={2}>
                <p style={{color:"gray"}}>Todos los campos son obligatorios</p>
                <Grid item xs={12} sm={6}>
                    <TextField
                    value={state.username}
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Nombre de usuario"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    variant="outlined"
                    type="number"
                    required
                    fullWidth
                    id="dni"
                    label="Cedula"
                    name="dni"
                    autoComplete="dni"
                    InputProps={{ inputProps: { min: 0,} }}
                    onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                    autoComplete="fname"
                    name="first_name"
                    variant="outlined"
                    required
                    fullWidth
                    id="first_name"
                    label="Nombre"
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="last_name"
                    label="Apellido"
                    name="last_name"
                    autoComplete="lname"
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    
                <FormControl component="fieldset" className={style.formControl}>
                    <FormLabel component="legend">Tipo de usuario</FormLabel>
                    <RadioGroup
                    aria-label="type"
                    name="type"
                    className={style.group}
                    required
                    value={state.type}
                    onChange={handleChange}
                    >
                    <FormControlLabel value="Guard" control={<Radio />} label="Guardia" />
                    <FormControlLabel value="Superviser" control={<Radio />} label="Supervisor" />
                    <FormControlLabel value="Manager" control={<Radio />} label="Manager" />
                    </RadioGroup>
                </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    type="email"
                    required
                    fullWidth
                    id="email"
                    label="Correo electronico"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    type="password"
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    inputProps={{ minLength: 8 }}
                    onChange={handleChange}
                    />
                    <p style={{color:"gray"}}>La contraseña debe tener al menos 8 caracteres</p>
                </Grid>
                {errorMessage } 
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={style.submit}
                >
                Crear Usuario
                </Button>
            </form>

            {props.requestSuccess ?  //if the user creation is successful 
              <div>
                <p style={{color:"green", fontSize:20}}>El Usuario ha sido creado con exito!</p>
              </div>
              :
              <div></div>}
        </div>
    </Container>
  );
}

function mapStateToProps(state) { // this pass the items of the state we choose to the props of the components in connect function
  return {
    loading: state.loading,
    error: state.error,
    requestSuccess: state.requestSuccess,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    postData: (data, url) => dispatch(actions.postData(data, url)),
    initializingForm: () => dispatch(actions.initializingForm()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);