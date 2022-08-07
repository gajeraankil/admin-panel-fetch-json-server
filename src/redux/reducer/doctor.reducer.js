import * as actionTypes from "../actionTypes";

const initState = {
  doctor: [],
  isLoading: false,
  error: "",
};

export const doctorreducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_DOCTORS:
      return {
        ...state,
        doctor: action.payload,
        isLoading: false,
        error: "",
      };
    case actionTypes.ADD_DOCTORS:
      return {
        ...state,
        doctor: state.doctor.concat(action.payload),
        isLoading: false,
        error: "",
      };
    case actionTypes.DELETE_DOCTORS:
      return {
        ...state,
        doctor: state.doctor.filter((m) => m.id !== action.payload),
        isLoading: false,
        error: "",
      };
    case actionTypes.UPDATE_DOCTORS:
      return {
        ...state,
        doctor: state.doctordoctor.filter((m) => {
          if (m.id === action.payload.id) {
            return action.payload;
          } else {
            return m;
          }
        }),
        isLoading: false,
        error: "",
      };
    case actionTypes.LOADING_DOCTORS:
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case actionTypes.ERROR_DOCTORS:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        doctor: [],
      };
    default:
      return state;
  }
};
