import Header from "./Header";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Table} from "react-bootstrap";

function SearchProduct() {
    const [data,setData] = useState([]);
    async function search(key) {
        let result = await fetch("http://127.0.0.1:8000/api/search/" + key);
        result = await result.json();
        setData(result);
    }
    return (
        <div>
            <Header/>
            <div className="col-sm-6 offset-sm-3">
                <h1>Search Product</h1>
                <input type="text" onChange={(e)=>search(e.target.value)} className="form-control" placeholder="Search Product"/>
                {
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((item) =>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td><img style={{width: 150}} src={"http://localhost:8000/storage/" + item.file_path}
                                             alt=""/></td>
                                    <td>{item.description}</td>
                                    <td>${item.price}</td>
                                </tr>)
                        }
                        </tbody>
                    </Table>
                }
            </div>
        </div>
    )
}

export default SearchProduct;