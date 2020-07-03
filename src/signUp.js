import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "./firebase";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import {Link} from 'react-router-dom'
import { Container } from "@material-ui/core";
import './login.css'

const SignUp = ({ history }) => {

  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <div>
      

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick disableEscapeKeyDown>
        <Container>
          <div className="text">
             <h2>SIGN UP</h2>
          </div>
      <form onSubmit={handleSignUp}>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            type="email"
            fullWidth
            name="email"
          />
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            name="password"
          />
        <div className="text">
          
          
          <Button variant="contained" type="submit" color="primary" style={{marginTop: "30px"}}>
            Sign Up
          </Button>
         
        </div>
        <br></br>
      </form>
      </Container>
      </Dialog>
    </div>
   
    
  );
};

export default withRouter(SignUp);