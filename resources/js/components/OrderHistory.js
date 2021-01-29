import React, { Component } from "react";
import axios from "axios";

class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsData: [],
      isLoading: true,
      user: JSON.parse(localStorage.getItem("user")) || null,
      order: JSON.parse(localStorage.getItem("order")) || null,
    };
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

  render() {
    const { order, productsData, isLoading } = this.state;

    const products = [];
    let totalPrice = 0;
    let ProductsList = "Loading...";
    if (order && !isLoading) {
      order.map((item) => {
        // Find a product by ID and add it to variable products
        products.push(productsData.find((product) => product.id == item.id));
      });

      ProductsList = products.map((product, key) => (
        <li key={key}>
          {product.title} - <strong>{product.price}</strong>€
        </li>
      ));

      // Sum price
      totalPrice = products
        .map((item) => item.price)
        .reduce((prev, next) => prev + next, 0);
    }

    if (!order) {
      // If the order history is empty show some text
      ProductsList = "Time to go shopping for low-priced!";
    }

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                {!order
                  ? "Your order history is currently empty."
                  : `You bought ${order.length} items from the shopping cart`}
              </div>

              <div className="card-body">
                <ul>{ProductsList}</ul>

                {totalPrice > 0 ? (
                  <p>
                    Total: <strong>{totalPrice}€</strong>
                  </p>
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

export default OrderHistory;
