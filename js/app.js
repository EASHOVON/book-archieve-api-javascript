/* Do not show the spinner as soon as the site loads */

document.getElementById('spinner').style.display = 'none';


/* No more error messages */

document.getElementById('error-message').style.display = 'none';



/* On-click Set Up Search button */

const searchBook = () =>
{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;


    /* After putting some input field and pressing the search button, I emptied the input field */
    searchField.value = '';


    /* If the input field is left blank and the search button is pressed, an error message will be displayed */
    if (searchText === "")
    {
        /* Error handling function call */
        displayError();

    } else
    {
        /* If the input field is not empty, run the spinner for the time it takes for the data to load */
        document.getElementById('spinner').style.display = 'block';

        /* If there is an error message, pick it up */
        document.getElementById('error-message').style.display = 'none';

        /* If the previously searched result is in the body, remove it */
        document.getElementById('search-result').textContent = '';

        /* Empty the number of books that were found in the previous search */
        document.getElementById('book-numbers').textContent = '';

        /* Now set the path to load the data */
        const url = `https://openlibrary.org/search.json?q=${ searchText }`;

        /* Bring the data you get by road */
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data))

        /* Send what you found in the function below */
    }

}

/* Error handling machine */
const displayError = () =>
{
    /* The function will call where the error message is displayed */
    document.getElementById('error-message').style.display = 'block';

    /* Stop if you have a spinner */
    document.getElementById('spinner').style.display = 'none';

    /* Empty the number of books you found in the previous search */
    document.getElementById('book-numbers').textContent = '';
}


const displaySearchResult = (data) =>
{
    /* Turn off the spinner when you get the data */
    document.getElementById('spinner').style.display = 'none';

    /* Empty the number of books you found in the previous search */
    document.getElementById('book-numbers').textContent = '';

    /* Take the place where the search results will show */
    const searchResult = document.getElementById('search-result');

    /* 
If the previously searched result is in this place, delete it */
    searchResult.textContent = '';

    /* Extract the array from the available data */
    const books = data.docs;

    /* If there is no book with that name to punish those who search by typing any name */
    if (books.length === 0)
    {

        /* 
    I didn't find what you were looking for in a book, so I sent you to the error machine */
        displayError();

    } else
    {
        /* If you search by the name of the book in stock, show how many books you found in that search result in a dynamic way. */
        document.getElementById('book-numbers').innerText = `Books Found ${ data.numFound }`;

        /* Once you have received the book, stop showing the error message */
        document.getElementById('error-message').style.display = 'none';


        /* Give a book from the book array */
        books.forEach(book =>
        {
            /* Make a new div */
            const div = document.createElement('div');

            /* Add classes to it */
            div.classList.add('col-3');

            /* Enter the inner HTML */
            let imgUrl = `../img/not-found.png`;

            if (typeof book.cover_i !== 'undefined')
            {
                imgUrl = `https://covers.openlibrary.org/b/id/${ book.cover_i }-L.jpg`;
            }
            div.innerHTML = `
            <div class="card h-100 text-center">
                <img src="${ imgUrl }" class="img-fluid mx-auto" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${ book.title }</h5>
                    <p class="card-text">Author: ${ book.author_name?.[0] ? book.author_name[0] : "Not found" }</p>
                    <p class="card-text">Publisher: ${ book.publisher?.[0] ? book.publisher[0] : "Not Found" }</p>
                    <p class="card-text">First Publish Year: ${ book.first_publish_year ? book.first_publish_year : "Not Found" }</p> 
                </div>
            </div>
        `;
            /* Send the div created above */
            searchResult.appendChild(div);
        })
    }

}