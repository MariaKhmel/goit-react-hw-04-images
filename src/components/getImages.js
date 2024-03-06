const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '28537646-cd97be0a16a3b9e5b5e571446';


export const getImages = (searchText,page) => {
    return fetch(`${BASE_URL}?key=${API_KEY}&q=${searchText}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(res => res.json())
}

