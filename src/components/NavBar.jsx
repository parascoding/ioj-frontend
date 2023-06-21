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
import logo from "../img/logo.png";
import {
  doLogout,
  getCurrentUserDetail,
  isLoggedIn,
} from "../services/auth/auth";
const NavBar = () => {
  const [openNav, setOpenNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const logout = () => {
    doLogout(() => {
      navigate("/signin");
    });
  };
  const profile = () => {
    navigate("/navbar");
  };
  return (
    <>
      <Navbar color="light" light expand="md" className="px-3">
        <NavbarBrand href="/">
          <img src={logo} width={75} />
          IOJ
        </NavbarBrand>
        <NavbarToggler
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-0" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to={"/user" + "/dashboard"}>
                Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/user/compete">
                Compete
              </NavLink>
            </NavItem>
          </Nav>

          <Nav navbar className="position-absolute end-0">
            {isLoggedIn() && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} onClick={logout}>
                    Logout
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} onClick={profile}>
                    {getCurrentUserDetail()}
                  </NavLink>
                </NavItem>
              </>
            )}
            {!isLoggedIn() && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/signup">
                    Signup
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};
export default NavBar;
