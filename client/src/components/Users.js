import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../actions/userActions";
import Title from "./Title";
import UserList from "./UserList";

const Users = () => {
  const userList = useSelector((state) => state.userList);
  const { loading, success, users } = userList;
  const dispatch = useDispatch();
  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = () => {
    dispatch(listUsers());
  };
  return (
    <div style={{ padding: "20px" }}>
      <Title>Users</Title>

      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {success ? users.map((user) => <UserList {...user} />) : "Loading"}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;
