import React from 'react';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';


const TodoForm = (props) => {
   


return(
    <div className="containerForm">
        <form onSubmit = {props.addTask} id="FormVals">
            <button className="AddTaskBtn" type= "submit"><FaPlusCircle/></button>
            <input className= "getTask" name="eventsName" placeholder = "Create an Event"
            type="text" 
            value={props.currentTask}
            onChange={props.updateTask}
            onBlur={props.handleOnBlur}
            />
        </form>
    </div>
) 
    
}
export default TodoForm;