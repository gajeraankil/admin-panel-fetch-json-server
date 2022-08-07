import { combineReducers } from "redux";
import { doctorreducer } from "./doctor.reducer";
import { medicinereducer } from "./medicine.reducer";
import { patientreducer } from "./patient.reducer";

export const rootReducer = combineReducers({
  medicine: medicinereducer,
  patient: patientreducer,
  doctor: doctorreducer
});
