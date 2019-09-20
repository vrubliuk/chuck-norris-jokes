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
    jokesQuantity: 10,
    showTooltip: false
  }

  //------------------METHODS-----------------------

  getCategories = () => {
    axios.get('https://api.icndb.com/categories')
      .then(response => {
        let categories = this.state.categories
        response.data.value.forEach(elem => {
          categories.push(elem)
        })
        this.setState({
          categories
        })
      })
      .catch(error => {
        alert(error)
      })
  }

  getJokes = () => {
    if (this.validateInput()) {
      let url
      if (this.state.currentCategory === 'all categories') {
        url = `https://api.icndb.com/jokes/random/${this.state.jokesQuantity}`
      } else {
        url = `https://api.icndb.com/jokes/random/${this.state.jokesQuantity}/?limitTo=[${this.state.currentCategory}]`
      }
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
        })
    }
  }

  validateInput = () => {
    let jokesQuantity = Number(this.state.jokesQuantity)
    if (jokesQuantity >= 1 && jokesQuantity <= 10) {
      this.setState({
        jokesQuantity
      })
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
      }, 1000)
    }
  }

  // ------------------HANDLERS---------------------

  handleClickRefreshButton = (e) => {
    e.preventDefault()
    this.getJokes()
  }

  handleClickCategory = (categoryName) => {
    if (categoryName !== this.state.currentCategory) {
      this.setState({
        currentCategory: categoryName
      }, () => {
        this.getJokes()
      })
    }
  }

  handleChangeJokesQuantityInput = (e) => {
    this.setState({
      jokesQuantity: e.target.value
    })
  }

  //-----------------LIFECYCLE----------------

  componentDidMount() {
    this.getCategories()
    this.getJokes()
  }

  render() {
    return (
      <div className="App">
        <header className="Header">Chuck Norris Jokes</header>
        <main className="Content">
          <aside className="Categories">
            {this.state.categories.map(category => {
              return <Category handleClickCategory={this.handleClickCategory.bind(this, category)} currentCategory={this.state.currentCategory} key={category}>{category}</Category>
            })}
          </aside>
          <section className="Jokes">
            <Form jokesQuantity={this.state.jokesQuantity} handleChangeJokesQuantityInput={this.handleChangeJokesQuantityInput} handleClickRefreshButton={this.handleClickRefreshButton} showTooltip={this.state.showTooltip}></Form>
            {this.state.jokes.map(joke => {
              return <Joke key={joke}>{joke}</Joke>
            })}
          </section>
        </main>
      </div>
    )
  }
}

export default App
