import React, { useEffect, useState } from 'react';
import Layout from "../components/Layout";
import axios from "axios";
import { IUser } from "../models/User";
import { Button, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Users = () => {
    let navigate = useNavigate();

    const [users, setUsers] = useState<IUser[]>([]);
    const [page, setPage] = useState(0);
    const perPage = 10;

    useEffect(() => {
        (
           async () => {
               const {data} = await axios.get('ambassadors');

               setUsers(data);
           }
        )()
    }, []);

    return (
        <Layout>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell scope="col">#</TableCell>
                        <TableCell scope="col">Name</TableCell>
                        <TableCell scope="col">Email</TableCell>
                        <TableCell scope="col">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {users.slice(page * perPage, (page + 1) * perPage).map((user: IUser) => {
                    return (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.first_name} {user.last_name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Button
                                    variant={"contained"}
                                    color={"primary"}
                                    onClick={() => {
                                        navigate(`/users/${user.id}/links`)
                                    }}
                                >
                                    View
                                </Button>
                            </TableCell>
                        </TableRow>
                    )
                })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            count={users.length}
                            page={page}
                            onPageChange={(e, newPage) => setPage(newPage)}
                            rowsPerPage={perPage}
                            rowsPerPageOptions={[]}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </Layout>
    );
};

export default Users;
