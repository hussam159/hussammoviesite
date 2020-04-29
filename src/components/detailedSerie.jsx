import React, { Component } from "react";
import queryString from "query-string";
import { getDetailedSeries } from "../services/seriesService";
import { endTheBar, beginTheBar } from "../services/loadingBarService";

class DetailedSerie extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    serie: {},
    canRender: false
  };

  loadserie = () => {
    beginTheBar();
    const { id } = queryString.parse(this.props.location.search);
    getDetailedSeries(id).then(m => {
      this.setState({ serie: m }, () => {
        endTheBar();
        this.setState({ canRender: true });
      });
    });
  };
  componentDidMount() {
    this.loadserie();
  }

  render() {
    const { history } = this.props;
    const { serie } = this.state;
    if (this.state.canRender) {
      return (
        <div>
          <h1>serie title is {serie.title}</h1>
          <img
            className="responsive-img full-poster-image"
            alt="Poster Image"
            src={"http://image.tmdb.org/t/p/w500/" + serie.poster_path}
          />
          <h1 className="movie-title">{serie.title}</h1>
          <p className="movie-genre">
            {serie.genres.map(genre => (
              <span key={genre.id}> {genre.name} </span>
            ))}
          </p>
          <p>
            <span className="movie-genre">Details: </span>
            {serie.overview}
          </p>
        </div>
      );
    } else return null;
  }
}

export default DetailedSerie;
