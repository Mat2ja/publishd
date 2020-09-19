const searchbar = document.querySelector('.nav__searchbar');
const submitBtn = document.querySelector('.nav__submit');
const form = document.querySelector('#nav-form');

console.log('hey');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchbar.value}`;

    try {
        // perform search
        let response = await axios.get(url);
        const selfLink = response.data.items[0].selfLink

        // get specific book data
        let { data } = await axios.get(selfLink);
        const bookData = data.volumeInfo;
        addBookElement(bookData);
    } catch (error) {
        console.log(error);
    }
})

function addBookElement(bookData) {
    // console.log(bookData);
    document.querySelector('.all .book-grid').innerHTML += createBookElement(bookData);
}
function addSuggestion(bookData) {
    // console.log(bookData);
    // form.querySelector('.suggestions').innerHTML += createSuggestion(bookData);
    document.querySelector('.all .book-grid').innerHTML += createBookElement(bookData);

}


function createSuggestion(bookData) {
    const title = bookData.title;
    const subtitle = bookData.subtitle;
    // let authors = Array.isArray(bookData.authors) ? bookData.authors.reduce((a, b) => `${a}, ${b}`) : authors[0];
    let authors = bookData.authors.reduce((a, b) => `${a}, ${b}`);

    const images = bookData.imageLinks;
    return `
        <li class='suggestion'>
            <img src='${images.thumbnail}'> ${authors}, ${title}
        </li>
    `
}

searchbar.addEventListener('input', async () => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchbar.value}`;
    // form.querySelector('.suggestions').innerHTML = '';
    document.querySelector('.all .book-grid').innerHTML = '';
    try {
        // perform search
        let response = await axios.get(url);
        console.log(response.data.items);
        for (let item of response.data.items) {
            console.log('item:', item.selfLink);
            const selfLink = item.selfLink;

            // get specific book data
            let { data } = await axios.get(selfLink);
            const bookData = data.volumeInfo;
            // addBookElement(bookData);
            addSuggestion(bookData);
        }

    } catch (error) {
        console.log(error);
    }
})

function createBookElement(bookData) {
    const title = bookData.title;
    const subtitle = bookData.subtitle;
    let authors = bookData.authors.reduce((a, b) => `${a}, ${b}`);

    const images = bookData.imageLinks;
    return `
    <div class="all__book">
        <img src="${images.thumbnail}" alt="" class="book__cover">
        <div class="book__details">
            <div class="book__desc">
            <h3 class="book__title">${title}</h3>
            <h3 class="book__author">${authors}</h3>
            </div>
            <div class="book__rating">
            <div class="book__stars">
                <i class="book__icon icon icon--star" data-jam="star-f"></i>
                <i class="book__icon icon icon--star" data-jam="star-f"></i>
                <i class="book__icon icon icon--star" data-jam="star-f"></i>
                <i class="book__icon icon icon--star" data-jam="star"></i>
                <i class="book__icon icon icon--star" data-jam="star"></i>
            </div>
            <span class="book__rating-count">456</span>
            </div>
            <div class="book__pricing">
            <span class="book__price">$ 18.00</span>
            <i class="book__icon icon icon--add" data-jam="plus-rectangle-f"></i>
            </div>
        </div>
    </div>
    `
}

