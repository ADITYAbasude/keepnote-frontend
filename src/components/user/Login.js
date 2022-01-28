import React, { useState } from 'react';
import icon from '../../img/icon.png'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [userdate, setdate] = useState({ email: "", password: "" })
    let history = useNavigate()

    const submitebtn = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ email: userdate.email, password: userdate.password })

        });
        const json = await response.json();
        if (response.status === 404) {
            alert("Invalid user")
        } else {
            localStorage.setItem('JWTToken', json.JWTToken)
            history('/')
        }
    }

    const onChange = (e) => {
        setdate({ ...userdate, [e.target.name]: e.target.value })
    }


    return (
        <div>
            <form onSubmit={submitebtn}>
                <div className='container'>
                    <div className='d-flex justify-content-center bg-light mt-5 pt-3 shadow' style={{ borderRadius: "10px" }}>
                        <div className='body-title'>
                            <img style={{ height: "150px" }} src={icon} alt='icon'></img>
                            <h2 className='text-center my-3'>Log in</h2>
                            <div>
                                <input className='form-control outline outline-warning' value={userdate.email} name='email' onChange={onChange} type={'email'} placeholder='Email' required />
                                <br />
                                <input className='form-control' type={'password'} value={userdate.password} name='password' onChange={onChange} required placeholder='Password' />
                                <div className='d-flex justify-content-center'>
                                    <button role={'button'} className='btn btn-warning my-5'>Log In</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
