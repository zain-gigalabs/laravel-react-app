import Header from "./Header";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function AddProduct() {
    const history = useNavigate();
    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDesc] = useState("");

    async function addProduct() {
        const formData = new FormData();
        formData.append("file" , file);
        formData.append("name" , name);
        formData.append("price" , price);
        formData.append("description" , description);
        let result = await fetch("http://127.0.0.1:8000/api/addProduct", {
            method: 'POST',
            body: formData
        });
        alert("Product added successfully");
        history('/');
    }

    return (
        <div>
            <Header/>
            <div className="col-sm-6 offset-sm-3">
                <br/>
                <h1>Add Product</h1>
                <input type="text" className="form-control"
                       onChange={(e) => setName(e.target.value)}
                       placeholder="Name"/>
                <br/>
                <input type="file" className="form-control"
                       onChange={(e) => setFile(e.target.files[0])}
                       placeholder="File"/>
                <br/>
                <input type="text" className="form-control"
                       onChange={(e) => setPrice(e.target.value)}
                       placeholder="Price"/>
                <br/>
                <input type="text" className="form-control"
                       onChange={(e) => setDesc(e.target.value)}
                       placeholder="Description"/>
                <br/>
                <button className="btn btn-primary" onClick={addProduct}>Add Product</button>
            </div>
        </div>
    )
}

export default AddProduct