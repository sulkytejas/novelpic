import React,{Component} from 'react'

class Book extends Component {
  state={}
  render(){
    return(
    <div>
      <ol className="books-grid">
        {
          this.props.books.map((book,i)=>(
            <li key={i}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ backgroundImage: `url(${ book.imageLinks && book.imageLinks.smallThumbnail})` }}></div>
                  <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={(event)=> this.props.onUpdateShelf(book,event.target.value)}>
                      <option value="none" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{(book.authors) ? (book.authors.join(',')): ('')}</div>
              </div>
            </li>
          ))
        }
      </ol>
    </div>
    )
  }
}

export default Book
