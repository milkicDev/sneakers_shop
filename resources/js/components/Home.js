import React, { Component } from "react";
import axios from "axios";
import ProductThumb from "./Product/List";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      products: [],
    };
  }

  componentDidMount() {
    // Get data from API
    axios
      .get("/products")
      .then((res) => {
        this.setState({
          products: res.data,
          isLoading: false,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { products, isLoading } = this.state;

    let ProductsList = "Loading...";
    if (!isLoading) {
      ProductsList = products.map((product, key) => (
        <div className="col-md-4 mb-4" key={key}>
          <ProductThumb product={product} />
        </div>
      ));
    }

    return (
      <div className="container">
        <div className="row">{ProductsList}</div>
      </div>
    );
  }
}

export default Home;
