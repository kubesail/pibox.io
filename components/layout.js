import Head from "next/head";

import Header from "./Header";
import NavBar from "./NavBar";

import "./Layout.module.css";
import "./index.module.css";

import navButtons from "../config/buttons";

const Layout = props => {
  const appTitle = `PIBOX`;

  return (
    <div className="Layout">
      <Head>
        <title>PIBOX</title>
      </Head>

      <Header appTitle={appTitle} />
      <div className="Content">{props.children}</div>
      <NavBar navButtons={navButtons} />
    </div>
  );
};

export default Layout;
