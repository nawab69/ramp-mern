import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createNewPayment } from "../actions/paymentActions";
import { Button, TextField } from "@material-ui/core";

const CreatePayment = (props) => {
  const { email } = useParams();
  const [asset, setAsset] = useState("ETH");
  const [amount, setAmount] = useState("0");
  const [address, setAddress] = useState("");
  const paymentCreation = useSelector((state) => state.paymentCreation);
  const { loading, error, success } = paymentCreation;
  const dispatch = useDispatch();
  const history = useHistory();
  const handleFormSubmission = (e) => {
    e.preventDefault();
    if (email.length < 1) {
      toast.error("Email is required");

      return;
    }
    if (asset.length < 1) {
      toast.error("Asset is Required");

      return;
    }
    if (amount <= 0) {
      toast.error("Invalid Amount");
      return;
    }
    if (address.length < 1) {
      toast.error("Address is required");
      return;
    }

    dispatch(createNewPayment(email, asset, amount, address));
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success("Payment Created Successfull");
      history.push("/admin/users");
    }
  }, [success]);

  return (
    <div style={{ padding: "20px" }}>
      <form noValidate autoComplete="off" onSubmit={handleFormSubmission}>
        <div>
          <TextField
            fullWidth
            required
            readonly
            label="Email"
            value={email ?? ""}
          />
        </div>
        <div>
          <TextField
            fullWidth
            required
            readonly
            label="Asset"
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
          />
        </div>
        <div>
          <TextField
            fullWidth
            required
            readonly
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <TextField
            fullWidth
            required
            readonly
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <Button type="submit" variant="contained" color="secondary">
            {" "}
            Submit{" "}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePayment;
