import React, { Component } from "react";
import { Navbar, Nav, Badge, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: JSON.parse(localStorage.getItem("cart")) || null,
    };
  }

  componentDidMount() {
    // Check every second for changes
    this.interval = setInterval(() => {
      this.setState({
        cartItems: JSON.parse(localStorage.getItem("cart")),
      });
    }, 0);
  }

  componentWillUnmount() {
    // Clear interval if user exit from component
    clearInterval(this.interval);
  }

  render() {
    const css = {
      position: "absolute",
      width: "15px",
      height: "15px",
      top: "10px",
      right: "15px",
      fontSize: "10px",
      borderRadius: "100%",
    };

    return (
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Navbar.Brand as={Link} to="/">
          React Sneakers
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            <NavDropdown title="Profile" id="profile-dropdown">
              <NavDropdown.Item as={Link} to="/order-history">
                Order History
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        <Nav>
          <Nav.Link as={Link} to="/checkout">
            <i className="fas fa-shopping-cart"></i>
            {this.state.cartItems ? (
              <Badge variant="primary" style={css}>
                {this.state.cartItems.length}
              </Badge>
            ) : (
              ""
            )}
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
