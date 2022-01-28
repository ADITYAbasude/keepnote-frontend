import NoteContext from "./noteContext";
import React, { useState } from 'react'

const NoteState = (props) => {
    const host = 'http://localhost:5000'
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)

    const [loadingStatus , setloadingStatus ] = useState(false)

    // fatching all notes in a array
    const fatchnotefunction = async () => {

        const response = await fetch(`${host}/api/note/fetchnote`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('JWTToken')

            },
        });
        const json = await response.json()
        setNotes(json)
    }



    //Add note function
    const addnote = async (noteTitle, noteDiscription, tag) => {
        const response = await fetch(`${host}/api/note/addNotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('JWTToken'),

            },
            body: JSON.stringify({ noteTitle, noteDiscription, tag })
        });
        const jsonResponse = await response.json();
        setNotes(notes.concat(jsonResponse))



    }


    // delect noyte function 
    const delectnote = async (id) => {

        const response = await fetch(`${host}/api/note/delectingNote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('JWTToken')
            },
        });

        const filterNote = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(filterNote)
    }

    // update note function
    const updatenote = async (id, noteTitle, noteDiscription, tag) => {

        const response = await fetch(`${host}/api/note/updateNote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('JWTToken')
            },
            body: JSON.stringify({ noteTitle, noteDiscription, tag })
        });

        const jsonResponse = await response.json();
        let newNotes = JSON.parse(JSON.stringify(notes))

        for (let i = 0; i < newNotes.length; i++) {
            if (newNotes[i]._id === id) {
                newNotes[i].noteTitle = noteTitle
                newNotes[i].noteDiscription = noteDiscription
                newNotes[i].tag = tag
                break;
            }
        }
        setNotes(newNotes)


    }


    return (
        <NoteContext.Provider value={{ notes ,setNotes  ,loadingStatus , setloadingStatus, addnote, delectnote, updatenote, fatchnotefunction }}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;