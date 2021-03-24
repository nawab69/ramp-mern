import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import Copyright from "../components/Copyright";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { register } from "../actions/userActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const RegisterScreen = (props) => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState("/dashboard");
  const adminRedirect = "/admin";
  const { loading, success, userInfo, error } = useSelector(
    (state) => state.userLogin
  );

  const formValidation = () => {
    if (username.lenght <= 0) {
      toast.error("Username is Empty");
      return "error";
    }
    if (email.lenght <= 0) {
      toast.error("Email is Empty");
      return "error";
    }
    if (password.lenght <= 0) {
      toast.error("Password is Empty");
      return "error";
    }
    if (password !== confirmPassword) {
      toast.error("Password not matched");
      return "error";
    }
  };
  const handleRegister = (e) => {
    e.preventDefault();
    const validate = formValidation();
    if (validate === "error") {
      return;
    } else {
      dispatch(register(username, email, password));
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      props.history.push(adminRedirect);
    } else if (userInfo) {
      props.history.push(redirect);
    }
    if (loading) {
      toast.loading("Logging ..... ");
    }
    if (error) {
      toast.dismiss();
      toast.error("Invalid Login");
    }
    if (userInfo && success) {
      toast.dismiss();
      toast.success("Login Successfull");
    }
  }, [loading, error, success]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={handleRegister} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            autoComplete="name"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <FormControlLabel
            control={<Checkbox value="accept" color="primary" />}
            label="I accept Terms and Conditions"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default RegisterScreen;
