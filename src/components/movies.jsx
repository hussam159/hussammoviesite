import React, { Component } from "react";
import Pagination from "./pagination";
import Movie from "./movie";
import { getPopular } from "../services/moviesService";
import { beginTheBar, endTheBar } from "../services/loadingBarService";
import queryString from "query-string";

class Movies extends Component {
  state = {
    movies: [],
    rawData: [],
    currentPage: 1
  };

  getHeaderQuery = () => queryString.parse(this.props.location.search);

  componentDidMount() {
    beginTheBar();
    let page = this.getHeaderQuery().page || this.state.currentPage;
    this.props.history.push(`/movies?&page=${page}`);

    if (page !== this.state.currentPage) {
      this.setState({ currentPage: page });
    }
    getPopular(this.state.currentPage).then(movies => {
      this.setState({ movies: movies.results, rawData: movies }, () => {
        endTheBar();
      });
    });
  }

  pushToHistory = page => {
    this.props.history.push(`/movies?&page=${page}`);
  };

  handlePageChange = page => {
    beginTheBar();
    this.setState({ currentPage: page }, () => {
      getPopular(this.state.currentPage).then(movies => {
        this.setState({ movies: movies.results, rawData: movies }, () => {
          endTheBar();
          this.pushToHistory(this.state.currentPage);
        });
      });
    });
  };

  render() {
    const { movies } = this.state;
    const { total_pages: totalPages, page: currentPage } = this.state.rawData;
    return (
      <div>
        <h1 className="movies-main-header display-4">Popular</h1>
        <div className="float-right"></div>

        <br />
        <br />
        <br />
        <ul className="row">
          {movies.map(m => (
            <Movie key={m.id} movie={m} />
          ))}
        </ul>
        <Pagination
          pageCount={totalPages || 1}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default Movies;
