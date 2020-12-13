import Link from "next/link";

import "./Header.module.css";

const Header = props => (
  <Link href="/">
    <div className="Header">{props.appTitle}</div>
  </Link>
);

export default Header;