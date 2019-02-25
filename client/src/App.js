import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

function ListItem(props){
  return (
    <li onClick={props.onClick}>
      {props.item}

    </li>
  );
}

class App extends Component {
  constructor() {
    super();
    var notes = [];
    axios.get('/notes').then(response => {
      this.setState({list: response.data}); 
    }).catch();

    this.state = {
      userInput:'',
      list: ['test'],
    };
  }

  addItem() {
    var item = document.getElementById("listItem").value;
    document.getElementById("listItem").value = "";
    var newList = this.state.list.slice();
    newList.push(item);
    this.setState({list: newList});
    console.log(newList);

    const newListItem = { text: this.state.title};

    axios.post('/notes', {title:item, body:item})
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response.data))
  }
  
  
  // deleting item in the list
  onClick(index){
    var newList = this.state.list.slice();
    newList.splice(index, 1);
    this.setState({list: newList});
  }

  render() {
    var listItems = [];
    this.state.list.forEach((item, i) => { console.log(item);
      listItems.push(<ListItem item={item} onClick={() => this.onClick(i)} />)
    });
    return (
      <div className="App">
        <div id="container">
          <h1>Extended Brain</h1>
          <h3>A simple note application</h3>
          <small>Welcome {this.props.name}! <br></br><br></br>Please add your new items on the list. <br></br>Remove items by clicking on them.</small><br></br><br></br>

          <div class="listbox">
            <ul>
              {listItems}
            </ul>
          </div>
          <input type="text" onChange = {event => this.setState({userInput: event.target.value})} id="listItem" placeholder="Add item"/>
          <button type="button" onClick={() => this.addItem()}>Submit</button>
          </div>
        </div>
    );
  }
}

export default App;
