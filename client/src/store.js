import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userReducer,
  userRegReducer,
  userUpdateByAdminReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import { paymentCreation, paymentReducer } from "./reducers/paymentReducers";

const reducer = combineReducers({
  userLogin: userReducer,
  userReg: userRegReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userDetails: userDetailsReducer,
  userUpdateByAdmin: userUpdateByAdminReducer,
  paymentList: paymentReducer,
  paymentCreation: paymentCreation,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  paymentDetails: { paymentInfo: {} },
  userList: { userlist: {} },
  paymentCreated: {},
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
