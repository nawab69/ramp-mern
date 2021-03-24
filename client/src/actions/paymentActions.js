import axios from "axios";
import {
  PAYMENT_CREATE_FAIL,
  PAYMENT_CREATE_REQUEST,
  PAYMENT_CREATE_SUCCESS,
  PAYMENT_FETCH_FAIL,
  PAYMENT_FETCH_REQUEST,
  PAYMENT_FETCH_SUCCESS,
} from "../constants/paymentConstant";

export const fetchPayments = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYMENT_FETCH_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/payments", config);

    dispatch({
      type: PAYMENT_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createNewPayment = (email, asset, amount, address) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PAYMENT_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "/api/payments/create",
      {
        userEmail: email,
        userAddress: address,
        swapAsset: asset,
        swapAmount: amount,
      },
      config
    );

    dispatch({
      type: PAYMENT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
