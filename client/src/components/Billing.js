import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Header, Body, Row, Heading, Cell } from "@react-spectre/table";
import { FormGroup } from "@react-spectre/form";
import Button from "@material-ui/core/Button";

export default class Billing extends Component {
  constructor() {
    super();
    this.state = {
      inventory_data: {},
      billing_data: [],
      total_amount: 0,
      products: [],
      units: ["kg", "liters", "pcs"],
      item_name: "",
      item_quantity: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }
  componentDidMount() {
    axios
      .get("/items/get-available-items")
      .then((result) => {
        let inventory = new Object();
        result.data.map((item) => {
          this.state.products.push(item.name);
          inventory[item.name] = item;
        });
        this.setState({
          inventory_data: inventory,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const {
      inventory_data,
      item_name,
      item_quantity,
      total_amount,
    } = this.state;
    let amount = inventory_data[item_name].selling_price * item_quantity;

    // console.log(inventory_data[item_name].cost_price);
    inventory_data[item_name].quantity_sold = item_quantity;
    inventory_data[item_name].amount = amount;
    this.state.billing_data.push(inventory_data[item_name]);
    this.setState({
      total_amount: total_amount + amount,
    });
  }

  placeOrder() {
    // console.log(this.state.billing_data);
    axios
      .post("/items/quantity-update", this.state.billing_data)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  render() {
    return (
      <div>
        <h2>Billing</h2>
        <FormGroup className="input-group">
          <select
            className="form-input"
            onChange={this.handleChange}
            name="item_name"
            value={this.state.item_name}
            required="required"
          >
            <option>Choose a product</option>
            {this.state.products.map((product) => {
              return <option>{product}</option>;
            })}
          </select>
          <input
            type="number"
            step="0.01"
            className="form-input"
            placeholder="Quantity"
            onChange={this.handleChange}
            name="item_quantity"
            value={this.state.item_quantity}
            required="required"
          />
          <select className="form-input" onChange={this.handleChange} required>
            {this.state.units.map((unit) => {
              return <option>{unit}</option>;
            })}
          </select>
          <button
            type="submit"
            className="btn btn-primary input-group-btn"
            onClick={this.handleSubmit}
          >
            Add
          </button>
        </FormGroup>
        <Table striped>
          <Header>
            <Row>
              <Heading>Name</Heading>
              <Heading>Quantity</Heading>
              <Heading>Rate</Heading>
              <Heading>Amount</Heading>
            </Row>
          </Header>
          <Body>
            {this.state.billing_data.map((item) => {
              return (
                <Row active>
                  {" "}
                  <Cell>{item.name}</Cell>
                  <Cell>{item.quantity_sold}</Cell>
                  <Cell>{item.selling_price}</Cell>
                  <Cell>{item.amount}</Cell>
                </Row>
              );
            })}

            {this.state.billing_data.length ? (
              <Row>
                <Cell>
                  <strong>Total</strong>
                </Cell>
                <Cell></Cell>
                <Cell></Cell>
                <Cell>{this.state.total_amount}</Cell>
              </Row>
            ) : (
              <div></div>
            )}
          </Body>
        </Table>
        {this.state.billing_data.length ? (
          <Button color="primary" onClick={this.placeOrder}>
            <Link to="/" className="btn btn btn-secondary">
              Place Order
            </Link>
          </Button>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
