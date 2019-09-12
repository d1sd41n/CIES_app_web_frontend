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
  lost: {
    backgroundColor: "green",
    margin: theme.spacing(3, 0, 2),
  },
  notlost: {
    backgroundColor: "red",
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
  console.log(props)
  const style = useStyles();
  const [state, setState] = useState({ lost: props.data.lost, id: props.data.id},);


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = state;
    data.lost = !data.lost;
    const url = "/items/companies/"+localStorage.getItem('company_id')+"/items/"+state.id+"/";
    props.editData(data, url); // this call the dispatch of redux
    if(state.lost === false){
      const urlEmail = "/emailing/companies/"+localStorage.getItem('company_id')+"/seats/"+localStorage.getItem('seat_id')+"/email/";
      props.EmailRequest(state, urlEmail);
    }
   }

  let errorMessage = null;
    if (props.error) { //this helps to show error message if the auth fail is dispatched
        
      if("Request failed with status code 400" === props.error.message){
        errorMessage = getErrorMessages(props.error.response.data); // this organize the message errors
      }else{
        errorMessage = ( // if the error is not invalid auth credentials, shows whatever error is
          <div>
            <br /><hr className={style.hr} />
            <p style={{color:"red"}}>{"Advertencia: " + "No se han podido guardar los cambios en el servidor"}</p>
            <p style={{color:"red"}}>{"ERROR: " + props.error.message}</p>
            <hr className={style.hr} /><br />
          </div>
        );}
    }

    let EmailerrorMessage = null;
    if (props.EmailrequestError) { //this helps to show error message if the auth fail is dispatched
      EmailerrorMessage = ( // if the error is not invalid auth credentials, shows whatever error is
        <div>
          <br /><hr className={style.hr} />
          <p style={{color:"red"}}>{"Advertencia: " + "No se ha podido enviar el email"}</p>
          <p style={{color:"red"}}>{"ERROR: " + props.EmailrequestError.message}</p>
          <hr className={style.hr} /><br />
        </div>
      );
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
          {props.EmailrequestLoading ?  //if this.props.loading==true: shows loading icon
          <div>
            <p >Enviando Email...</p>
            <CircularProgress  className={style.progress} color="secondary"/>
          </div>
          :
          <div></div>}
            <form className={style.form}  onSubmit={handleSubmit} >
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    disabled
                    autoComplete="fname"
                    name="owner_name"
                    variant="outlined"
                    required
                    fullWidth
                    id="owner_name"
                    label="Nombre del dueño"
                    value={props.data.owner_name}
                    autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    disabled
                    variant="outlined"
                    required
                    fullWidth
                    id="owner_last_name"
                    label="Apellido del dueño"
                    name="last_name"
                    autoComplete="lname"
                    value={props.data.owner_last_name}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    disabled
                    variant="outlined"
                    required
                    fullWidth
                    id="type_item"
                    label="Tipo de objeto"
                    name="type_item"
                    autoComplete="tipo de objeto"
                    value={props.data.type_item}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    disabled
                    variant="outlined"
                    required
                    fullWidth
                    id="brand"
                    label="Marca del objeto"
                    name="brand"
                    autoComplete="lname"
                    value={props.data.brand}
                    />
                </Grid>
                
                
                <Grid item xs={12} sm={60}>
                {state.lost ?  //if this.props.lost==true: 
                <div>
                  <p style={{color:"blue"}}>Estado actual del Objeto: <b style={{color:"red"}}>Perdido!</b></p>
                  <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={style.lost}
                  >
                  Cambiar estado a Encontrado
                  </Button>
                  <p style={{color:"gray"}}>Al cambiar el estado de perdido a encontrado se enviará 
                                              un email automaticamente al usuario informandole de la aparición 
                                              del objeto</p>
                </div>
                : // else
                  <div>
                    <p style={{color:"blue"}}>Estado actual del Objeto: <b style={{color:"green"}}>Encontrado!</b></p>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={style.notlost}
                    >
                    Cambiar estado a Perdido
                    </Button>
                  </div>
                }
                </Grid>
                {errorMessage } 
                {EmailerrorMessage}
                </Grid>
            </form>

            {props.requestSuccess ?  //if the user creation is successful 
              <div>
                <p style={{color:"green", fontSize:20}}>Se ha cambiado el estado con exito y se han guardado los cambios!</p>
              </div>
              :
              <div></div>}
            {props.EmailrequestSuccess ?  //if the user creation is successful 
              <div>
                <p style={{color:"blue", fontSize:20}}>Se ha enviado el email con exito!</p>
              </div>
              :
              <div></div>}
        </div>
    </Container>
  );
}

function mapStateToProps(state) { // this pass the items of the state we choose to the props of the components in connect function
  return {
    // edit request redux data
    loading: state.loading,
    error: state.error,
    requestSuccess: state.requestSuccess,
    data: state.data,
    // email request redux data
    EmailrequestError: state.EmailrequestError,
    EmailrequestLoading: state.EmailrequestLoading,
    EmailrequestSuccess : state.EmailrequestSuccess,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    initializingForm: () => dispatch(actions.initializingForm()),
    editData: (data, url) => dispatch(actions.editData(data, url)),
    EmailRequest: (data, url) => dispatch(actions.EmailRequest(data, url)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditVisitorForm);