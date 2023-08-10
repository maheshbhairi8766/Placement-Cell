import React from 'react';
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
} from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
function Navbr(args) {
  let navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("adminauthToken")
    localStorage.removeItem("adminEmail")
    localStorage.removeItem("adminname")
    navigate("/")
  }
  return (
    <div style={{ border: '2px solid black' }}>
      <Navbar {...args}>
        <NavbarBrand href="/">Placement-Cell</NavbarBrand>
        <Nav className="me-auto" navbar >
          <div style={{ display: 'flex', margin: 1 }}>
            <NavItem>
              <Link style={{ display: 'flex', marginRight: 10 }} to="/">Home</Link>
            </NavItem>

            {(localStorage.getItem("authToken")) ?
              <div>
                {(!localStorage.getItem("adminauthToken")) ?
                  <div>
                    <NavItem>
                      <Link style={{ display: 'flex', marginRight: 10 }} to="/displaydata">Applied</Link>
                    </NavItem>
                  </div>
                  : ""}
                </div>
              : ""}
            {(!localStorage.getItem("authToken")) ?
              <div style={{ display: 'flex', margin: 1 }}>
                <NavItem>
                  <Link style={{ display: 'flex', marginRight: 10 }} to="/login">Login</Link>
                </NavItem>
                <NavItem>
                  <Link style={{ display: 'flex', marginRight: 10 }} to="/signup">SignUp</Link>
                </NavItem>
              </div>
              :
              <div>
                <NavItem>
                  <Link style={{ display: 'flex', marginRight: 10 }} onClick={handlelogout}>Logout</Link>
                </NavItem>
              </div>
            }

          </div>
        </Nav>
        {(localStorage.getItem("authToken")) ?
          <div>
            <NavItem>
              <Link to="/profile">Profile</Link>
            </NavItem>
          </div>
          :
          <div style={{ display: 'flex', margin: '10px' }}>
            <UncontrolledDropdown nav inNavbar style={{ display: 'flex', marginRight: 10 }}>
              <DropdownToggle nav caret >
                Admin
              </DropdownToggle>
              <DropdownMenu right >
                <DropdownItem style={{ width: '70px' }} >
                  <Link to="/adminlogin">Login</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/adminsignup">Signup</Link>
                </DropdownItem>

              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        }
      </Navbar>
    </div>
  );
}

export default Navbr;