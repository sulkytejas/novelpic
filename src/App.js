import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
     allBooks: [],
     newBooks:[]
  }

  componentDidMount(){
    BooksAPI.getAll().then((allBooks) => {
      this.setState({allBooks:allBooks})
    })
  }

  UpdateShelf = (Id,shelf)=>{
    const books = [this.state.allBooks]
     books.map((oneBook)=>{
      if(oneBook.id == Id){
        console.log(oneBook.title)
        oneBook.shelf = shelf
        // this.setState({allBooks: books})
      }
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <BookShelf
            allBooks={this.state.allBooks}
          />
        )}/>
        <Route exact path="/search" render={()=>(
          <BookSearch
            allBooks={this.state.allBooks}
            onUpdateShelf={(Id,shelf)=>{
              this.UpdateShelf(Id,shelf)
            }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
