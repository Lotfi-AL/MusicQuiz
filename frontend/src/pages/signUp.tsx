import { Button, FormHelperText, Grid, TextField, Typography, Container, Link as MULink } from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../redux/authentication/actions";

const SignUp = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { error } = useSelector((state) => state.authentication);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(error);
        dispatch(signUp({ username, password }, router));
    };

    return (
        <Container maxWidth="xs">
            <br />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography align="center" variant="h5" component="h5">
                        Register
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        required
                        label="Username"
                        data-testid="username"
                        variant="outlined"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        required
                        type="password"
                        data-testid="password"
                        label="Password"
                        variant="outlined"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth variant="contained" color="primary" data-testid="USB" onClick={handleSubmit}>
                        Register
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Link href="/signIn">
                        <MULink href="/signIn">Already have a user? Sign in here</MULink>
                    </Link>
                </Grid>
                <Grid item xs={12}>
                    {error != "" ? <FormHelperText error={true}>Noe gikk galt</FormHelperText> : null}
                </Grid>
            </Grid>
        </Container>
    );
};

export default SignUp;
