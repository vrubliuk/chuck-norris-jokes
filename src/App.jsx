import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    categories: ['all']
  }


  getCategories = () => {
    // alert(this.state.categories)
    // let _this = this
    axios.get('http://api.icndb.com/categories')
    .then(response => {
      alert(this.state.categories)

      let categories = this.state.categories;
      response.data.value.forEach(elem => {
        categories.push(elem);
      })

      this.setState({
        categories
      })



    })
    .catch(error => {
      alert(error)
    });

  }




  

  componentDidMount () {

  }


  render() {
    return (
      <div className="App">
        <button onClick={this.getCategories} >Send request</button>
        <div id='content'>
        {this.state.categories.map(category => {
            return <p>{category}</p>
        })
        }
        
        
        </div>
      </div>
    );
  }
}

export default App;
