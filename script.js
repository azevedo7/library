let myLibrary = [
    {author: 'Jordan B. Petterson', title: '12 Rules for life', pages: 300, read: false}
];

const addButton = document.querySelector('#addBook');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readCheck = document.querySelector('#read');

const library = document.querySelector('#library');

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

let author = '';
let title = '';
let pages = 0;
let read = false;

function addBookToLibrary () {
    author = authorInput.value;
    title = titleInput.value;
    pages = pagesInput.value;
    read = readCheck.checked;
    myLibrary.push(new Book(author, title, pages, read));
    displayBooks();
}

addButton.addEventListener("click", function(event) {
    addBookToLibrary();
    event.preventDefault();
});

// Para cada item na libraria criar um div
// Nesse div, para cada item do objeto criar um div

function displayBooks () {
    myLibrary.forEach((book) => {
        if(!document.getElementById(book.title)) {
            const newDiv = document.createElement('div');
            newDiv.setAttribute('id', book.title);
            for (item in book) {
                const bookDetail = document.createElement('div');
                bookDetail.setAttribute('class', item);
                
                const key = document.createElement('p');
                const value = document.createElement('p');
                key.setAttribute('class', item);
                key.innerHTML = item;
                value.innerHTML = book[item];

                bookDetail.appendChild(key); // Add title of item
                bookDetail.appendChild(value); // Add value of item
                newDiv.appendChild(bookDetail); // Add Title and value
            }
            library.appendChild(newDiv);
        }
    }) 
}

displayBooks();