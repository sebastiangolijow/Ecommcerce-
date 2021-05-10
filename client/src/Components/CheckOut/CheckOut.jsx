import React, { useState } from "react";
import { makeStyles, ThemeProvider, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import Review from "./OrderList";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { orderPayment } from "../../Redux/Orders/orderActions";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    marginLeft: "0",
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    width: 360,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      width: 720,
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    borderRadius: 3,
  },
}));

export default function CheckOut() {
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = React.useState(0);
  const cart = useSelector((state) => state.cartReducer.cart);

  const [infoUser, setInfoUser] = useState({});
  const [discount, setDiscount] = useState("");

  // eslint-disable-next-line
  const [t, i18n] = useTranslation("global");

  const steps = [
    "Review your order",
    "Shipping address" /*, 'Payment details'*/,
  ];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Review />;
      case 1:
        return (
          <AddressForm
            setInfoUser={setInfoUser}
            setDiscount={setDiscount}
            discount={discount}
          />
        );
      // case 2:
      //   return <PaymentForm />;
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleGoShopping = () => {
    history.push("/catalogue");
  };

  let handlePayment = async (e) => {
    e.preventDefault();
    let cartstock = cart.filter((product) => {
      return product.stock - product.quantity < 0;
    });
    if (cartstock.length) {
      swal("Oops", "Haven't stock", "error");
    } else {
      let response = await dispatch(orderPayment(cart, infoUser, discount));
      response && window.location.replace(response);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            {t("checkout.checkout")}
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel className={classes.step}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  {t("checkout.ty")}
                </Typography>
                <Typography variant="subtitle1">
                  {t("checkout.detail")}
                </Typography>
              </React.Fragment>
            ) : (
              <>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 ? (
                    <Button onClick={handleBack} className={classes.button}>
                      {t("checkout.back")}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleGoShopping}
                      className={classes.button}
                    >
                      {t("checkout.shopping")}
                    </Button>
                  )}
                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handlePayment}
                      className={classes.button}
                    >
                      {t("checkout.payment")}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {t("checkout.next")}
                    </Button>
                  )}
                </div>
              </>
            )}
          </>
        </Paper>
      </main>
    </ThemeProvider>
  );
}
