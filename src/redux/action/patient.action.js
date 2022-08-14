import * as actionTypes from "../actionTypes";
import {
  getPatientData,
  postPatientData,
  deletePatientData,
  putPatientData,
} from "../../common/axios/patient.api";

export const getPatient = () => (dispatch) => {
  try {
    dispatch(loadingPatients());
    setTimeout(() => {
      getPatientData()
        .then((data) =>
          dispatch({ type: actionTypes.GET_PATIENTS, payload: data.data })
        )
        .catch((error) => dispatch(errorPatients(error.message)));
    }, 2000);
  } catch (error) {
    dispatch(errorPatients(error.message));
  }
};

export const addPatient = (data) => (dispatch) => {
  try {
    postPatientData(data)
      .then((data) =>
        dispatch({ type: actionTypes.ADD_PATIENTS, payload: data.data })
      )
      .catch((error) => dispatch(errorPatients(error.message)));
  } catch (error) {
    dispatch(errorPatients(error.message));
  }
};

export const deletePatient = (id) => (dispatch) => {
  try {
    deletePatientData(id)
      .then(dispatch({ type: actionTypes.DELETE_PATIENTS, payload: id }))
      .catch((error) => dispatch(errorPatients(error.message)));
  } catch (error) {
    dispatch(errorPatients(error.message));
  }
};

export const updatePatient = (data) => (dispatch) => {
  try {
    putPatientData(data)
      .then(dispatch({ type: actionTypes.UPDATE_PATIENTS, payload: data }))
      .catch((error) => dispatch(errorPatients(error.message)));
  } catch (error) {
    dispatch(errorPatients(error.message));
  }
};

export const loadingPatients = () => (dispatch) => {
  dispatch({ type: actionTypes.LOADING_PATIENTS });
};

export const errorPatients = (data) => (dispatch) => {
  dispatch({ type: actionTypes.ERROR_PATIENTS, payload: data });
};
