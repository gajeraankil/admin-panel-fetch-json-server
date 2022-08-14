import { getRequest, postRequest, deleteRequest, putRequest } from "../request";

export const getPatientData = () => {
  return getRequest("patients");
};

export const postPatientData = (data) => {
  return postRequest("patients", data);
};

export const deletePatientData = (id) => {
  return deleteRequest("patients/", id);
};

export const putPatientData = (data) => {
  return putRequest("patients/", data);
};
