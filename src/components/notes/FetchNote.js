import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../../context/notes/noteContext';
// import Loading  from '../../img/loader.gif' 
import ShowNote from './ShowNote';


const FetchNote = () => {
    const context = useContext(noteContext);
    const { notes, updatenote, fatchnotefunction ,loadingStatus  } = context;
    let history = useNavigate()
    const [usernotes, setNotes] = useState({ id: "", enoteTitle: "", enoteDescription: "", etag: "defualt" })
    const ref = useRef(null)
    const closeref = useRef(null)
    useEffect(() => {
        if (localStorage.getItem('JWTToken')) {

            fatchnotefunction()
        } else {
            history('/signup')
        }
        // eslint-disable-next-line
    }, [])



    const updateModal = (currentNote) => {
        ref.current.click()
        setNotes({
            id: currentNote._id, enoteTitle: currentNote.noteTitle, enoteDescription: currentNote.noteDiscription,
            etag: currentNote.tag
        })
    }

    const onchangeInUpdatePage = (e) => {
        setNotes({ ...usernotes, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        updatenote(usernotes.id, usernotes.enoteTitle, usernotes.enoteDescription, usernotes.etag)
        closeref.current.click()
    }
    return (
        <div>

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className={`modal-dialog `}>
                    <div className="modal-content border border-warning" style={{ borderRadius: "10px" }}>
                        <div className='modal-header'>
                            <h5 className="modal-title">update note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input className='form-control ' value={usernotes.enoteTitle} onChange={onchangeInUpdatePage} name='enoteTitle' placeholder='Title' type={'text'} />
                            <textarea className='form-control my-2' value={usernotes.enoteDescription} onChange={onchangeInUpdatePage} name='enoteDescription' placeholder='Description' />
                            <button ref={closeref} onClick={handleClick} data-bs-dismiss="modal" className='btn btn-warning float-end'>update</button>
                        </div>

                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='container'>
                    {notes.length === 0 && 'No notes to display'}
                    {/* {loadingStatus && <Loading /> } */}
                    {/* <Loading /> */}
                </div>
                {notes.map((note) => {
                    const noteId = note._id;
                    return <div className='col-md-4'>
                        <ShowNote key={noteId} updateModal={updateModal} note={note} />
                    </div>
                })
                }
            </div>
        </div>
    )
}

export default FetchNote;
