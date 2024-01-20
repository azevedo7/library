let myLibrary = [];


/*
    TODO:
        Add Id to each book so it is possible to have same title (Now we are using the title for identification)
        Animate hide class
*/

const popup = document.querySelector('.popup');
const addButton = document.querySelector('#addBook');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readCheck = document.querySelector('#read');
const form = document.querySelector('form');
const error = document.querySelector('.error');

const library = document.querySelector('#library');

class Book {
    constructor(author, title, pages, read) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
    }
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

// Just a sample book
myLibrary.push(new Book('Jordan B. Petterson', '12 Rules for life', 300, false));

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let errors = [];
    if(titleInput.value.length == 0){
        errors.push('Please add a title');
    }
    if(errors.length==0){ // success
        popup.classList.add('hide');
        error.innerHTML = '';
        error.classList.add('hide');
        addBookToLibrary();
    }
    else{
        error.innerHTML = errors.join(', ');
        error.classList.remove('hide');
    }
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
                
                let key = document.createElement('p');
                let value = document.createElement('p');
                key.setAttribute('class', item);
                
                if (item == 'read') {
                    value = document.createElement('button');
                    if(book[item]){
                        value.innerHTML = 'Read';
                        value.setAttribute('class' ,'read');
                    } else {
                        value.innerHTML = 'Not Read';
                        value.setAttribute('class', 'not-read')
                    }

                    value.addEventListener('click', function (e) {
                        if (value.classList.contains('read')) {
                            value.classList.remove('read');
                            value.classList.add('not-read');
                            value.innerHTML = 'Not read'
                            book.read = false;
                        }
                        else {
                            value.classList.remove('not-read');
                            value.classList.add('read');
                            value.innerHTML = 'Read';
                            book.read = true;
                        }
                    })

                    bookDetail.appendChild(value); // Add value of item
                    newDiv.appendChild(bookDetail); // Add Title and value
                    continue;
                }

                key.innerHTML = item;
                value.innerHTML = book[item];

                
                bookDetail.appendChild(key); // Add title of item
                bookDetail.appendChild(value); // Add value of item
                newDiv.appendChild(bookDetail); // Add Title and value
            }
            // add remove book button
            const removeBookDiv = document.createElement('div');
            const removeBook = createButton('Remove book', 'remove');
            removeBook.addEventListener('click', function () {
                let arrayItem = myLibrary.findIndex(item => item == book);
                myLibrary.splice(arrayItem, 1);
                removeBookDiv.parentElement.remove();
            })

            removeBookDiv.appendChild(removeBook);
            newDiv.appendChild(removeBookDiv);

            library.appendChild(newDiv);
        }
    }) 
}

displayBooks();

// Function to create Buttons
function createButton(text, className) {
    const button = document.createElement('button');
    button.setAttribute('class', className);
    button.innerHTML = text;
    return button;
}


// Close Pop up button

const popUpCloseBtn = popup.querySelector('.close');
    //Add hide class to make popup dissapear
popUpCloseBtn.addEventListener('click', function() {
    popup.classList.add('hide')
})

//Add book button - remove hide tag
const addBookBtn = document.querySelector('.add-book');
addBookBtn.addEventListener('click', function() {
    popup.classList.remove('hide');
})


