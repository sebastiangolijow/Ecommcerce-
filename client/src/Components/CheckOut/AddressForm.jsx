import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { searchPoints } from "../../Redux/Users/usersActions";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AddressForm({ setInfoUser, discount, setDiscount }) {
  const user = useSelector((state) => state.usersReducer.userLoged);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [inputAddress, setInputAddress] = useState({
    streetName: "",
    streetNumber: "",
    postalCode: "",
  });
  const [form, setform] = useState({
    firstName: "",
    surname: "",
    phone: "",
    email: "",
    streetName: "",
    streetNumber: 0,
    postalCode: "",
  });

  useEffect(() => {
    setInfoUser(infoUser);
    // eslint-disable-next-line
  }, [inputAddress, form]);

  useEffect(() => {
    setDiscount(discount);
    // eslint-disable-next-line
  }, [discount]);

  let applyDiscount = async (e) => {
    e.persist();
    e.preventDefault();
    let response = await dispatch(searchPoints(user.id));
    if (response > e.target.value * 2 * Math.pow(10, 4)) {
      setDiscount(e.target.value);
    } else {
      swal("Oops", "You don't have enough Tech Points", "error");
    }
  };

  const handleAddress = (e) => {
    e.preventDefault();
    let addresUser = user.address.find(
      (item) => item.address === e.target.value
    );
    setInputAddress({
      streetName: addresUser?.address,
      streetNumber: addresUser?.streetNumber,
      postalCode: addresUser?.postal_code,
    });
  };

  const handleForm = (e) => {
    e.preventDefault();
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  if (user.id) {
    var infoUser = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      phone: parseInt(user.phone),
      email: user.email,
      addres: inputAddress,
    };
  } else {
    // eslint-disable-next-line
    var infoUser = {
      firstName: form.firstName,
      lastName: form.lastName,
      phone: parseInt(form.phone),
      email: form.email,
      addres: {
        streetName: form.streetName,
        streetNumber: parseInt(form.streetNumber),
        zip: form.zip,
      },
    };
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      {user?.id ? (
        <div>
          <FormControl required className={classes.formControl}>
            <InputLabel>Address</InputLabel>
            <Select
              onChange={(e) => handleAddress(e)}
              className={classes.selectEmpty}
            >
              <MenuItem value="">None</MenuItem>
              {user.address.map((item) => {
                return (
                  <MenuItem value={item.address}>
                    {item.address} {item.streetNumber}{" "}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel>Redeem Tech-Points</InputLabel>
            <Select
              onChange={(e) => applyDiscount(e)}
              className={classes.selectEmpty}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="0.1">
                Discount 10% cost 2000 Tech Points
              </MenuItem>
              <MenuItem value="0.2">
                Discount 20% cost 4000 Tech Points
              </MenuItem>
              <MenuItem value="0.4">
                Discount 40% cost 8000 Tech Points
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              onChange={handleForm}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              onChange={handleForm}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="E-mail"
              fullWidth
              autoComplete="email"
              onChange={handleForm}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="streetName"
              name="streetName"
              label="Street name"
              fullWidth
              autoComplete="streetName"
              onChange={handleForm}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="streetNumber"
              name="streetNumber"
              label="Street number"
              fullWidth
              autoComplete="streetNumber"
              onChange={handleForm}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              onChange={handleForm}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phone"
              name="phone"
              label="Phone"
              fullWidth
              autoComplete="phone"
              onChange={handleForm}
            />
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}
