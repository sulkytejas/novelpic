import React,{Component} from 'react'
import Book from './Book'

class Shelf extends Component {
  state={}
  render(){
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <Book
            onUpdateShelf={(Id,shelf)=>{
              this.props.onUpdateShelf(Id,shelf)
            }}
            books={this.props.books}
          />
        </div>
      </div>
    )
  }
}

export default Shelf
