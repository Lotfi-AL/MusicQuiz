import { Container } from "@material-ui/core";
import React from "react";
import styles from "./Layout.module.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Container maxWidth="md" className={styles.content}>
            {children}
        </Container>
    );
};

export default Layout;
