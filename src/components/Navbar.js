import React, { useContext, useState ,useEffect } from 'react'
import icon from '../img/icon.png'
import { Link, useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext';

function Navbar(props) {
    let history = useNavigate();
    const context = useContext(noteContext);
    const { setNotes  ,loadingStatus , setloadingStatus } = context
    const [seraching, setSearching] = useState({ search: "" })
    const logOut = () => {
        localStorage.removeItem('JWTToken')
        history('/signup')
    }

    


    const SearchManeger = async (e) => {
        setloadingStatus(true)
        e.preventDefault();
        setSearching({ ...seraching, [e.target.name]: e.target.value })
        const response = await fetch("http://localhost:5000/api/note/searchNote", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('JWTToken')
            },

            body: JSON.stringify({ noteTitle: seraching.search })

        });
        const json = await response.json();
        console.log(json)
        setNotes(json)
        setloadingStatus(true)
      
        
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-warning ">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img src={icon} alt='icon' style={{ height: "25px", paddingRight: "5px" }}></img>Keep Note</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {!localStorage.getItem('JWTToken') ?
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">

                            <Link className='btn btn-warning btn-sm mx-1 border border-dark' to="/login" role="button">Login</Link>
                            <Link className='btn btn-warning btn-sm mx-1 border border-dark' to="/signup" role="button">Signup</Link>
                        </div>
                        : <div className='collapse navbar-collapse' id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <button className='btn border  btn-sm border-dark mx-2' onClick={props.clickNote} >Add note</button>
                                </li>
                            </ul>
                                <input className='search' type="search" name="search" onChange={SearchManeger} placeholder='Take a note...' id="" />
                            
                            <button className='btn btn-warning btn-sm mx-1 border border-danger text-danger' onClick={logOut} role={'button'}>Log Out</button>
                        </div>
                    }
                </div>
            </nav>
        </>
    )
}

export default Navbar
