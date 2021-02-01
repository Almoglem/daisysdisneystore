'use strict';

var gIsModalActive = false;
var gCurrOpenModalId = null;

function onInit() {
    renderBooks();
}


function renderBooks() {
    var books = getBooksToDisplay();
    var strHTMLs = books.map((book) => {
        return `<tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td class="price">$${book.price}</td>
            <td> <button onclick="onViewBook('${book.id}')">View</button>
            <button onclick="onUpdateBook('${book.id}')">Update</button> 
            <button onclick="onDeleteBook('${book.id}')">Delete</button> </td>
        </tr>`
    });
    var elTbody = document.querySelector('.books-tbody');
    elTbody.innerHTML = strHTMLs.join('');
}

function onDeleteBook(id) {
    deleteBook(id);
    renderBooks();
}

function onAddBook() {
    var bookName = prompt('name?');
    var price = prompt('price?')
    addBook(bookName, price);
    renderBooks();
}

function onUpdateBook(id) {
    var price = prompt('new price?');
    updateBook(id, price);
    renderBooks();
}

function onSortBy(sortBy) {
    setSort(sortBy);
    renderBooks();
}
// book details modal

function onViewBook(id) {
    if (gIsModalActive) {
        onCloseModal();
        if (gCurrOpenModalId === id) return;
    }

    var modal = document.querySelector('.book-details');
    var book = getBook(id);
    var description = makeLorem();
    var imgUrl = getImgUrl(id);

    var strHTML = `<img class= "desc-img" src="${imgUrl}" alt="${book.title}">
    <span class="book-title">${book.title}</span>
    ${description}`
    modal.innerHTML += strHTML;
    modal.classList.remove(`hidden`);
    gIsModalActive = true;
    gCurrOpenModalId = id;
}

function onCloseModal() {
    var modal = document.querySelector('.book-details');
    modal.classList.add('hidden')
    modal.innerHTML = `<span class="close" onclick="onCloseModal()"> x </span>`;
    gIsModalActive = false;
}