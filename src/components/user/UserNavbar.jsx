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
const UserNavbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  
  return (
    <>
       <Navbar color="light" light expand="md" className="px-3">
        <NavbarBrand href="/">AMS</NavbarBrand>
        <NavbarToggler
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-0" navbar>
            <NavItem>
              <NavLink>{/* tag={ReactLink} to={"/"+getRole()+"/dashboard"}>*/}
                Dashboard
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink tag={ReactLink} to="/about">
                About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/contact">
                Contact Us
              </NavLink>
            </NavItem> */}
          </Nav>
        
        <Nav navbar className="ml-auto">
          {login && (
            <>
              <NavItem>
                <NavLink>{/* tag={ReactLink} onClick={logout}>*/}
                  Logout
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink> {/*tag = {ReactLink} to = "/user/profile">{user}*/}</NavLink>
              </NavItem>
            </>
          )}
          {!login && (
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
export default UserNavbar;
