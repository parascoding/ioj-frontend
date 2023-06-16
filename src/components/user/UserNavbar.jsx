import React, { useState, useEffect } from "react";
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import NavBar from "../NavBar";
const UserNavbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  
  return (
    <>
       <NavBar />
    </>
  );
};
export default UserNavbar;
