import React, {useEffect } from "react";
import { connect } from 'react-redux';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import MaterialTable from "../../components/Table/UsersTable.jsx";
// Redux store
import * as actions from '../../store/actions/actions';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(theme => ({
  button: {
    backgroundColor: "purple",
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginLeft: theme.spacing(1),
  }
}));


function Users(props) {
  console.log(props)
  const { classes } = props;
  const style = useStyles();

  useEffect(() => {
    props.onTryAutoSignup();
  });

  const Delete = (id) => {
    // send us to the form to edit the visistor with its id
    // props.history.push('/admin/editarvisitante/'+id);
    console.log("delete", id)
    const url = '/core/companies/1/seats/1/users/'+id+'/';
    props.deleteData(url);
    // window.location.reload(false);
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Usuarios</h4>
            <p className={classes.cardCategoryWhite}>
              Aqui se listan todos los usuarios de esta sede
            </p>
          </CardHeader>
          <CardBody>
            {/* button to add new user */}
            <Button variant="contained" color="primary" className={style.button} 
                  onClick={() => { props.history.push('/admin/createuser'); }}>
              Agregar usuario
              {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
              <Icon className={style.leftIcon}>person_add</Icon>
            </Button>

            <MaterialTable 
            tableHead={[
              { title: 'Nombre', field: 'first_name' },
              { title: 'Apellido', field: 'last_name' },
              { title: 'Cedula', field: 'dni'},
              { title: 'Email', field: 'email', },
              { title: 'Nombre De Usuario', field: 'username'},
              { title: 'Tipo De Usuario', field: 'type'},
              { title: 'id', field: 'id'},
            ]}
            url={'/core/companies/'+localStorage.getItem('company_id')+'/seats/'+localStorage.getItem('company_id')+'/users/'}
            Delete = {Delete}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

Users.propTypes = {
  classes: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
      nothing: null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    deleteData: (url) => dispatch(actions.deleteData(url)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Users));