import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faMapMarkerAlt,
  faUser,
  faShoppingCart
} from "@fortawesome/free-solid-svg-icons";

const navButtons = [
  {
    label: "Home",
    path: "/",
    icon: <FontAwesomeIcon icon={faCompass} />
  },
  {
    label: "Blog",
    path: "/blog",
    icon: <FontAwesomeIcon icon={faMapMarkerAlt} />
  },
  {
    label: "Docs",
    path: "/docs",
    icon: <FontAwesomeIcon icon={faShoppingCart} />
  },
  {
    label: "Login",
    path: "/login",
    icon: <FontAwesomeIcon icon={faUser} />
  }
];

export default navButtons;