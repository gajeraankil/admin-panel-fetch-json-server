import * as actionTypes from "../actionTypes";

const initState = {
  patient: [],
  isLoading: false,
  error: "",
};

export const patientreducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_PATIENTS:
      return {
        ...state,
        patient: action.payload,
        isLoading: false,
        error: "",
      };
    case actionTypes.ADD_PATIENTS:
      return {
        ...state,
        patient: state.patient.concat(action.payload),
        isLoading: false,
        error: "",
      };
    case actionTypes.DELETE_PATIENTS:
      return {
        ...state,
        patient: state.patient.filter((m) => m.id !== action.payload),
        isLoading: false,
        error: "",
      };
    case actionTypes.UPDATE_PATIENTS:
      return {
        ...state,
        patient: state.patient.filter((m) => {
          if (m.id === action.payload.id) {
            return action.payload;
          } else {
            return m;
          }
        }),
        isLoading: false,
        error: "",
      };
    case actionTypes.LOADING_PATIENTS:
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case actionTypes.ERROR_PATIENTS:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        patient: [],
      };
    default:
      return state;
  }
};
