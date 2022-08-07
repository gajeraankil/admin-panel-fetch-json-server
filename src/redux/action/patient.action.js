import * as actionTypes from "../actionTypes";
import { baseURL } from "../../baseURL";

export const getPatient = () => (dispatch) => {
  try {
    dispatch(loadingPatient());
    setTimeout(() => {
      fetch(baseURL + "patients")
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
          dispatch({ type: actionTypes.GET_PATIENTS, payload: data })
        )
        .catch((error) => dispatch(errorPatients(error.message)));
    }, 2000);
  } catch (error) {
    dispatch(errorPatients(error.message));
  }
};

export const addPatient = (data) => (dispatch) => {
  try {
    fetch(baseURL + "patients", {
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
        dispatch({ type: actionTypes.ADD_PATIENTS, payload: data })
      )
      .catch((error) => dispatch(errorPatients(error.message)));
  } catch (error) {
    dispatch(errorPatients(error.message));
  }
};

export const deletePatient = (id) => (dispatch) => {
  try {
    fetch(baseURL + "patients/" + id, {
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
      .then(dispatch({ type: actionTypes.DELETE_PATIENTS, payload: id }))
      .catch((error) => dispatch(errorPatients(error.message)));
  } catch (error) {
    dispatch(errorPatients(error.message));
  }
};

export const updatePatient = (data) => (dispatch) => {
  try {
    fetch(baseURL + "patients/" + data.id, {
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
      .then(dispatch({ type: actionTypes.UPDATE_PATIENTS, payload: data }))
      .catch((error) => dispatch(errorPatients(error.message)));
  } catch (error) {
    dispatch(errorPatients(error.message));
  }
};

export const loadingPatient = () => (dispatch) => {
  dispatch({ type: actionTypes.LOADING_PATIENTS });
};

export const errorPatients = (data) => (dispatch) => {
  dispatch({ type: actionTypes.ERROR_PATIENTS, payload: data });
};
