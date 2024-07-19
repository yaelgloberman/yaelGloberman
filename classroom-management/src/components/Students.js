import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import DialogClass from "./DialogClass";
const fetchUsers = async () => {
  // const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const res = await fetch("http://localhost:8000/students");
  return res.json();
};

const deleteStudent = (student) => {
  console.log(student.id);
};

const Students = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { data, status } = useQuery("users", fetchUsers);

  return (
    <Box>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 10 }}
      >
        {status === "error" && <p>Error fetching data</p>}
        {status === "loading" && <p>Fetching data...</p>}
        {status === "success" && (
          <div>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">First Name</TableCell>
                    <TableCell align="center">Last Name</TableCell>
                    <TableCell align="center">Age</TableCell>
                    <TableCell align="center">Proffesion</TableCell>
                    <TableCell align="center">Assign</TableCell>
                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((student) => (
                    <TableRow
                      key={student.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{student.id}</TableCell>
                      <TableCell align="center">{student.name}</TableCell>
                      <TableCell align="center">{student.name}</TableCell>
                      <TableCell align="center">{student.name}</TableCell>
                      <TableCell align="center">{student.name}</TableCell>
                      <TableCell align="center">
                        <Button variant="outlined" onClick={handleOpen}>
                          Assign to class
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          onClick={() => {
                            deleteStudent(student);
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </Grid>
    
    <DialogClass  data={data} open={open} handleOpen={handleOpen} handleClose={handleClose}  />
   
    </Box>
  );
};

export default Students;
