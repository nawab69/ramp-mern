import { Button, TableCell, TableRow } from "@material-ui/core";
import { RampInstantSDK } from "@ramp-network/ramp-instant-sdk";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const PaymentRow = (props) => {
  const {
    swapAmount,
    createdAt,
    swapAsset,
    userAddress,
    status,
    user,
    _id,
  } = props.payment;
  const { userInfo } = useSelector((state) => state.userLogin) ?? null;
  const history = useHistory();

  const handlePurchase = async (e) => {
    const config = {
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/payments/paid/${_id}`, {}, config);
    console.log(data);
  };

  const handlePayment = (swapAmount, userAddress, swapAsset) => {
    console.log(swapAmount);
    new RampInstantSDK({
      hostAppName: "Maker DAO",
      hostLogoUrl:
        "https://cdn-images-1.medium.com/max/2600/1*nqtMwugX7TtpcS-5c3lRjw.png",
      swapAmount: swapAmount,
      userAddress: userAddress,
      swapAsset: swapAsset,
      fiatCurrency: "USD",
    })
      .on("PURCHASE_SUCCESSFUL", handlePurchase)
      .show();
  };
  return (
    <>
      <TableRow key={_id}>
        {history.location.pathname === "/admin/payments" && (
          <TableCell>{user.email}</TableCell>
        )}
        <TableCell>{swapAsset}</TableCell>
        <TableCell>{swapAmount}</TableCell>
        <TableCell>{createdAt}</TableCell>
        <TableCell>{userAddress}</TableCell>

        <TableCell>{status}</TableCell>
        <TableCell>
          {!(history.location.pathname === "/admin/payments") &&
            status !== "success" && (
              <Button
                onClick={() => {
                  handlePayment(swapAmount, userAddress, swapAsset);
                }}
                variant="contained"
                color="primary"
              >
                PAY
              </Button>
            )}
          {!(history.location.pathname === "/admin/payments") &&
            status === "success" && <Button variant="flat">PAID</Button>}
        </TableCell>
      </TableRow>
    </>
  );
};

export default PaymentRow;
