import React, { SyntheticEvent, useEffect, useState } from 'react';
import Layout from "../../components/Layout";
import { Button, TextField } from "@mui/material";
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
    let navigate = useNavigate();
    let { id } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState(0);

    useEffect(() =>{
        if(id) {
            (
                async () => {
                    const {data} = await axios.get(`products/${id}`);

                    console.log(data);
                    setTitle(data.title);
                    setDescription(data.description);
                    setImage(data.image);
                    setPrice(data.price);
                }
            )()
        }
    }, [])

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const data = {
            title,
            description,
            image,
            price
        };

        if(id) {
            await axios.put(`products/${id}`, data);
        } else {
            await axios.post('products', data);
        }

        navigate('/products');
    }

    return (
        <Layout>
            <form className="mt-3" onSubmit={submit}>
                <div className="mb-3">
                    <TextField
                        label="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        label="Description"
                        value={description}
                        rows={4}
                        multiline
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        label="Image"
                        value={image}
                        onChange={e => setImage(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        label="Price"
                        value={price}
                        type="number"
                        onChange={e => setPrice(Number(e.target.value))}
                    />
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </Layout>
    );
};

export default ProductForm;
