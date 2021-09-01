import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import payFormReducer from "./reducers/form";
import { v4 as uuidv4 } from "uuid";

const curId = uuidv4();

const initState = {
  curFormData: {
    jsonrpc: "2.0",
    id: curId,
    method: "pay",
    params: {
      pan: "",
      expire: "",
      cardholder: "",
      cvc: "",
    },
  },
  isPayed: null,
};

const store = createStore(
  payFormReducer,
  initState,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

store.subscribe(() => {
  store.getState();
});

export default store;
