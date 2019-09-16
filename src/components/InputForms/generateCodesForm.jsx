import React , { useState, useEffect } from "react";
import { connect } from 'react-redux';
// @material-ui/core components
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
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
  const [state, setState] = useState({ pages: "1",},);

  
  useEffect((props) => {
    props.initializingForm();
    }, []);

  const handleChange = (event) => {
    setState({...state, [event.target.name]: event.target.value});
  }



  const handleSubmit = (event) => {
    event.preventDefault();
    const url = "/codes/companies/"+localStorage.getItem('company_id')+"/seats/"+localStorage.getItem('seat_id')+"/generate_codes/";
    props.postData(state, url); // this call the dispatch of redux
  }

  let errorMessage = null;
    if (props.error) { //this helps to show error message if the auth fail is dispatched
        
      if("Request failed with status code 429" === props.error.message){
        errorMessage = ( // if the error is not invalid auth credentials, shows whatever error is
          <div>
            <br /><hr className={style.hr} />
            <p style={{color:"red"}}>{"ALTO: Solo se pueden generar codigos QR por un maximo de tres veces al dia, usted ya ha superado ese limite, mañana podrá seguir generando"}</p>
            <hr className={style.hr} /><br />
          </div>
        )

      }else{
        errorMessage = ( // if the error is not invalid auth credentials, shows whatever error is
          <div>
            <br /><hr className={style.hr} />
            <p style={{color:"red"}}>{"ERROR: " + props.error.message}</p>
            <hr className={style.hr} /><br />
          </div>
        );}
    }

    if (props.requestSuccess){
      //download the pdf file whit the qrscodes after generate them
      const FileDownload = require('js-file-download');
      FileDownload(props.data, 'codigosCIES.pdf');
      alert('Se han generado con exito los codigos qr en unos segundos se descargará el archivo: "codigosCIES.pdf"');
      props.initializingForm();
    }

  return (

    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={style.paper}>
          {props.loading ?  //if this.props.loading==true: shows loading icon
          <div>
            <p style={{color:"blue",}}>Generando codigos Qr, esto puede tardar algunos minutos...</p>
            <CircularProgress  className={style.progress}/>
          </div>
          :
          <div></div>}
            <form className={style.form}  onSubmit={handleSubmit} >
                <Grid container spacing={2}>
                <Grid item xs={12}>
                <Grid item xs={12} sm={60}>
                  <p style={{color:"gray"}}>Cada pagina tiene 250 codigos, solo se puede hacer uso de esta herramienta un máximo de tres veces por dia</p>
                </Grid>  
                <FormControl component="fieldset" className={style.formControl}>
                    <FormLabel component="legend">Numero de paginas a generar</FormLabel>
                    <RadioGroup
                    autoFocus
                    aria-label="type"
                    name="pages"
                    className={style.group}
                    required
                    value={state.pages}
                    onChange={handleChange}
                    >
                    <FormControlLabel value="1" control={<Radio />} label="1" />
                    <FormControlLabel value="2" control={<Radio />} label="2" />
                    <FormControlLabel value="3" control={<Radio />} label="3" />
                    </RadioGroup>
                </FormControl>
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
                Generar codigso Qr
                </Button>
            </form>

            {props.requestSuccess ?  //if the user creation is successful 
              <div>
                <p style={{color:"green", fontSize:20}}>Se han generado con exito los codigos qr
                                                        en unos segundos se descargará el archivo: "codigosCIES.pdf"
                                                        </p>
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
    postData: (data, url) => dispatch(actions.postData(data, url)),
    initializingForm: () => dispatch(actions.initializingForm()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);