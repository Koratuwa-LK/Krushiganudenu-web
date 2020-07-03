import React, { useCallback, useContext ,useState} from "react";
import { withRouter, Redirect } from "react-router";
import app from "./firebase";
import { AuthContext } from "./Auth.js";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import {Link} from 'react-router-dom'
import { Container } from "@material-ui/core";
import './login.css'


const Login = ({ history }) => {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }



  return (
    <div>
      
      
     
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick disableEscapeKeyDown>
        <Container>
          <div className="text">
             <h2>SIGN IN</h2>
          </div>
      <form onSubmit={handleLogin}>
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
          

        <Button type="submit"  variant="contained" color="primary" style={{marginTop: "30px"}}>
            Login
          </Button>

          <Link to='/signUp'>
          <Button variant="contained" color="primary" style={{marginTop: "30px",marginLeft:"20px"}}>
            Sign Up
          </Button>
          </Link>
        </div>
        <br></br>
      </form>
      </Container>
      </Dialog>
    </div>
  );
};

export default withRouter(Login);