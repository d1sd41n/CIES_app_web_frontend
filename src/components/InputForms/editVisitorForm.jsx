import React , { useState, useEffect } from "react";
import { connect } from 'react-redux';
// @material-ui/core components
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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


function EditVisitorForm(props) {
  const style = useStyles();
  const [state, setState] = useState({ phone: props.data.phone, first_name: props.data.first_name,
                                       last_name: props.data.last_name, email: props.data.email,
                                       dni: props.data.dni, id: props.data.id},);

  
  const handleChange = (event) => {
    setState({...state, [event.target.name]: event.target.value});
  }



  const handleSubmit = (event) => {
    event.preventDefault();
    const url = "/core/companies/"+localStorage.getItem('company_id')+"/visitors/"+state.id+"/";
    props.editData(state, url); // this call the dispatch of redux


  }

  let errorMessage = null;
    if (props.error) { //this helps to show error message if the auth fail is dispatched
        
      if("Request failed with status code 400" === props.error.message){
        errorMessage = getErrorMessages(props.error.response.data); // this organize the message errors
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
            <p >Guardando cambios...</p>
            <CircularProgress  className={style.progress}/>
          </div>
          :
          <div></div>}
            <form className={style.form}  onSubmit={handleSubmit} noValidate >
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    autoComplete="fname"
                    name="first_name"
                    variant="outlined"
                    required
                    fullWidth
                    id="first_name"
                    label="Nombre"
                    value={state.first_name}
                    autoFocus
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
                    value={state.last_name}
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
                    value={state.dni}
                    />
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
                    value={state.email}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    variant="outlined"
                    type="number"
                    required
                    fullWidth
                    id="dni"
                    label="Telefono"
                    name="phone"
                    autoComplete="phone"
                    InputProps={{ inputProps: { min: 0,} }}
                    onChange={handleChange}
                    value={state.phone}
                    />
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
                Guardar cambios
                </Button>
            </form>

            {props.requestSuccess ?  //if the user creation is successful 
              <div>
                <p style={{color:"green", fontSize:20}}>Se han guardado los cambios con exito!</p>
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
    data: state.data,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    initializingForm: () => dispatch(actions.initializingForm()),
    editData: (data, url) => dispatch(actions.editData(data, url)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditVisitorForm);