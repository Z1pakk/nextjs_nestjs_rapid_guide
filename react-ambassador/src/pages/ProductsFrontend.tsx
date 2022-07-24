import React, { useEffect, useState } from 'react';
import Layout from "../components/Layout";
import Products from "./Products";
import { IProduct } from "../models/Product";
import axios from "axios";
import { IFilters } from "../models/Filters";

const ProductsFrontend = () => {
    const [allProducts, setAllProducts] = useState<IProduct[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
    const [filters, setFilters] = useState<IFilters>({
        s: '',
        sort: '',
        page: 1
    })
    const [lastPage, setLastPage] = useState(1);

    const perPage = 9;

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('products/frontend');

                setAllProducts(data);
                setFilteredProducts(data);
                setLastPage(Math.ceil(data.length / perPage))
            }
        )()
    }, [])

    useEffect(() => {
        let products = allProducts.filter(p => p.title.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0 ||
            p.description.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0
        )

        if (filters.sort === 'asc') {
            products.sort((a, b) => a.price - b.price)
        }

        if (filters.sort === 'desc') {
            products.sort((a, b) => b.price - a.price)
        }


        setFilteredProducts(products.slice(0, filters.page * perPage));
        setLastPage(Math.ceil(products.length / perPage))

    }, [filters])

    return (
        <Layout>
            <Products
                products={filteredProducts}
                filters={filters}
                lastPage={lastPage}
                setFilters={setFilters}
            />
        </Layout>
    );
};

export default ProductsFrontend;
