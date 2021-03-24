import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "./Title";
import { fetchPayments } from "../actions/paymentActions";
import { useHistory } from "react-router";
import PaymentRow from "./PaymentRow";
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Tom Scholz",
    "Boston, MA",
    "MC ⠀•••• 1253",
    100.81
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    212.79
  ),
];

const PaymentTable = () => {
  const paymentList = useSelector((state) => state.paymentList) ?? null;
  const { loading, success, paymentInfo } = paymentList;
  const dispatch = useDispatch();
  useEffect(() => {
    fetchPayment();
    console.log(paymentList);
  }, []);

  const fetchPayment = () => {
    dispatch(fetchPayments());
  };

  const history = useHistory();

  return (
    <div style={{padding: '20px'}}>
      <Title>Payments</Title>

      <Table size="medium">
        <TableHead>
          <TableRow>
            {history.location.pathname === "/admin/payments" && (
              <TableCell>User Email</TableCell>
            )}
            <TableCell>Asset</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>User Address</TableCell>
            <TableCell>Status</TableCell>
            {history.location.pathname !== "/admin/payments" && (
            <TableCell>Action</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {success
            ? paymentInfo.map((payment) => <PaymentRow payment={payment} />)
            : "Loading"}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentTable;
