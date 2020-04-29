import React, { Component } from "react";
import { searchMovie } from "../services/moviesService";
import Movie from "./movie";
import Serie from "./serie";
import Pagination from "./pagination";
import queryString from "query-string";
import { beginTheBar, endTheBar } from "../services/loadingBarService";
import { searchSeries } from "../services/seriesService";

class Search extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    show: [],
    rawData: [],
    seacrchShowName: "",
    currentPage: 1,
    submitedShowName: "",
    searchType: ""
  };

  search = _callback => {
    let data = this.getHeaderQuery().q;
    let page = this.state.currentPage;

    if (this.state.searchType === "Movies") {
      searchMovie(data, page).then(result => {
        this.setState(
          {
            show: result.results,
            rawData: result,
            currentPage: 1,
            submitedShowName: data
          },
          () => {
            _callback();
          }
        );
      });
    } else {
      searchSeries(data, page).then(result => {
        this.setState(
          {
            show: result.results,
            rawData: result,
            currentPage: 1,
            submitedShowName: data
          },
          () => {
            _callback();
          }
        );
      });
    }
  };

  getHeaderQuery = () => queryString.parse(this.props.location.search);

  componentDidMount() {
    beginTheBar();
    let page = this.getHeaderQuery().page || this.state.currentPage;
    let query = this.getHeaderQuery().q || this.state.seacrchShowName;
    if (query !== "") {
      if (page !== this.state.currentPage) {
        this.setState({ currentPage: page });
      }
    }
    this.pushToHistory(query, page);

    this.setState({ currentPage: page }, () => {
      this.search(() => {
        endTheBar();
      });
    });
  }

  handleShowTitleInput = e => {
    this.setState({ seacrchShowName: e.target.value });
  };
  seriesSearch = e => {
    this.setState({ searchType: e.target.value, show: undefined });
  };
  movieSearch = e => {
    this.setState({ searchType: e.target.value, show: undefined });
  };

  pushToHistory = (query, page) => {
    this.props.history.push(
      `/search?q=${encodeURIComponent(query)}&page=${page}`
    );
  };

  handleFormSubmit = e => {
    e.preventDefault();
    if (this.state.seacrchShowName === undefined) return;
    if (this.state.seacrchShowName === "") return;
    beginTheBar();
    this.pushToHistory(this.state.seacrchShowName, this.state.currentPage);

    this.setState({ submitedShowName: this.state.seacrchShowName }, () => {
      this.search(() => endTheBar());
    });
  };

  handlePageChange = page => {
    beginTheBar();
    this.setState({ currentPage: page }, () => {
      this.pushToHistory(this.state.submitedShowName, this.state.currentPage);
      this.search(() => {
        endTheBar();
      });
    });
  };

  submitedShowName = show => {
    return (
      <ul className="row">
        {show.map(m =>
          this.state.searchType === "Movies" ? (
            <Movie key={m.id} movie={m} />
          ) : (
            <Serie key={m.id} serie={m} />
          )
        )}
      </ul>
    );
  };

  render() {
    const {
      total_pages: totalPages,
      page: currentPage,
      total_results: totalResults
    } = this.state.rawData;

    return (
      <div>
        <br />
        <div className="inline-form">
          <form className="form-inline" onSubmit={this.handleFormSubmit}>
            <div className="form-group mx-sm-3 mb-2">
              <input
                type="text"
                className="form-control"
                id="ShowTitle"
                autoFocus
                placeholder="Title"
                value={this.state.seacrchShowName}
                onChange={this.handleShowTitleInput}
              />
            </div>

            <button type="submit" className="btn btn-primary mb-2 ml-2">
              Search
            </button>
          </form>
          <br />
        </div>
        <div className="form-group mx-sm-3 mb-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="Radios"
              id="Movies"
              value="Movies"
              onClick={this.movieSearch}
            />
            <label className="form-check-label" for="Movies">
              Movies
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="Radios"
              id="Series"
              value="Series"
              onClick={this.seriesSearch}
            />
            <label className="form-check-label" for="Series">
              Series
            </label>
          </div>
        </div>
        <br />

        {this.state.show === undefined || this.state.show.length === 0 ? (
          <p>No Results</p>
        ) : (
          <div>
            <p>
              Showing <span className="font-weight-bold">{totalResults}</span>{" "}
              results for '{this.state.submitedShowName}'
            </p>
            {this.state.searchType && this.submitedShowName(this.state.show)}
          </div>
        )}
        {this.state.show != undefined && (
          <Pagination
            pageCount={totalPages || 1}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        )}
      </div>
    );
  }
}

export default Search;
