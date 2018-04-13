import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import Category from './components/Category/Category'
import Joke from './components/Joke/Joke'
import Form from './components/Form/Form'

class App extends Component {

  state = {
    categories: ['all categories'],
    currentCategory: 'all categories',
    jokes: [],
    jokesQuantity: 5,
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
    e.preventDefault()
    this.setState({
      jokesQuantity: e.target.value
    })
  }

  getJokes = () => {
    let url = `http://api.icndb.com/jokes/random/${this.state.jokesQuantity}`
    axios.get(url)
      .then(response => {
        let jokes = []
        response.data.value.forEach(elem => {
          jokes.push(elem.joke.replace(/&quot;/g, '"'))
        })
         this.setState({
          jokes
        })
      
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
            <Form jokesQuantity={this.state.jokesQuantity} setJokesQuantity={this.setJokesQuantity} getJokes={this.getJokes}></Form>

            {/* <div>
              <input type="number" name="quantity" min="1" max="10" value={this.state.jokesQuantity} onChange={this.setJokesQuantity} />
              <button onClick={this.getJokes}><i className="fa fa-refresh" aria-hidden="true"></i></button>
            </div> */}
            <div>
              { this.state.jokes.map(joke => {
                return <Joke>{joke}</Joke>
              })}
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default App;
