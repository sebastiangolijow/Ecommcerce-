import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";

export default function MultifactorAuth(params) {
  const [open, setOpen] = React.useState(false);
  const [pin, setPin] = React.useState(1111);
  const SUPABASE_URL = "https://zgycwtqkzgitgsycfdyk.supabase.co";
  const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNzczMDk4NCwiZXhwIjoxOTMzMzA2OTg0fQ.v7M4hQhgNYxkXa3zwDLs5dAWR_1egDuCASySblcNgSA";
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  const createPin = async () => {
    // e.preventdefault()
    //must have an email
    // generate pin
    let newPin = Math.round(Math.random() * 9999);
    //save pin in supabase
    // eslint-disable-next-line
    const { data, error } = await supabase
      .from("users")
      .update({ pin: `${newPin}` })
      .eq("email", `${params.email}`);
    //send pin by email (ask marian)
    await axios.post(
      `https://henrystechstore.herokuapp.com/mercadopago/send?pin=${newPin}&email=${params.email}`
    );
  };

  const catchPin = async () => {
    //catch pin
    // eslint-disable-next-line
    const { data: userPin, error } = await supabase
      .from("users")
      .select("pin")
      .eq("email", `${params.email}`);

    return userPin === pin;
  };

  const handleClickOpen = () => {
    setOpen(true);
    createPin();
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    setPin(e.target.value);
  };

  const handleLogin = (e) => {
    if (catchPin()) {
      params.onLogin();
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Complete login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Write the 4 digits pin we send you by mail
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="pin"
            label="Pin"
            type="number"
            value={pin}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogin} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
