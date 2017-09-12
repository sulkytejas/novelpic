import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

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
          <ol className="books-grid">
            {SearchedBook.map((book,i)=>{
              return <li key={i}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.smallThumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select value={this.state.value} onChange={(event)=> this.props.onUpdateShelf(book,event.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            }

            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch
