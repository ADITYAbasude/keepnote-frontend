import React, { useState } from 'react';
import icon from '../../img/icon.png'
import { Link, useNavigate } from 'react-router-dom'
const Signup = () => {


  const [userdate, setdate] = useState({ name: "", email: "", password: "" })
  let history = useNavigate()

  const submitebtn = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/singup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ name: userdate.name, email: userdate.email, password: userdate.password })

    });
    const json = await response.json();
    if (response.status === 404) {
      alert("Invalid user")
    } else {
      localStorage.setItem('JWTToken', json.JWTToken)
      history('/')
      console.log(json)
    }
  }

  const onChange = (e) => {
    setdate({ ...userdate, [e.target.name]: e.target.value })
  }


  return <div>
    <div className='container'>
      <form onSubmit={submitebtn}>

        <div className='d-flex justify-content-center bg-light mt-5 pt-3 shadow' style={{ borderRadius: "10px" }}>
          <div className='body-title'>
            <img style={{ height: "150px" }} src={icon} alt='icon'></img>
            <h2 className='text-center my-3'>Sign Up</h2>
            <div>
              <input className='form-control outline outline-warning' name='name'
                value={userdate.name} onChange={onChange} type={'text'} required="enter your name"
                placeholder='Username' />

              <br />
              <input className='form-control outline outline-warning' name='email'
                value={userdate.email} onChange={onChange} type={'email'} required placeholder='Email' />

              <br />
              <input className='form-control' type={'password'} name='password'
                value={userdate.password} onChange={onChange} required placeholder='Password' />

              < br />
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
              <p>If you have a already account then <Link to='/login'>LogIn</Link></p>
              <div className='d-flex justify-content-center'>
                <button className='btn btn-warning my-5'>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div >;
};

export default Signup;
