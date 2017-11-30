import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calendar from 'react-calendar';
import 'react-calendar/build/Calendar.less';
import {init as firebaseInit} from 'firebase';
import {browserHistory} from 'react-router'
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import DatePicker from 'material-ui/DatePicker';
import EventsItem from './components/EventsItem';
import TodoForm from './components/TodoForm';
import SheduledEvents from './components/SheduledEvents'
import FaSearch from 'react-icons/lib/fa/search';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';
import * as firebase from 'firebase';
import {Modal,OverlayTrigger,Button,Popover,Tooltip,ButtonToolbar} from 'react-bootstrap/lib'
import reactfire from 'reactfire'
let database



const config = {
  apiKey: "AIzaSyB7_sfzydTU3LUDITx7c3dQVu1KNqnZ--E",
  authDomain: "planoevent-d2683.firebaseapp.com",
  databaseURL: "https://planoevent-d2683.firebaseio.com"
};
firebase.initializeApp(config);

// Creating ToDo Item List
class ManageEvents extends React.Component{

constructor(){
        super();
        var events = firebase.database().ref('addEvent');
        console.log("fff",events)
        this.setState({
            events : events
        })
        
        this.deleteEventFromList = this.deleteEventFromList.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.addTask    = this.addTask.bind(this);
        this.seePlannedEvents = this.seePlannedEvents.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.closeSider = this.closeSider.bind(this);
        var currentTask;
        var isEdit;

       
       // this.state.changeDate = day => this.setState({ day })
        this.state= {
            arrEvents : [],
            currentTask : '',
            open : false,
            openPopup : false,
            isDrawerOpen : true,
            events,
            isEdit : false,
            editid :''
            }
        }
    

    getInitialState(){
    

         this.setState ({
            currentTask : ""
        
        })
    
  }
closeSider = () => this.setState({open: !this.state.open});

    handleToggle(day) {
        var getData;
        var events = firebase.database().ref('addEvent');
        var newD = new Date(day).getTime();
        // let arrEvents = this.state.arrEvents;
        var arrEvents = []
        this.setState ({
            currentDay : day,
            open       : true,
            events : this.state.events,
            isEdit : false
        })
        
        this.state.events.on('value', snapshot => {
        getData = snapshot.val();
        console.log("getData",getData);
        arrEvents =[];
        for (var key in getData) {
            if(newD == getData[key].currentDay){
                arrEvents.push({

                    name: getData[key].name,
                    currentDay: getData[key].currentDay,
                    id :  key
                });
            }
        }
        this.setState ({
                arrEvents : arrEvents
             })
            
        })
    }
    // handleToggle = (day) => this.setState({open: !this.state.open,currentDay : day});
    seePlannedEvents(){
        alert("Now select your desired date to see planned events")
    }
    EditEvent(id , title){
        console.log("lll",id);
        //this.setState({isEdit : true}) ;
        
        this.state.currentTask = title 
        this.setState({currentTask : title});
        this.setState({isEdit : true});
        this.setState({editid : id});
        console.log("this.currentTask",this.state.currentTask)
    }
    addTask(evt){
        
        evt.preventDefault();
        if(this.state.isEdit){
        this.currentTask = this.state.currentTask;
        let currentDay = new Date(this.state.currentDay).getTime();
        let events = this.state.events;
        console.log("eventsevents",events)
        var tasks = {
            name        : this.currentTask,
            isCompleted : false,
            currentDay  : currentDay.toString()           
        }
        this.setState({
            tasks,
            currentTask : ''
            
        })
        var ref = firebase.database().ref('addEvent/' + this.state.editid);
        console.log("//",tasks)
        
        ref.set(tasks); 
        }
        else{
        this.currentTask = this.state.currentTask;
        let currentDay = new Date(this.state.currentDay).getTime();
        
        var tasks = {
            name : this.currentTask,
            isCompleted : false,
            currentDay : currentDay.toString()           
        }
        this.setState({
            tasks,
            currentTask : ''
            

            
        })
        var ref = firebase.database().ref('addEvent');
        console.log("//",tasks)
        
        ref.push(tasks); 
        }
        var form = document.getElementById("FormVals");
        form.reset();
        // let tasks = this.state.tasks;
          // Creates a new ref with a new "push key"
           this.setState({
            isEdit : false
            

            
        })
        
       
        
    }
    handleOnBlur(e){
        this.setState({
            currentTask : e.target.value
        })
       
    }
    updateTask(newValue){
        debugger;
        this.setState({
            currentTask : newValue.target.value
        })
    }
  closeDrawer() { 
      this.setState({ isDrawerOpen: false })
     }

    
    deleteEventFromList(id,index){
        
        firebase.database().ref('addEvent/' +id).remove();
        var toDelete = this.state.arrEvents;
        var deleteEvent = toDelete[index];
        toDelete.splice(index, 1);
            this.setState ({
                deleteEvent : deleteEvent
             })
        }
    
    render(){
    return(
        <div> 
            <Calendar
            onClickDay={day => this.handleToggle(day)}
            />
            <div className="chk">
            <div className="footerContainer">
            <ButtonToolbar>
            <Button className="plannedEvent" 
            onClick={this.seePlannedEvents} bsSize="large" active>See Planned Event<FaSearch/></Button>
            <Button className="reminder" bsSize="large" active>Set Reminder<FaPlusCircle/></Button>
            </ButtonToolbar>
            </div>
            </div>
            <MuiThemeProvider>
            <Drawer className="drawerContainer" width={200}  openSecondary={true} open={this.state.open}
            onRequestChange={this.closeDrawer}
            >
            <section className="FormSection">
            
                <p className="headingMain">Events</p>
                <button className="btnCSS" onClick={this.closeSider}>Close</button>
                <ul className = "foo">
                {
                    this.state.arrEvents.map((task , key) => {
                    return <EventsItem key={task.name} 
                    clickHandlerDelete=
                    {
                        this.deleteEventFromList
                    } 
                    clickHandlerForEdit = {
                        this.EditEvent.bind(this)
                    }
                    index={key} 
                    detail={task}
                    currDate = {task.currentDay}
                    />
                })
            }
            </ul>
            <TodoForm
            currentTask = {this.state.currentTask}
            updateTask = {this.updateTask}
            handleOnBlur = {this.handleOnBlur}
            addTask    = {this.addTask}
            handleToggle = {this.handleToggle}
            events = {this.state.events}
            isEdit = {this.state.isEdit}
            editid = {this.state.editid}
            closeDrawer = {this.state.closeDrawer}
            closeSider  = {this.closeSider}
            />
            </section>
            </Drawer>
            </MuiThemeProvider>
            </div>
            )
        }
    }
 
        
        
   

class EventsContainer extends React.Component{
    render(){
        
        return(
            <section className="mainContainer">
               <ManageEvents/>
            </section>
        )
    }
}

export default EventsContainer;