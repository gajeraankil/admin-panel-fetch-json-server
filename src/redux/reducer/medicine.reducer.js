import * as actionTypes from "../actionTypes";

const initState = {
  medicine: [],
  isLoading: false,
  error: "",
};

export const medicinereducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_MEDICINES:
      return {
        ...state,
        medicine: action.payload,
        isLoading: false,
        error: "",
      };
    case actionTypes.ADD_MEDICINES:
      return {
        ...state,
        medicine: state.medicine.concat(action.payload),
        isLoading: false,
        error: "",
      };
    case actionTypes.DELETE_MEDICINES:
      return {
        ...state,
        medicine: state.medicine.filter((m) => m.id !== action.payload),
        isLoading: false,
        error: "",
      };
    case actionTypes.UPDATE_MEDICINES:
      return {
        ...state,
        medicine: state.medicine.filter((m) => {
          if (m.id === action.payload.id) {
            return action.payload;
          } else {
            return m;
          }
        }),
        isLoading: false,
        error: "",
      };
    case actionTypes.LOADING_MEDICINES:
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case actionTypes.ERROR_MEDICINES:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        medicine: [],
      };
    default:
      return state;
  }
};
