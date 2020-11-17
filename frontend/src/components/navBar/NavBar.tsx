import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, connect } from "react-redux";
import { signOut } from "../../redux/authentication/actions";
import Link from "next/link";
import { ApplicationState } from "../../redux/store";
import styles from "./NavBar.module.css";

const NavBar = (store) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleSignIn = (event) => {
        event.preventDefault();
        router.push("/signIn");
    };

    const handleSignOut = (event) => {
        event.preventDefault();
        dispatch(signOut(router));
    };
    const handleMainPage = (event) => {
        event.preventDefault();
        router.push("/");
    };

    const currentUser = store.authentication.currentUser;

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={styles.title}>
                    <Link href="/">
                        <span data-test="mainpage-title" className={styles.pointer}>Music Quiz</span>
                    </Link>
                </Typography>

                {currentUser != null ? (
                    <Button data-test="signout" color="inherit" onClick={handleSignOut}>
                        Sign out
                    </Button>
                ) : (
                        <Button data-test="signin" color="inherit" onClick={handleSignIn}>
                            Sign in
                        </Button>
                    )}
            </Toolbar>
        </AppBar >
    );
};

export default connect((state: ApplicationState) => state)(NavBar);
