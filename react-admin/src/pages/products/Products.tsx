import React, { useEffect, useState } from 'react';
import { IProduct } from "../../models/Product";
import axios from "axios";
import Layout from "../../components/Layout";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Products = () => {
    let navigate = useNavigate();

    const [products, setProducts] = useState<IProduct[]>([]);
    const [page, setPage] = useState(0);
    const perPage = 10;


    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('products');

                setProducts(data);
            }
        )()
    }, [])

    const del = async (id: number) => {
        if(window.confirm('Are you sure?')) {
            await axios.delete(`products/${id}`);

            setProducts(products.filter(p => p.id !== id));
        }
    }

    const edit = (id: number) => {
        navigate(`/products/${id}/edit`)
    }

    return (
        <Layout>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Button
                    onClick={() => navigate('/products/create')}
                    variant="contained"
                    color="primary"
                >
                    Add
                </Button>

            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell scope="col">#</TableCell>
                        <TableCell scope="col">Image</TableCell>
                        <TableCell scope="col">Title</TableCell>
                        <TableCell scope="col">Description</TableCell>
                        <TableCell scope="col">Price</TableCell>
                        <TableCell scope="col">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.slice(page * perPage, (page + 1) * perPage).map(product => {
                        return (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell><img src={product.image} width={50} /></TableCell>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>
                                    <IconButton
                                        color={"primary"}
                                        onClick={() => {
                                            edit(product.id)
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color={"error"}
                                        onClick={() => {
                                            del(product.id)
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            count={products.length}
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

export default Products;
