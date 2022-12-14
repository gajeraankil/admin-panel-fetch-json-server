import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import { Formik, Form, useFormik } from "formik";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  getPatient,
  addPatient,
  deletePatient,
  updatePatient,
} from "../redux/action/patient.action";

const Patients = () => {
  const [open, setOpen] = useState(false);
  const [dOpen, setDOpen] = useState(false);
  const [did, setDid] = useState("");
  const [update, setUpdate] = useState(false);

  const dispatch = useDispatch();
  const me = useSelector((state) => state.patient);

  useEffect(() => {
    dispatch(getPatient());
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickDOpen = () => {
    setDOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDOpen(false);
    resetForm();
    setUpdate(false);
  };

  const handleInsert = (values) => {
    let data = { id: new Date().getTime().toString(), ...values };
    dispatch(addPatient(data));
    handleClose();
  };

  const handleDelete = () => {
    dispatch(deletePatient(did));
    handleClose();
  };

  const handleEdit = (params) => {
    handleClickOpen();
    setValues(params.row);
    setUpdate(true);
  };

  const handleUpdate = (values) => {
    dispatch(updatePatient(values));
    dispatch(getPatient());
    handleClose();
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: "137",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Patient Name",
      width: "137",
      headerAlign: "center",
    },
    {
      field: "age",
      headerName: "Age",
      width: "137",
      headerAlign: "center",
      align: "right",
    },
    {
      field: "phone",
      headerName: "Phone",
      width: "137",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "date",
      headerName: "Date Check In",
      width: "137",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "department",
      headerName: "Department",
      width: "137",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "doctor",
      headerName: "Doctor Assgined",
      width: "137",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: "137",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "room",
      headerName: "Room No",
      width: "137",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Action",
      width: "137",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Stack direction="row" spacing={3}>
          <IconButton
            aria-label="edit"
            onClick={() => {
              handleEdit(params);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => {
              handleClickDOpen();
              setDid(params.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  let schema = yup.object().shape({
    name: yup.string().required("Please Enter Name"),
    age: yup
      .number()
      .required("Please Enter Age")
      .positive("Age must be positive")
      .integer("Age must be integer")
      .typeError("Age must be number"),
    phone: yup
      .string()
      .required("Please Enter Phone Number")
      .matches(/^[1-9]\d{9}$/, "Phone Number must be 10 Digits"),
    date: yup.date().required("Please Select Date & Time"),
    department: yup.string().required("Pllease Enter Department"),
    doctor: yup.string().required("Please Select Doctor"),
    status: yup.string().required("Please Select Status"),
    room: yup.string().required("Please Select Room No"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      phone: "",
      date: "",
      department: "",
      doctor: "",
      status: "",
      room: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (update) {
        handleUpdate(values);
      } else {
        handleInsert(values);
      }
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    resetForm,
    setValues,
  } = formik;

  return (
    <>
      <Container maxWidth="lg">
        <Button
          sx={{ mb: 3 }}
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add Patient
        </Button>

        {me.isLoading ? (
          <p>Loading...</p>
        ) : (
          <Box sx={{ height: 579 }}>
            <DataGrid
              rows={me.patient}
              columns={columns}
              pageSize={9}
              rowsPerPageOptions={[9]}
              checkboxSelection
            />
          </Box>
        )}
        <Dialog open={open} onClose={handleClose} fullWidth>
          {update ? (
            <DialogTitle>Update Patient</DialogTitle>
          ) : (
            <DialogTitle>Add Patient</DialogTitle>
          )}
          <Formik values={formik}>
            <Form onSubmit={handleSubmit}>
              <DialogContent>
                <TextField
                  error={errors.name && touched.name}
                  margin="dense"
                  id="name"
                  label={errors.name && touched.name ? errors.name : "Name"}
                  onChange={handleChange}
                  value={values.name}
                  onBlur={handleBlur}
                  name="name"
                  fullWidth
                />
                <TextField
                  error={errors.age && touched.age}
                  margin="dense"
                  id="age"
                  label={errors.age && touched.age ? errors.age : "Age"}
                  onChange={handleChange}
                  value={values.age}
                  onBlur={handleBlur}
                  name="age"
                  fullWidth
                />
                <TextField
                  error={errors.phone && touched.phone}
                  margin="dense"
                  id="phone"
                  label={errors.phone && touched.phone ? errors.phone : "Phone"}
                  onChange={handleChange}
                  value={values.phone}
                  onBlur={handleBlur}
                  name="phone"
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="date"
                  onChange={handleChange}
                  value={values.date}
                  onBlur={handleBlur}
                  name="date"
                  fullWidth
                  type="datetime-local"
                />
                {errors.date && touched.date ? (
                  <Box sx={{ color: "#d32f2f" }}>{errors.date}</Box>
                ) : null}
                <FormControl
                  error={errors.department && touched.department}
                  margin="dense"
                  fullWidth
                >
                  <InputLabel id="department">
                    {errors.department && touched.department
                      ? "Please Select Department"
                      : "Department"}
                  </InputLabel>
                  <Select
                    labelId="department"
                    onChange={handleChange}
                    value={values.department}
                    onBlur={handleBlur}
                    id="department"
                    name="department"
                    label={
                      errors.department && touched.department
                        ? errors.department
                        : "Department"
                    }
                  >
                    <MenuItem value={"Department 1"}>Department 1</MenuItem>
                    <MenuItem value={"Department 2"}>Department 2</MenuItem>
                    <MenuItem value={"Department 3"}>Department 3</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  error={errors.doctor && touched.doctor}
                  margin="dense"
                  fullWidth
                >
                  <InputLabel id="doctor">
                    {errors.doctor && touched.doctor
                      ? "Please Select Doctor"
                      : "Doctor"}
                  </InputLabel>
                  <Select
                    labelId="doctor"
                    onChange={handleChange}
                    value={values.doctor}
                    onBlur={handleBlur}
                    id="doctor"
                    name="doctor"
                    label={
                      errors.doctor && touched.doctor ? errors.doctor : "Doctor"
                    }
                  >
                    <MenuItem value={"Doctor 1"}>Doctor 1</MenuItem>
                    <MenuItem value={"Doctor 2"}>Doctor 2</MenuItem>
                    <MenuItem value={"Doctor 3"}>Doctor 3</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  error={errors.status && touched.status}
                  margin="dense"
                  fullWidth
                >
                  <InputLabel id="status">
                    {errors.status && touched.status
                      ? "Please Select Status"
                      : "Status"}
                  </InputLabel>
                  <Select
                    labelId="status"
                    onChange={handleChange}
                    value={values.status}
                    onBlur={handleBlur}
                    id="status"
                    name="status"
                    label={
                      errors.status && touched.status ? errors.status : "Status"
                    }
                  >
                    <MenuItem value={"New Patient"}>New Patient</MenuItem>
                    <MenuItem value={"In Treatment"}>In Treatment</MenuItem>
                    <MenuItem value={"Recovered"}>Recovered</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  error={errors.room && touched.room}
                  margin="dense"
                  fullWidth
                >
                  <InputLabel id="room">
                    {errors.room && touched.room
                      ? "Please Select Room"
                      : "Room"}
                  </InputLabel>
                  <Select
                    labelId="room"
                    onChange={handleChange}
                    value={values.room}
                    onBlur={handleBlur}
                    id="room"
                    name="room"
                    label={errors.room && touched.room ? errors.room : "Room"}
                  >
                    <MenuItem value={"FF-103"}>FF-103</MenuItem>
                    <MenuItem value={"FF-105"}>FF-105</MenuItem>
                    <MenuItem value={"FF-112"}>FF-112</MenuItem>
                    <MenuItem value={"FF-124"}>FF-124</MenuItem>
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                {update ? (
                  <Button type="submit">Update</Button>
                ) : (
                  <Button type="submit">Submit</Button>
                )}
              </DialogActions>
            </Form>
          </Formik>
        </Dialog>
        <Dialog
          open={dOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            "Are you sure to Delete?"
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleDelete} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default Patients;
