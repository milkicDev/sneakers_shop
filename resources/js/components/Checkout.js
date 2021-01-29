import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: JSON.parse(localStorage.getItem("cart")) || null,
      productsData: [],
      isLoading: true,
      user: JSON.parse(localStorage.getItem("user")) || {},
      submitSuccess: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // Get data from API
    axios
      .get("/products")
      .then((res) => {
        this.setState({
          productsData: res.data,
          isLoading: false,
        });
      })
      .catch((err) => console.log(err));
  }

  handleSubmit(e) {
    // When the user press submit save data(user information & order history) in local storage
    e.preventDefault();
    const { user, cartItems } = this.state;

    if (user.fullname.trim() != "" && user.address.trim() != "" && cartItems) {
      localStorage.setItem("user", JSON.stringify(user));

      const orderHistory = JSON.parse(localStorage.getItem("order"));
      let orderItems = [];
      if (orderHistory) {
        orderItems = cartItems.concat(orderHistory);
      } else {
        orderItems = cartItems;
      }

      localStorage.setItem("order", JSON.stringify(orderItems));
      localStorage.removeItem("cart");

      this.setState({ cartItems: null }); // Remove all items from the shopping cart
      this.setState({ submitSuccess: true });
    }
  }

  handleChange(e) {
    this.state.user[e.target.name] = e.target.value;
  }

  render() {
    const {
      cartItems,
      productsData,
      isLoading,
      submitSuccess,
      user,
    } = this.state;

    const products = [];
    let ProductsList = "Loading...";
    if (cartItems && !isLoading) {
      cartItems.map((item) => {
        products.push(productsData.find((product) => product.id == item.id));
      });

      ProductsList = products.map((product, key) => (
        <li key={key}>
          {product.title} - <strong>{product.price}</strong>€
        </li>
      ));
    }

    if (!cartItems) {
      ProductsList = "Time to go shopping for low-priced!";
    }

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                {!cartItems
                  ? "Your shopping cart is currently empty."
                  : `You have ${cartItems.length} items in shopping cart`}
              </div>

              <div className="card-body">
                {submitSuccess ? <h4>Your purchase was successful</h4> : ""}

                <ul>{ProductsList}</ul>

                {_.isEmpty(user) ? (
                  cartItems ? (
                    <div>
                      <hr />
                      <h5>Continue with shopping</h5>
                      <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="fullname">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="fullname"
                            placeholder="Enter your full name"
                            onChange={this.handleChange}
                          />
                        </Form.Group>

                        <Form.Group controlId="address">
                          <Form.Label>Address</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your address"
                            name="address"
                            onChange={this.handleChange}
                          />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                          Continue
                        </Button>
                      </Form>
                    </div>
                  ) : (
                    ""
                  )
                ) : cartItems ? (
                  <Form onSubmit={this.handleSubmit}>
                    <Button variant="primary" type="submit">
                      Continue
                    </Button>
                  </Form>
                ) : (
                  ""
                )}

                {!cartItems ? (
                  <div>
                    <h5>Go back to buy something..</h5>
                    <Link to="/">
                      <i className="fas fa-arrow-left"></i> Back to Home
                    </Link>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;
