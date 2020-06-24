import React, { forwardRef, Component } from "react";
import MaterialTable from "material-table";
import axios from "axios";

import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from "@material-ui/icons";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default class Inventory extends Component {
  constructor() {
    super();

    this.state = {
      columns: [
        { title: "Name", field: "name" },
        { title: "Catagory", field: "catagory" },
        { title: "Cost price", field: "cost_price" },
        { title: "Selling Price", field: "selling_price" },
        { title: "Quantity", field: "quantity" },
        {
          title: "Unit",
          field: "unit",
          lookup: {
            kg: "kg",
            pcs: "pcs",
            liter: "liter",
          },
        },
      ],
      data: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios
      .get("/items/get-all")
      .then((response) => {
        this.setState({ data: response.data, loading: false });
      })
      .catch((e) => {
        console.log(e);
        alert(e.response.data.error);
      });
  }

  render() {
    return (
      <div>
        <MaterialTable
          title="Inventory"
          columns={this.state.columns}
          data={this.state.data}
          icons={tableIcons}
          isLoading={this.state.loading}
          options={{
            addRowPosition: "first",
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                resolve();
                axios
                  .post("/items/add", newData)
                  .then((response) => {
                    console.log(response.data);
                    this.componentDidMount();
                  })
                  .catch((e) => {
                    console.log(e);
                    alert(e.response.data.error);
                  });
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                resolve();
                delete newData._id;
                axios
                  .post(`items/update/${oldData._id}`, newData)
                  .then((response) => {
                    this.componentDidMount();
                  })
                  .catch((e) => {
                    alert(e.response.data.error);
                  });
              }),
          }}
        />
      </div>
    );
  }
}
