import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import Category from './components/Category/Category'

class App extends Component {

  state = {
    categories: ['all categories'],
    currentCategory: 'all categories',
    jokes: [],
    jokesQuantity: 1,
  }


  getCategories = () => {
    axios.get('http://api.icndb.com/categories')
      .then(response => {
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

  setCategory = (categoryName) => {
    this.setState({
      currentCategory: categoryName
    })
  }

  setJokesQuantity = (e) => {
    this.setState({
      jokesQuantity: e.target.value
    })
  }

  getJokes = (e) => {
    e.preventDefault()
    let url = `http://api.icndb.com/jokes/random/${this.state.jokesQuantity}`
    axios.get(url)
      .then(response => {
  
        console.log(typeof response.data.value)


        // let categories = this.state.categories;
        // response.data.value.forEach(elem => {
        //   categories.push(elem);
        // })
        // this.setState({
        //   categories
        // })
      })
      .catch(error => {
        alert(error)
      });

  }

  componentDidMount() {
    this.getCategories()
  }


  render() {
    return (
      <div className="App">
        <header className="Header">Chuck Norris Jokes</header>
        <main className="Content">
          <aside className="Categories">
            {this.state.categories.map(category => {
              return <Category setCategory={this.setCategory.bind(this, category)} currentCategory={this.state.currentCategory}>{category}</Category>
            })}
          </aside>
          <section className="Jokes">
            {/* <div>
              <input type="number" name="" id="" min="1" max="10"/>
              <button onClick={this.getCategories} ><i class="fa fa-refresh" aria-hidden="true"></i></button>
            </div> */}
            <form >
              <input type="number" name="quantity" min="1" max="10" value={this.state.jokesQuantity} onChange={this.setJokesQuantity} />
              <button onClick={this.getJokes}><i className="fa fa-refresh" aria-hidden="true"></i></button>
            </form>
            
          </section>
        </main>
      </div>
    );
  }
}

export default App;
