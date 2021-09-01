import { FORM_SET_PARAMS, ADD_PID_TO_STATE, IS_PAID } from "../types";

export const changeFormData = (data) => async (dispatch) => {
  dispatch(changeFormDataAC(data));
  try {
    const response = await fetch("http://localhost:2050/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    const pid = res.result.pid;
    dispatch(addPidToState(pid));
  } catch (e) {
    console.log(e);
  }
};
export const changeFormDataAC = (data) => {
  return {
    type: FORM_SET_PARAMS,
    payload: data,
  };
};

export const addPidToState = (pid) => {
  return {
    type: ADD_PID_TO_STATE,
    payload: pid,
  };
};

export const isPayd = (pid) => async (dispatch) => {
  try {
    const url = `http://localhost:2050/pay/check/${pid}`;
    const response = await fetch(url);
    const res = await response.json();

    if (res.status === "ok") {
      dispatch(isPaidAC("ok"));
    } else if (res.status === "fail") {
      dispatch(isPaidAC("fail"));
    }
  } catch (e) {
    console.log(e);
  }
};

export const isPaidAC = (status) => {
  return {
    type: IS_PAID,
    payload: status,
  };
};
