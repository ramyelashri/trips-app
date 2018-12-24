import React, { Component } from 'react';
import Trips from "./Trips";

export default class SearchForm extends Component {

    constructor(){
        super();
        this.state = {
          departure: '',
          arrival: '',
          sortBy: 'Cheapest',
          formSubmitted: false
        };
        this.cities = ['London', 'Amsterdam', 'Warsaw', 'Stockholm', 'Paris', 'Brussels', 'Prague', 'Moscow', 'Madrid', 'Geneva', 'Budapest', 'Kiev', 'Lisbon', 'Rome', 'Athens', 'Istanbul'];
    }

    handleSubmit = (event) => {
      event.preventDefault();
      this.setState({
        departure: this.refs.departure.value.trim(),
        arrival: this.refs.arrival.value.trim(),
        formSubmitted: true
      })
    }

    changeSorting = (e) => {
      this.setState({ sortBy: e.target.value })
    }

    render() {
      let {departure, arrival, sortBy, formSubmitted} = this.state;
        return (
            <div>
              {formSubmitted && (!departure || !arrival) &&
                <div className="alert alert-primary" role="alert">
                  Please select your trip departure and destination
                </div>
              }
              <form onSubmit={this.handleSubmit}>
              <small class="form-text text-muted">
                Hint: from London to Amsterdam
              </small>
                <select className="custom-select custom-select-lg mb-3" ref="departure">
                  <option value="">From</option>
                  {this.cities &&
                  this.cities.map((city, index) => {
                      return (
                          <option key={index} value={city}>{city}</option>
                      )
                  })
                  }
                </select>
                <select className="custom-select custom-select-lg mb-3" ref="arrival">
                  <option value="">To</option>
                  {this.cities &&
                  this.cities.map((city, index) => {
                      return (
                          <option key={index} value={city}>{city}</option>
                      )
                  })
                  }
                </select>
                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                  <label className={"btn btn-secondary " + (this.state.sortBy === 'Cheapest' ? 'active' : '')}>
                    <input type="radio"
                    name="sortBy"
                    value="Cheapest"
                    onChange={this.changeSorting.bind(this)}
                    defaultChecked />
                    Cheapest
                  </label>
                  <label className={"btn btn-secondary " + (this.state.sortBy === 'Fastest' ? 'active' : '')}>
                    <input type="radio"
                    name="sortBy"
                    onChange={this.changeSorting.bind(this)}
                    value="Fastest" />
                    Fastest
                  </label>
                </div>

                <div>
                  <hr />
                  <button type="submit" className="btn btn-lg btn-success">
                    <i className="fa fa-search"/> &nbsp;Search
                  </button>
                </div>
              </form>

              {departure && arrival && sortBy &&
                  <Trips
                  departure={departure}
                  arrival={arrival}
                  sortBy={sortBy}></Trips>
              }
            </div>
        );
    }
}
