import { FORM_SET_PARAMS, ADD_PID_TO_STATE, IS_PAID } from "../types";

export default function payFormReducer(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case FORM_SET_PARAMS: {
      return {
        ...state,
        curFormData: payload,
      };
    }
    case ADD_PID_TO_STATE: {
      return { ...state, pid: payload };
    }
    case IS_PAID: {
      return { ...state, isPayed: payload };
    }
    default: {
      return state;
    }
  }
}
