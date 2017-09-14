import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class BookSearch extends Component{
  state={
    query: " ",
    searchBook:[]
  }

  updateQuery = (query)=>{
   this.setState({query: query.trim()})
   let trim_query = query.trim()
   BooksAPI.search(trim_query).then((books)=>{
    if(!books || books.error) return
      this.setState({
        searchBook:books
      })
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
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event)=>this.updateQuery(event.target.value)}/>
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
