import Header from "./Header";
import {useParams, withRouter,useNavigate,useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

function UpdateProduct(props) {
    const location = useLocation();
    console.warn(location);
    const history = useNavigate();
    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDesc] = useState("");
    const {id} = useParams();
    const [data, setData] = useState([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        let result = await fetch("http://127.0.0.1:8000/api/getProduct/" + id);
        result = await result.json();
        setData(result.product);
        setName(result.product.name);
        setPrice(result.product.price);
        setDesc(result.product.description);
        setFile(result.product.file_path);
    }, [])

    async function editProduct(id) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        let result = await fetch("http://127.0.0.1:8000/api/updateProduct/"+id, {
            method: 'POST',
            body: formData
        });
        alert("Product updated successfully");
        history('/');
    }

    return (
        <div>
            <Header/>
            <div className="col-sm-6 offset-sm-3">
                <br/>
                <h1>Update Product</h1>
                <input type="text" className="form-control" defaultValue={data.name}
                       onChange={(e) => setName(e.target.value)}/><br/>
                <input type="text" className="form-control" defaultValue={data.price}
                       onChange={(e) => setPrice(e.target.value)}/><br/>
                <input type="text" className="form-control" defaultValue={data.description}
                       onChange={(e) => setDesc(e.target.value)}/><br/>
                <input type="file" className="form-control" defaultValue={data.file_path}
                       onChange={(e) => setFile(e.target.files[0])}/><br/>
                <img src={"http://localhost:8000/storage/" + data.file_path} style={{width: 150}}/><br/><br/>
                <button onClick={() => editProduct(data.id)} className="btn btn-success">Update</button>
            </div>
        </div>
    )
}

export default UpdateProduct