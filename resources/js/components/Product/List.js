import React from "react";
import { Card, Button } from "react-bootstrap";

let cartItems = [];
const addToCart = (id) => {
  const storageItems = JSON.parse(localStorage.getItem("cart"));

  if (storageItems) cartItems = storageItems;

  cartItems.push({ id: id });
  localStorage.setItem("cart", JSON.stringify(cartItems));
};

const ProductThumb = (props) => {
  return (
    <Card>
      <Card.Img variant="top" src={props.product.images[0].src} />
      <Card.Body>
        <Card.Title>{props.product.title}</Card.Title>
        <Card.Text>{props.product.price}€</Card.Text>

        <Button variant="primary" onClick={() => addToCart(props.product.id)}>
          Buy
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductThumb;
