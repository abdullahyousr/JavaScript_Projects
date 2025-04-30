const addMovieModal = document.getElementById('add-modal');

const StartAddMOvieButton = document.querySelector('header button');

const backDrop = document.getElementById('backdrop');

const cancelAddMovieButton = addMovieModal.querySelector('.modal__actions').firstElementChild;
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;

const userInputs = addMovieModal.querySelectorAll('input');

const entryTextSection = document.getElementById('entry-text');

const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const updateUI = () => {
    if(movies.length === 0)
    {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
};
const toggleBackdrop = () => {
    backDrop.classList.toggle('visible');
};
const showMovieModal = () => {
    addMovieModal.classList.add('visible');
};
const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
}
const clearMovieInput = () => {
    for(const userInput of userInputs){
        userInput.value = '';
    }
}

const startAddMovieHandler = () => {
    showMovieModal();
    toggleBackdrop();
}
const ConfirmAddMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if( titleValue.trim() === '' ||
        imageUrlValue.trim() === '' ||
        ratingValue.trim() === '' ||
        +ratingValue < 1 || +ratingValue > 5)
    {
        alert('Please enter valid values (rating between 1 and 5)');
        return;
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };

    movies.push(newMovie);
    console.log(movies);
    closeAddMovieHandler();
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
};
const closeAddMovieHandler = () => {
    closeMovieModal();
    clearMovieInput();
    toggleBackdrop();
}
const renderNewMovieElement = (Id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
    <div class="movie-element__image">
        <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
    </div>
    `
    newMovieElement.addEventListener('click', startDeleteMovieHandler.bind(null, Id));
    const movieList = document.getElementById('movie-list');
    movieList.append(newMovieElement);
};

const showDeleteModal = () => {
    deleteMovieModal.classList.add('visible');
}
const closeDeleteModal = () => {
    deleteMovieModal.classList.remove('visible');
}

const startDeleteMovieHandler = (movieId) => {
    showDeleteModal();
    toggleBackdrop();
    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');
    
    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
    confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');
    // confirmDeletionButton.removeEventListener('click',  deleteMovieHandler.bind(null, movieId)); // will not work

    cancelDeletionButton.removeEventListener('click', closeDeleteMovieHandler);

    cancelDeletionButton.addEventListener('click', closeDeleteMovieHandler);
    confirmDeletionButton.addEventListener('click', deleteMovieHandler.bind(null, movieId));
}
const deleteMovieHandler = (movieId) => {
    let movieIndex = 0;
    for(const movie of movies){
        if(movie.id === movieId)
        {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const movieList = document.getElementById('movie-list');
    movieList.children[movieIndex].remove();
    // movieList.removeChild(movieList.children[movieIndex]);
    closeDeleteMovieHandler();
    updateUI();
}
const closeDeleteMovieHandler = () => {
    closeDeleteModal();
    toggleBackdrop();
}
const backDropClickHandler = () => {
    closeMovieModal();
    clearMovieInput();
    closeDeleteModal();
    toggleBackdrop();
}



StartAddMOvieButton.addEventListener('click', startAddMovieHandler);

confirmAddMovieButton.addEventListener('click', ConfirmAddMovieHandler);

cancelAddMovieButton.addEventListener('click', closeAddMovieHandler);

backDrop.addEventListener('click', backDropClickHandler);