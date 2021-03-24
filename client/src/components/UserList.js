import { Button, TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const UserList = (props) => {
  const { name, email, createdAt, updatedAt, _id } = props;
  const history = useHistory();
  return (
    <>
      <TableRow key={_id}>
        <TableCell>{name}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{createdAt}</TableCell>
        <TableCell>{updatedAt}</TableCell>
        <TableCell>
          <Button
            href={`/admin/payments/create/${email}`}
            variant="contained"
            color="primary"
          >
            Create a Payment
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default UserList;
