const formId = document.querySelector('#formId')
const title = document.querySelector('#title')
const author = document.querySelector('#author')
const email = document.querySelector('#email')
const bookList = document.querySelector('#book-list')
const container = document.querySelector('.container')

// Books Patern
class Book{
    constructor(title, author, email){
        this.title = title,
        this.author = author,
        this.email = email
    }

}
class UI{
    static bookDisplay(){
        const books = Store.getBooks()
        books.forEach((book) => UI.addToBookList(book))
    }
    static addToBookList(books){
      const row = document.createElement('tr') 
      row.innerHTML = `
        <td>${books.title}</td>
        <td>${books.author}</td>
        <td>${books.email}</td>
        <td><i class="fas fa-times delete"></i></td>
      ` 
      bookList.appendChild(row)
    }
    static alert(content, className){
        const div = document.createElement('div')
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(content))
        container.insertBefore(div, formId)
        setTimeout(() => {
            const alert = document.querySelector('.alert')
            alert.remove()
        }, 2000)
    }
    static bookListRemove(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove()
        }
    }
    static clearForm(){
        title.value = ''
        author.value = ''
        email.value = ''
    }
}

class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = []
        }else{
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books
    }
    static addBooks(book){
        const books = Store.getBooks()
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }
    static removeBooksItem(email){
        const books = Store.getBooks()
        books.forEach((book, index) => {
            if(book.email === email){
                books.splice(index, 1)
            }
        })
        localStorage.setItem('books', JSON.stringify(books))
    }
}

document.addEventListener('DOMContentLoaded', UI.bookDisplay)

formId.addEventListener('submit', (e) => {
    e.preventDefault()
    const titleValue = title.value
    const authorValue = author.value
    const emailValue = email.value
    if(titleValue && authorValue && emailValue){
        const books = new Book(titleValue, authorValue, emailValue)
    UI.addToBookList(books)
    Store.addBooks(books)
    UI.alert('Please full fill item', 'success')
    UI.clearForm()
    }else{
        UI.alert('Please full fill item', 'danger')
    }
    
})

bookList.addEventListener('click', (e) => {
    const el = e.target
    UI.bookListRemove(el)
    Store.removeBooksItem(e.target.parentElement.previousElementSibling.textContent)
    
    UI.alert('Book list remove', 'info')
})
