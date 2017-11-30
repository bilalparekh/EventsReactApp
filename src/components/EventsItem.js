import React from 'react';
import * as firebase from 'firebase'
import reactfire from 'reactfire'
import FaClose from 'react-icons/lib/fa/close';
let database


//If Component has no state of its own so dont need to use class Component
const EventsItem = (props) => {
    debugger;
    var dateToDisplay = new Date(Number(props.detail.currentDay));
    console.log("...",dateToDisplay)
    
    
    return (
        <section>
        <h4>{dateToDisplay.toDateString()}</h4>
         <li>{props.detail.name}<span onClick = { () => {
                    props.clickHandlerDelete(props.detail.id,props.index)
                }}  
                className="deleteEvent"><FaClose/></span>
                
            </li>
            <button className="EditTask"  
            onClick = { () => { props.clickHandlerForEdit(props.detail.id,props.detail.name)}} >EDIT 
           
            </button>
            </section>
    )      
}

export default EventsItem;