import * as actionTypes from "../actionTypes";
import {
  getDoctorData,
  postDoctorData,
  deleteDoctorData,
  putDoctorData,
} from "../../common/axios/doctor.api";

export const getDoctor = () => (dispatch) => {
  try {
    dispatch(loadingDoctors());
    setTimeout(() => {
      getDoctorData()
        .then((data) =>
          dispatch({ type: actionTypes.GET_DOCTORS, payload: data.data })
        )
        .catch((error) => dispatch(errorDoctors(error.message)));
    }, 2000);
  } catch (error) {
    dispatch(errorDoctors(error.message));
  }
};

export const addDoctor = (data) => (dispatch) => {
  try {
    postDoctorData(data)
      .then((data) =>
        dispatch({ type: actionTypes.ADD_DOCTORS, payload: data.data })
      )
      .catch((error) => dispatch(errorDoctors(error.message)));
  } catch (error) {
    dispatch(errorDoctors(error.message));
  }
};

export const deleteDoctor = (id) => (dispatch) => {
  try {
    deleteDoctorData(id)
      .then(dispatch({ type: actionTypes.DELETE_DOCTORS, payload: id }))
      .catch((error) => dispatch(errorDoctors(error.message)));
  } catch (error) {
    dispatch(errorDoctors(error.message));
  }
};

export const updateDoctor = (data) => (dispatch) => {
  try {
    putDoctorData(data)
      .then(dispatch({ type: actionTypes.UPDATE_DOCTORS, payload: data }))
      .catch((error) => dispatch(errorDoctors(error.message)));
  } catch (error) {
    dispatch(errorDoctors(error.message));
  }
};

export const loadingDoctors = () => (dispatch) => {
  dispatch({ type: actionTypes.LOADING_DOCTORS });
};

export const errorDoctors = (data) => (dispatch) => {
  dispatch({ type: actionTypes.ERROR_DOCTORS, payload: data });
};
