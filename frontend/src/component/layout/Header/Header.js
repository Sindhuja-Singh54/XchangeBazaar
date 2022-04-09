import React from 'react'
import {ReactNavbar} from "overlay-navbar";
// import logo from "../../../images/logo.png";

const options = {
    burgerColorHover: "#eb4034",
    logo:"data:image/png;base64,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",
    logoWidth: "20vmax",
    navColor1: "white",
    logoHoverSize: "10px",
    logoHoverColor: "#eb4034",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "rgba(35, 35, 35,0.8)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#eb4034",
    link1Margin: "1vmax",
    profileIconUrl: "/login",
    profileIconColor: "rgba(35, 35, 35,0.8)",
    searchIconColor: "rgba(35, 35, 35,0.8)",
    cartIconColor: "rgba(35, 35, 35,0.8)",
    profileIconColorHover: "#eb4034",
    searchIconColorHover: "#eb4034",
    cartIconColorHover: "#eb4034",
    cartIconMargin: "1vmax",
  };
  
function Header() {
  return (
    <ReactNavbar  {...options} />
  );
}

export default Header;