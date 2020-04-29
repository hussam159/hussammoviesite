import React, { Component } from "react";
import Pagination from "./pagination";
import Serie from "./serie";
import { getPopular } from "../services/seriesService";
import { beginTheBar, endTheBar } from "../services/loadingBarService";
import queryString from "query-string";

class Series extends Component {
  state = {
    series: [],
    rawData: [],
    currentPage: 1
  };

  getHeaderQuery = () => queryString.parse(this.props.location.search);

  componentDidMount() {
    beginTheBar();
    let page = this.getHeaderQuery().page || this.state.currentPage;
    this.props.history.push(`/series?&page=${page}`);

    if (page !== this.state.currentPage) {
      this.setState({ currentPage: page });
    }
    getPopular(this.state.currentPage).then(series => {
      this.setState({ series: series.results, rawData: series }, () => {
        endTheBar();
      });
    });
  }

  pushToHistory = page => {
    this.props.history.push(`/series?&page=${page}`);
  };

  handlePageChange = page => {
    beginTheBar();
    this.setState({ currentPage: page }, () => {
      getPopular(this.state.currentPage).then(series => {
        this.setState({ series: series.results, rawData: series }, () => {
          endTheBar();
          this.pushToHistory(this.state.currentPage);
        });
      });
    });
  };

  render() {
    const { series } = this.state;
    const { total_pages: totalPages, page: currentPage } = this.state.rawData;
    return (
      <div>
        <h1 className="movies-main-header display-4">Popular</h1>
        <div className="float-right"></div>

        <br />
        <br />
        <br />
        <ul className="row">
          {series.map(m => (
            <Serie key={m.id} serie={m} />
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

export default Series;
