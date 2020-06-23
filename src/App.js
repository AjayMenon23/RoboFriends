import React from 'react';
import Cardlist from './Cardlist'
import robots from './robots'
import Search from './Search'
import './App.css'
import 'tachyons'
import Scroll from './Scroll'


 
class App extends React.Component {

  constructor(){

    super();
    this.state ={
      robots : [],
      searchField : ''
    }
  }


  onSearchChange =(event)=>{
    this.setState({searchField: event.target.value})
  }



  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users').then(response =>{
      return response.json();
    })
    .then(users =>{
          this.setState({robots : users})
        })
  }
  render() {
     const filteredRobots = this.state.robots.filter(robot => {
      return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase());
      }
      );

    if(this.state.robots.length === 0){
      return <h1 className="tc">Loading...</h1>
    }

    else{
      return (
            <div className="tc">
            <h1>RoboFriends</h1>
            <Search searchChange={this.onSearchChange}/>
            <Scroll>
              <Cardlist robots={filteredRobots}/>
            </Scroll>
            </div>
           );
    }
  }
}
 
export default App;