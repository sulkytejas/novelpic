import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import DebounceInput from 'react-debounce-input'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class BookSearch extends Component{
  state={
    query: " ",
    searchBook:[]
  }

  updateQuery = (query)=>{
   let trim_query = query.trim()
   this.setState({query: trim_query})
   BooksAPI.search(trim_query,20).then((response)=>{
    if(!response || response.error) return;
    const SearchResult = response.map((book) =>{
        book.shelf = 'none'
        this.props.allBooks.forEach((b) =>{
          if (b.id === book.id){
              book.shelf = b.shelf
          }
        })
        return book
    })
    this.setState({searchBook:SearchResult})
    })
  }

  render(){
    let SearchedBook
    if(this.state.query){
      SearchedBook = this.state.searchBook
    }else{
      SearchedBook =  this.props.allBooks
    }
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              minLength={2}
              debounceTimeout={300}
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event)=>this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <Book
            onUpdateShelf={(Id,shelf)=>{
            this.props.onUpdateShelf(Id,shelf)
          }}
          books={SearchedBook}/>
        </div>
      </div>
    )
  }
}

export default BookSearch
