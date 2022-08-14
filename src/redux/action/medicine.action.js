import * as actionTypes from "../actionTypes";
import {
  getMedicineData,
  postMedicineData,
  deleteMedicineData,
  putMedicineData,
} from "../../common/axios/medicine.api";

export const getMedicine = () => (dispatch) => {
  try {
    dispatch(loadingMedicine());
    setTimeout(() => {
      getMedicineData()
        .then((data) =>
          dispatch({ type: actionTypes.GET_MEDICINES, payload: data.data })
        )
        .catch((error) => dispatch(errorMedicines(error.message)));
    }, 2000);
  } catch (error) {
    dispatch(errorMedicines(error.message));
  }
};

export const addMedicine = (data) => (dispatch) => {
  try {
    postMedicineData(data)
      .then((data) =>
        dispatch({ type: actionTypes.ADD_MEDICINES, payload: data.data })
      )
      .catch((error) => dispatch(errorMedicines(error.message)));
  } catch (error) {
    dispatch(errorMedicines(error.message));
  }
};

export const deleteMedicine = (id) => (dispatch) => {
  try {
    deleteMedicineData(id)
      .then(dispatch({ type: actionTypes.DELETE_MEDICINES, payload: id }))
      .catch((error) => dispatch(errorMedicines(error.message)));
  } catch (error) {
    dispatch(errorMedicines(error.message));
  }
};

export const updateMedicine = (data) => (dispatch) => {
  try {
    putMedicineData(data)
      .then(dispatch({ type: actionTypes.UPDATE_MEDICINES, payload: data }))
      .catch((error) => dispatch(errorMedicines(error.message)));
  } catch (error) {
    dispatch(errorMedicines(error.message));
  }
};

export const loadingMedicine = () => (dispatch) => {
  dispatch({ type: actionTypes.LOADING_MEDICINES });
};

export const errorMedicines = (data) => (dispatch) => {
  dispatch({ type: actionTypes.ERROR_MEDICINES, payload: data });
};
