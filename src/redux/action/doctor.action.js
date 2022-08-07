import * as actionTypes from "../actionTypes";
import { baseURL } from "../../baseURL";

export const getDoctor = () => (dispatch) => {
  try {
    dispatch(loadingDoctor());
    setTimeout(() => {
      fetch(baseURL + "doctors")
        .then(
          (response) => {
            if (response.ok) {
              return response;
            } else {
              var error = new Error(
                "Error " + response.status + ": " + response.statusText
              );
              error.response = response;
              throw error;
            }
          },
          (error) => {
            var errmess = new Error(error.message);
            throw errmess;
          }
        )
        .then((response) => response.json())
        .then((data) =>
          dispatch({ type: actionTypes.GET_DOCTORS, payload: data })
        )
        .catch((error) => dispatch(errorDoctors(error.message)));
    }, 2000);
  } catch (error) {
    dispatch(errorDoctors(error.message));
  }
};

export const addDoctor = (data) => (dispatch) => {
  try {
    fetch(baseURL + "doctors", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "OOPS ! Something Went Wrong : Error " +
                response.status +
                " " +
                response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          var errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: actionTypes.ADD_DOCTORS, payload: data })
      )
      .catch((error) => dispatch(errorDoctors(error.message)));
  } catch (error) {
    dispatch(errorDoctors(error.message));
  }
};

export const deleteDoctor = (id) => (dispatch) => {
  try {
    fetch(baseURL + "doctors/" + id, {
      method: "DELETE",
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "OOPS ! Something Went Wrong : Error " +
                response.status +
                " " +
                response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          var errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then((response) => response.json())
      .then(dispatch({ type: actionTypes.DELETE_DOCTORS, payload: id }))
      .catch((error) => dispatch(errorDoctors(error.message)));
  } catch (error) {
    dispatch(errorDoctors(error.message));
  }
};

export const updateDoctor = (data) => (dispatch) => {
  try {
    fetch(baseURL + "doctors/" + data.id, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "OOPS ! Something Went Wrong : Error " +
                response.status +
                " " +
                response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          var errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then((response) => response.json())
      .then(dispatch({ type: actionTypes.UPDATE_DOCTORS, payload: data }))
      .catch((error) => dispatch(errorDoctors(error.message)));
  } catch (error) {
    dispatch(errorDoctors(error.message));
  }
};

export const loadingDoctor = () => (dispatch) => {
  dispatch({ type: actionTypes.LOADING_DOCTORS });
};

export const errorDoctors = (data) => (dispatch) => {
  dispatch({ type: actionTypes.ERROR_DOCTORS, payload: data });
};