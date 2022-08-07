import * as actionTypes from "../actionTypes";
import { baseURL } from "../../baseURL";

export const getMedicine = () => (dispatch) => {
  try {
    dispatch(loadingMedicine());
    setTimeout(() => {
      fetch(baseURL + "medicines")
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
          dispatch({ type: actionTypes.GET_MEDICINES, payload: data })
        )
        .catch((error) => dispatch(errorMedicines(error.message)));
    }, 2000);
  } catch (error) {
    dispatch(errorMedicines(error.message));
  }
};

export const addMedicine = (data) => (dispatch) => {
  try {
    fetch(baseURL + "medicines", {
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
        dispatch({ type: actionTypes.ADD_MEDICINES, payload: data })
      )
      .catch((error) => dispatch(errorMedicines(error.message)));
  } catch (error) {
    dispatch(errorMedicines(error.message));
  }
};

export const deleteMedicine = (id) => (dispatch) => {
  try {
    fetch(baseURL + "medicines/" + id, {
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
      .then(dispatch({ type: actionTypes.DELETE_MEDICINES, payload: id }))
      .catch((error) => dispatch(errorMedicines(error.message)));
  } catch (error) {
    dispatch(errorMedicines(error.message));
  }
};

export const updateMedicine = (data) => (dispatch) => {
  try {
    fetch(baseURL + "medicines/" + data.id, {
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