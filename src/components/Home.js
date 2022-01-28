import React from 'react'

import AddNote from './notes/AddNote'
import FetchNote from './notes/FetchNote'



const Home = (props) => {

    return (
        <div>
            
            <div className={`sidebar bg-light float-start shadow-lg  pt-1 pb-1 d-${props.setDisplay}`}>
                <button className='btn btn-defualt float-end' onClick={props.clickNote}>x</button>
                <AddNote />
            </div>

            <div className='showNotes  my-4 mt-5 container '>
                <FetchNote />
            </div>
        </div>

    )
}

export default Home
