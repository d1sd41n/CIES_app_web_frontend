import React, { useState, useEffect  } from "react";
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

  console.log("Table", props)
  const classes = useStyles();


  useEffect(() => {
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
    {errorMessage }
    
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
            const result = window.confirm("¿Esta seguro que desea eliminar este usuario?");
            console.log(result, rowData);
          }
        },
        {
          icon: 'edit',
          tooltip: 'Editar elemento',
          onClick: (event, rowData) => {
            props.Edit(rowData.id);
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
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getData: (url) => dispatch(actions.getData(url)),
    postData: (data) => dispatch(actions.postData(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);