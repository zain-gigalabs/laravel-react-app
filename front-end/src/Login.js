import Header from "./Header";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loginError, setLoginError] = useState();
    const history = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            history("/add");
        }

    }, [])

    async function login() {
        let item = {email, password};
        let result = await fetch("http://127.0.0.1:8000/api/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        if (result.redirect == true) {
            localStorage.setItem('user-info', JSON.stringify(result.user));
            history("/add");
        } else {
            history("/login");
            setLoginError(result.error);
        }
    }
    return (
        <div>
            <Header/>
            <div className='col-sm-6 offset-sm-3'>
                <h1>Login Page</h1>
                <span style={{fontWeight: 'bold', color: 'red',}}>{loginError}</span>
                <input type="text" className='form-control' placeholder='Email'
                       onChange={(e) => setEmail(e.target.value)}/>
                <br/><br/>
                <input type="password" className='form-control' placeholder='Password'
                       onChange={(e) => setPassword(e.target.value)}/>
                <br/><br/>
                <button onClick={login} className='btn btn-primary'>Login</button>
            </div>
        </div>
    )
}

export default Login