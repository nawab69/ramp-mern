import {
  PAYMENT_CREATE_FAIL,
  PAYMENT_CREATE_REQUEST,
  PAYMENT_CREATE_SUCCESS,
  PAYMENT_FETCH_FAIL,
  PAYMENT_FETCH_REQUEST,
  PAYMENT_FETCH_RESET,
  PAYMENT_FETCH_SUCCESS,
} from "../constants/paymentConstant";

export const paymentReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_FETCH_REQUEST:
      return { loading: true };
    case PAYMENT_FETCH_SUCCESS:
      return { loading: false, success: true, paymentInfo: action.payload };
    case PAYMENT_FETCH_FAIL:
      return { loading: false, error: action.payload };
    case PAYMENT_FETCH_RESET:
      return {};
    default:
      return state;
  }
};

export const paymentCreation = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_CREATE_REQUEST:
      return { loading: true };
    case PAYMENT_CREATE_SUCCESS:
      return { loading: false, success: true, paymentInfo: action.payload };
    case PAYMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
