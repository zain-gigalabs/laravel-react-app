import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Header from "./Header";

function Register() {
    const history = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            history("/add");
        }
    }, [])
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState('')

    const handleValidEmail = val => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (val.length === 0) {
            setEmailError('email address must be enter');
        } else if (reg.test(val) === false) {
            setEmailError('enter valid email address');
        } else if (reg.test(val) === true) {
            setEmailError('');
        }
    };

    async function signUp() {
        let item = {name, password, email};
        let result = await fetch("http://127.0.0.1:8000/api/register", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        })
        result = await result.json();
        console.warn(result);
        localStorage.setItem("user-info", JSON.stringify(result));
        history("/add");
    }

    return (
        <>
            <Header/>
            <div className="col-sm-6 offset-sm-3">
                <h1>Registration</h1>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control"
                       placeholder="Name"/>
                <br/>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}
                       className="form-control"
                       placeholder="Password"/>
                <br/>
                <input type="text" value={email} onChange={(e) => {
                    setEmail(e.target.value);
                    handleValidEmail(e.target.value)
                }} className="form-control"
                       placeholder="Email"/>
                <span style={{fontWeight: 'bold', color: 'red',}}>{emailError}</span>
                <br/>
                <button onClick={signUp} className="btn btn-primary">Sign Up</button>
            </div>
        </>
    )
}

export default Register