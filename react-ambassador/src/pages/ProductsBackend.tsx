import React, { useEffect, useState } from 'react';
import Layout from "../components/Layout";
import Products from "./Products";
import axios from "axios";
import { IProduct } from "../models/Product";
import { IFilters } from "../models/Filters";

const ProductsBackend = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [filters, setFilters] = useState<IFilters>({
        s: '',
        sort: '',
        page: 1
    })
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        (
            async () => {
                const arr = [];

                if (filters.s) {
                    arr.push(`s=${filters.s}`)
                }

                if (filters.sort) {
                    arr.push(`sort=${filters.sort}`)
                }

                if (filters.page) {
                    arr.push(`page=${filters.page}`)
                }

                const {data} = await axios.get(`products/backend?${arr.join('&')}`);

                setProducts(filters.page === 1 ? data.data : [...products, ...data.data]);
                setLastPage(data.last_page)
            }
        )()
    }, [filters])

    return (
        <Layout>
            <Products
                products={products}
                filters={filters}
                lastPage={lastPage}
                setFilters={setFilters}
            />
        </Layout>
    );
};

export default ProductsBackend;
