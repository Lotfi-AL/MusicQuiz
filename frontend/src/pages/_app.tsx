import "../styles/globals.css";
import App, { AppContext, AppInitialProps } from "next/app";
import wrapper from "../redux/store";
import React from "react";

class WrappedApp extends App<AppInitialProps> {
    static async getInitialProps({ Component, ctx }: AppContext) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
        return { pageProps: pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;

        return <Component {...pageProps} />;
    }
}

export default wrapper.withRedux(WrappedApp);
