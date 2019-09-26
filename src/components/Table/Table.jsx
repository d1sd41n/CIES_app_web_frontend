import React, {  useEffect  } from "react";
import { connect } from 'react-redux';
// material-table components
import MaterialTable from 'material-table';
// @material-ui/core components
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
// Redux store
import * as actions from '../../store/actions/actions';
// core components

// documentation fo this table: https://material-table.com/#/

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
  hr:{
    color: "red",
    backgroundColor: "red",
    height: 2
  }
}));



function Table({ ...props }) {
  /* props: 
    1- redux methods and states declared below in mapStateToProps and mapDispatchToProps
    2- tableHead: fields and types of the data that will be listed in the table
    3- url: url of the backend get endpoint where get the data */

  const classes = useStyles();


  useEffect(() => {
    props.initializingForm();
    props.getData(props.url);
  }, []);

  let errorMessage = null;
    if (props.error) { //this helps to show error message if the get fail is dispatched
          errorMessage = ( // if the error is not invalid auth credentials, shows whatever error is
            <div>
              <br /><hr className={classes.hr} />
              <p style={{color:"red"}}>{"ERROR: " + props.error.message}</p>
              <hr className={classes.hr} /><br />
            </div>
        );
    }
  // delete element error
  let DeleteErrorMessage = null;
  if (props.DeleterequestError) { //this helps to show error message if the get fail is dispatched
    console.log(11111111111111)
     DeleteErrorMessage = ( // if the error is not invalid auth credentials, shows whatever error is
          <div>
            <br /><hr className={classes.hr} />
            <p style={{color:"red"}}>{"Advertencia: No se ha podido eliminar el elemento"}</p>
            <p style={{color:"red"}}>{"ERROR: " + props.DeleterequestError.message}</p>
            <hr className={classes.hr} /><br />
          </div>
      );
  }

  if(props.DeleterequestSuccess){
    window.alert("Se ha eliminado el elemento con exito");
    window.location.reload(false);
  }


  return (
    <div>
       {props.loading ?  //if this.props.loading==true: shows loading icon
        <div>
          <p >Cargando datos...</p>
          <CircularProgress  className={classes.progress}/>
        </div>
        :
        <div></div>}
    
    {/* shows error message if we have an error */}

    {props.DeleterequestLoading ?  //delete user loading
        <div>
          <p >Eliminando usario...</p>
          <CircularProgress  className={classes.progress} color="secondary"/>
        </div>
        :
        <div></div>}

    {errorMessage }
    {DeleteErrorMessage }
    
    <MaterialTable
      title=""
      columns={props.tableHead}
      data={props.data}
      actions={[
        {
          icon: 'delete',
          tooltip: 'Eliminar elemento',
          onClick: (event, rowData) => {
            // Do save operation
            if (window.confirm("¿Esta seguro que desea eliminar este elemento?")){
              props.Delete(rowData.id);
            }
          }
        },
        {
          icon: 'edit',
          tooltip: 'Editar elemento',
          onClick: (event, rowData) => {
            props.Edit(rowData.id, rowData);
          }
        },
        
      
      ]}
      
      // this part is the traduction of the fields en in the table
      localization={{
        body: {
          emptyDataSourceMessage: 'No hay datos disponibles',
        },
        toolbar: {
          searchTooltip: 'buscar',
          searchPlaceholder: 'buscar'
        },
        pagination: {
          labelRowsSelect: 'filas',
          labelDisplayedRows: ' {from}-{to} de {count}',
          firstTooltip: 'primera pagina',
          previousTooltip: 'pagina anterior',
          nextTooltip: 'siguiente pagina',
          lastTooltip: 'ultima pagina'
        }
      }}
    />
    </div>
  );
}


function mapStateToProps(state) { // this pass the items of the state we choose to the props of the components in connect function
  return {
    loading: state.loading,
    error: state.error,
    data: state.data,
    // delete variables
    DeleterequestSuccess : state.DeleterequestSuccess,
    DeleterequestError: state.DeleterequestError, 
    DeleterequestLoading: state.DeleterequestLoading,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getData: (url) => dispatch(actions.getData(url)),
    postData: (data) => dispatch(actions.postData(data)),
    initializingForm: () => dispatch(actions.initializingForm()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);