import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import Layout from "../components/Layout";
import { ILink } from "../models/Link";
import axios from "axios";
import { useParams } from "react-router-dom";

const Links = (props: any) => {

    let { id } = useParams();

    const [links, setLinks] = useState<ILink[]>([]);
    const [page, setPage] = useState(0);
    const perPage = 10;

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`users/${id}/links`);

                setLinks(data);
            }
        )()
    }, []);

    return (
        <Layout>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell scope="col">#</TableCell>
                        <TableCell scope="col">Code</TableCell>
                        <TableCell scope="col">Count</TableCell>
                        <TableCell scope="col">Revenue</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {links.slice(page * perPage, (page + 1) * perPage).map((link: ILink) => {
                        return (
                            <TableRow key={link.id}>
                                <TableCell>{link.id}</TableCell>
                                <TableCell>{link.code}</TableCell>
                                <TableCell>{link.orders.length}</TableCell>
                                <TableCell>{link.orders.reduce((s, o) => s + o.total, 0)}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            count={links.length}
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

export default Links;
