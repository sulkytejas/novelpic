import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import Shelf from './Shelf'

class BookShelf extends Component{
  state={}

  render(){
    let ShowBooks = [...this.props.allBooks]
    

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>Novelpic</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf title="Currently Reading"
              books={ShowBooks.filter((book) => book.shelf === 'currentlyReading')}
              onUpdateShelf={(Id,shelf)=>{
                this.props.onUpdateShelf(Id,shelf)
              }}
            />
            <Shelf title="Want to Read"
              books={ShowBooks.filter((book) => book.shelf === 'wantToRead')}
              onUpdateShelf={(Id,shelf)=>{
                this.props.onUpdateShelf(Id,shelf)
              }}
            />
            <Shelf title="Read"
              books={ShowBooks.filter((book) => book.shelf === 'read')}
              onUpdateShelf={(Id,shelf)=>{
                this.props.onUpdateShelf(Id,shelf)
              }}
            />

          </div>
        </div>
        <div className="open-search">
          <Link to="/search" >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookShelf
