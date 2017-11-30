import React ,{Component} from 'react';
import _ from 'lodash';
import FaClose from 'react-icons/lib/fa/close';
import * as firebase from 'firebase'
import reactfire from 'reactfire'
let database

class EventsList extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: []
    };
    let app = firebase.database().ref('planoevent/addEvent');
    app.on('value', snapshot => {
      this.getData(snapshot.val());
    });
  }

  getData(values){
    let messagesVal = values;
    let messages = _(messagesVal)
                      .keys()
                      .map(messageKey => {
                          let cloned = _.clone(messagesVal[messageKey]);
                          cloned.key = messageKey;
                          return cloned;
                      })
                      .value();
      this.setState({
        messages: messages
      });
  }

  render() {
     
    let messageNodes = this.state.messages.map((message) => {
        console.log("messagemessage",message)
      return (


           <li onClick = { () => {
              
                message.clickHandler(message.index)
            }} 
            className={message.detail.isCompleted ? 'completed':
        ''}>
                {message.detail.name}
                { message.message}
                <span className="deleteEvent"><FaClose/></span>
            </li>
      )
    });
    return (
      <div>
        {messageNodes}
      </div>
    );
  }
}

export default EventsList;