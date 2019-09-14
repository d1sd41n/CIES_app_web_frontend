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
import RecordsTable from "../../components/Table/RecordsTable.jsx";
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


function Records(props) {
  const { classes } = props;

  useEffect(() => {
    props.onTryAutoSignup();
  });

  const Edit = (id, data) => {
    // send us to the form to edit the visistor with its id
    props.initializingEdit(data);
    props.history.push('/admin/editarvisitante/'+id);
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Generar codigos</h4>
            <p className={classes.cardCategoryWhite}>
              Aqui se generan los codigos QR
            </p>
          </CardHeader>
          <CardBody>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

Records.propTypes = {
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
    initializingEdit: (data) => dispatch(actions.initializingEdit(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Records));