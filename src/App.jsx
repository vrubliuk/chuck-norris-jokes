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
    // defaultJokesQuantity: '1',
    jokesQuantity: '1',
    showTooltip: false
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


  validateInput = () => {
    let jokesQuantity = Number(this.state.jokesQuantity)
    if (jokesQuantity >= 1 && jokesQuantity <=10) {
      return true
    } else {
      this.setState({
        jokes: [],
        showTooltip: true
      })
      setTimeout(() => {
        this.setState({
          showTooltip: false
        })
      }, 1000);
    }
  }

  getJokes = (e) => {
    e.preventDefault()
    if (this.validateInput()) {
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
            <Form jokesQuantity={this.state.jokesQuantity} setJokesQuantity={this.setJokesQuantity} getJokes={this.getJokes} showTooltip={this.state.showTooltip}></Form>
            { this.state.jokes.map(joke => {
                return <Joke>{joke}</Joke>
              })}
          </section>
        </main>
      </div>
    );
  }
}

export default App;
