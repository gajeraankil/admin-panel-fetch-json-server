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
  getDoctor,
  addDoctor,
  deleteDoctor,
  updateDoctor,
} from "../redux/action/doctor.action";

const Doctors = () => {
  const [open, setOpen] = useState(false);
  const [dOpen, setDOpen] = useState(false);
  const [did, setDid] = useState("");
  const [update, setUpdate] = useState(false);

  const dispatch = useDispatch();
  const me = useSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(getDoctor());
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
    dispatch(addDoctor(data));
    handleClose();
  };

  const handleDelete = () => {
    dispatch(deleteDoctor(did));
    handleClose();
  };

  const handleEdit = (params) => {
    handleClickOpen();
    setValues(params.row);
    setUpdate(true);
  };

  const handleUpdate = (values) => {
    dispatch(updateDoctor(values));
    dispatch(getDoctor());
    handleClose();
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 275,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Doctor Name",
      width: 275,
      headerAlign: "center",
    },
    {
      field: "departments",
      headerName: "Department",
      width: 275,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Action",
      width: 275,
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
    departments: yup.string().required("Please Select Department"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      departments: "",
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
          Add Doctors
        </Button>
        {me.isLoading ? (
          <p>Loading...</p>
        ) : (
          <Box sx={{ height: 579 }}>
            <DataGrid
              rows={me.doctor}
              columns={columns}
              pageSize={9}
              rowsPerPageOptions={[9]}
              checkboxSelection
            />
          </Box>
        )}
        <Dialog open={open} onClose={handleClose} fullWidth>
          {update ? (
            <DialogTitle>Update Doctors</DialogTitle>
          ) : (
            <DialogTitle>Add Doctors</DialogTitle>
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
                <FormControl
                  error={errors.departments && touched.departments}
                  margin="dense"
                  fullWidth
                >
                  <InputLabel id="departments">
                    {errors.departments && touched.departments
                      ? "Please Select Department"
                      : "Department"}
                  </InputLabel>
                  <Select
                    labelId="departments"
                    onChange={handleChange}
                    value={values.departments}
                    onBlur={handleBlur}
                    id="departments"
                    name="departments"
                    label={
                      errors.departments && touched.departments
                        ? errors.departments
                        : "Departments"
                    }
                  >
                    <MenuItem value="Cardiology">Cardiology</MenuItem>
                    <MenuItem value="Neurology">Neurology</MenuItem>
                    <MenuItem value="Hepatology">Hepatology</MenuItem>
                    <MenuItem value="Pediatrics">Pediatrics</MenuItem>
                    <MenuItem value="Eye-Care">Eye Care</MenuItem>
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

export default Doctors;
