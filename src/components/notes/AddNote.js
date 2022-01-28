import React, { useContext, useState } from 'react'
import NoteContext from '../../context/notes/noteContext';


const AddNote = () => {
    const context = useContext(NoteContext)
    const { addnote } = context
    const [notes, setNotes] = useState({ noteTitle: "", noteDescription: "", tag: "defualt" })

    const makeChange = (e) => {
        setNotes({ ...notes, [e.target.name]: e.target.value })
    }

    const submitEvent = (e) => {
        e.preventDefault()
        addnote(notes.noteTitle, notes.noteDescription, notes.tag)
        console.log('submite btn is working')
    }


    return (

        <div className='container'>

            <h2 className='title'>Add Note</h2>
            <input className='form-control my-5' placeholder='Title' name='noteTitle' onChange={makeChange} style={{ width: "100%" }} type={'text'} row={2} />

            <textarea className='form-control' placeholder='Description' name='noteDescription' onChange={makeChange} style={{ width: "100%", height: "50vh" }} />
            <button className='btn btn-warning float-end my-2 mx-1' onClick={submitEvent} >keep note</button>
        </div>
    )
}

export default AddNote
