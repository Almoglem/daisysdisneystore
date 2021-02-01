'use strict';

var gBooks;
var gSortBy;
var gBookNames = ['Alice in Wonderland', 'Tangled', 'Maleficent', 'The Jungle Book', 'The Beauty and The Beast', 'Sleeping Beauty', 'Cinderella', 'Bambi', 'Winnie The Pooh', 'Dumbo', 'The Little Mermaid', '101 Dalmatians', 'Lion King', 'Peter Pan', 'The Aristocats', 'Lady and The Tramp', 'Snow White', 'Pinocchio', 'Tarzan', 'Aladdin', 'Frozen', 'Mulan', 'Toy Story', 'Brave', 'Pocahontas', 'Brother Bear', 'Lilo and Stitch'];

function getBooksToDisplay() {
    var books = loadFromStorage('books');
    if (!books || !books.length) books = _createBooks(10);
    gBooks = books;
    _updateBooksStorage();
    if (gSortBy) books = getBooksSorted(books);
    return books;
}

function setSort(sortBy) {
    gSortBy = sortBy;
}

function getBooksSorted(books) {
    if (gSortBy === 'title') return _sortByTitle(books);
    return _sortByNumber(books);
}

function getBook(id) {
    var book = gBooks.find(book => book.id === id);
    return book;
}

function deleteBook(id) {
    var bookIdx = gBooks.findIndex(book => book.id === id);
    gBooks.splice(bookIdx, 1);
    _updateBooksStorage();
}

function addBook(name, price) {
    var newBook = _createBook(name, price);
    gBooks.unshift(newBook);
    _updateBooksStorage();
}

function updateBook(id, price) {
    var book = getBook(id);
    book.price = price;
    _updateBooksStorage();
}

function getImgUrl(id) {
    var imgUrl;
    var bookTitle = getBook(id).title;
    if (!gBookNames.find(title => title === bookTitle)) {
        imgUrl = `img/other.jpg`
        return imgUrl;
    }
    bookTitle = bookTitle.replace(/\s/g, '')
    imgUrl = `img/${bookTitle}.jpg`
    return imgUrl;
}


//// update books in storage

function _updateBooksStorage() {
    saveToStorage('books', gBooks);
}
/////// books creation

function _createBooks(num) {
    var books = [];
    for (var i = 1; i <= num; i++) {
        var currBook = _createBook(_generateTitle(), getRandomInt(2, 12), i);
        books.push(currBook);
    }
    return books;
}

function _createBook(title, price) {
    var book = {
        id: _generateUniqID(),
        title: title,
        price: price
    }
    return book;
}

function _generateTitle() {
    var bookName = gBookNames[getRandomInt(0, gBookNames.length - 1)];
    return bookName;
}

function _generateUniqID() {
    var base = Date.now();
    var mult = getRandomInt(2, 3)
    var divider = getRandomInt(4, 5)
    var add = getRandomInt(1, 100)
    var id = base * mult / divider + add;
    return Math.round(id) + 'a';
}

////sortings
function _sortByTitle(books) {
    return books.sort((book1, book2) => {
        return book1.title.localeCompare(book2.title);
    });
}

function _sortByNumber(books) {
    return books.sort((book1, book2) => {
        return book1[gSortBy] - book2[gSortBy];
    });
}
