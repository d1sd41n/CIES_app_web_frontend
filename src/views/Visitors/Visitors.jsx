import React, {useEffect } from "react";
import { connect } from 'react-redux';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import MaterialTable from "../../components/Table/Table.jsx";
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


function TableList(props) {
  const { classes } = props;
  const style = useStyles();

  useEffect(() => {
    props.onTryAutoSignup();
  });

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Visitantes (NOTA: usuarios de la compañia completa, no de la sede)</h4>
            <p className={classes.cardCategoryWhite}>
              Aqui se listan todos los Visitantes de esta compañia
            </p>
          </CardHeader>
          <CardBody>

            <MaterialTable 
            tableHead={[
              { title: 'Nombre', field: 'first_name' },
              { title: 'Apellido', field: 'last_name' },
              { title: 'Cedula', field: 'dni'},
              { title: 'Email', field: 'email', },
              { title: 'Telefono', field: 'phone'},
              { title: 'id', field: 'id'},
            ]}
            url={'/core/companies/'+localStorage.getItem('company_id')+'/visitors/'}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

TableList.propTypes = {
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TableList));