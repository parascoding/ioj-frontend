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
import { doLogout, getCurrentUserDetail, isLoggedIn } from "../services/auth/auth";
const NavBar = () => {
  const [openNav, setOpenNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const logout = () => {
    doLogout(() => {
      navigate('/signin')
    });
    
  }
  return (
    <>
       <Navbar color="light" light expand="md" className="px-3">
        <NavbarBrand href="/">IOJ</NavbarBrand>
        <NavbarToggler
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-0" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to={"/user"+"/dashboard"}>
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
                <NavLink>
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
