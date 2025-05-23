import React, {useContext} from "react";
import './NavBar.css';
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "../UserContext";

const NavBar = ( { logout } ) => {
  const { currentUser } = useContext(UserContext);
    return (
        <div>
        <Navbar expand="md">
          <NavLink className='home' exact to="/">
            Jobly
          </NavLink>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink to="/companies">Companies</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/jobs">Jobs</NavLink>
            </NavItem>
            {(currentUser) ? (
              <>
              <NavItem>
                <NavLink to="/profile">Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/" activeClassName='none' onClick={logout}>Logout</NavLink>
              </NavItem>
              </>
            ) :
            (
              <NavItem>
              <NavLink to="/login">Login</NavLink>
            </NavItem>
            ) 
            }
          </Nav>
        </Navbar>
      </div>
    );
}

export default NavBar;