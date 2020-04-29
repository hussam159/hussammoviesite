import React, { Component } from "react";
import { getGenresByID } from "../services/seriesService";
import { Link } from "react-router-dom";

class Serie extends Component {
  constructor(props) {
    super(props);
  }

  renderGridSerie = serie => (
    <li
      className="col-xs-12 col-sm-6 col-md-4 mx-auto col-xl-3 movie"
      key={serie.id}
    >
      <div className="poster-container">
        <Link to={`/serie?id=${serie.id}`}>
          <img
            className="responsive-img movie-poster"
            alt="Poster"
            src={"http://image.tmdb.org/t/p/w500/" + serie.poster_path}
          />
        </Link>
        <div className="widgets-container">
          <div className="release-date">
            {serie.first_air_date.substring(0, 4)}
          </div>
        </div>
      </div>
      <div className="text-container-grid">
        <h1 className="movie-title">{serie.original_name}</h1>
        <p className="movie-genre">
          {getGenresByID(serie.genre_ids).map(g => (
            <span key={g.id}> {g.name} </span>
          ))}
        </p>
      </div>
    </li>
  );

  renderListSerie = serie => (
    <li
      className="col-xs-12 col-sm-12 col-md-12 mx-auto col-xl-12 row movie movie-list"
      key={serie.id}
    >
      <Link to={`/series?id=${serie.id}`}>
        <div className="poster-container list">
          <img
            className="responsive-img movie-poster movie-poster-list"
            src={"http://image.tmdb.org/t/p/w500/" + serie.poster_path}
            onClick={() => this.handleImageClick(serie)}
            alt="Poster image"
          />
        </div>
      </Link>
      <div className="text-container-list">
        <Link to={`/series?id=${serie.id}`}>
          <h1 className="movie-title-list">{serie.original_name}</h1>
        </Link>
        <br />
        <p className="movie-genre movie-genre-list">
          {getGenresByID(serie.genre_ids).map(g => (
            <span key={g.id ? g.id : "N/A"}> {g.name ? g.name : "N/A"} </span>
          ))}
        </p>
        <br />
        <div className="release-date-list">
          Release Date: {serie.first_air_date}
        </div>

        <p className="list-movie-overview">{serie.overview}</p>
      </div>
    </li>
  );

  render() {
    const { serie } = this.props;

    return this.renderGridSerie(serie);
  }
}

export default Serie;
