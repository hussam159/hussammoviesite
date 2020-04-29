const API_KEY = '058870725be2093ac363f07f36672e0d'
export function searchSeries(title, page) {
    console.log('you reached here');
  let API_URL = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&append_to_response=releases`
  console.log(API_URL);
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}&query=${encodeURI(title)}&page=${page}`)
      .then(res => res.json())
      .then(json => {
        resolve(json)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function getGenresByID(ids) {
  const genres = [
       {
            id: 10759,
            name: "Action & Adventure"
        },
        {
            id: 16,
            name: "Animation"
        },
        {
            id: 35,
            name: "Comedy"
        },
        {
            id: 80,
            name: "Crime"
        },
        {
            id: 99,
            name: "Documentary"
        },
        {
            id: 18,
            name: "Drama"
        },
        {
            id: 10751,
            name: "Family"
        },
        {
            id: 10762,
            name: "Kids"
        },
        {
            id: 9648,
            name: "Mystery"
        },
        {
            id: 10763,
              name: "News"
        },
        {
            id: 10764,
            name: "Reality"
        },
        {
            id: 10765,
            name: "Sci-Fi & Fantasy"
        },
        {
            id: 10766,
            name: "Soap"
        },
        {
            id: 10767,
            name: "Talk"
        },
        {
            id: 10768,
            name: "War & Politics"
        },
        {
            id: 37,
            name: "Western"
        }
  ]
  let data = []
  ids.forEach(id => {
    let genre = genres.find(g => id === g.id)
    if (!genre){genre={id:0,name:"N/A"}}
    data = [...data, genre]
  })
  return data
}

export function getPopular(page) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    )
      .then(res => res.json())
      .then(json => {
        resolve(json)
      })
      .catch(err => {
        reject(err)
      })
  })
}


export function getDetailedSeries(serieID) {
  return new Promise((resolve, reject) => {
    fetch(`https://api.themoviedb.org/3/tv/${serieID}?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(json => {
        resolve(json)
      })
      .catch(err => {
        reject(err)
      })
  })
}
