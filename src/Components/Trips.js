import React, { Component } from 'react';
import { injectMocks } from 'data-mocks';
import axios from 'axios';
import { responseJson } from './responseJson';
import './Trips.scss';

export default class Trips extends Component {
  constructor(props){
    super(props);
    this.state = {
      trips: [],
      currency: '',
      isLoading: true
    };
    const mocksScenarios = {
      default: [
        {
          url: /trips/,
          method: 'GET',
          response: responseJson,
          responseCode: 200,
          delay: 1000
        }
      ]
    };
    injectMocks(mocksScenarios);
  }

  componentDidMount() {
    this.getTrips();
  }

  componentDidUpdate(prevProps, prevState) {
    if(JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.getTrips();
    }
  }

  getTrips = () => {
    // Fetching trips using a fake mocks API
    Promise.all([
        axios.get('/trips')
    ])
        .then((response) => {
          // Filtering results
          let result = this.filterTrips(response[0].data.deals, this.props.departure, this.props.arrival);
          result = this.props.sortBy === 'Cheapest' ? this.sortCheapest(result) : this.sortFastest(result);
          this.setState({trips: result, currency: response[0].data.currency, isLoading: false})
        })
        .catch(error => {
            console.log('Error fetching trps', error);
        });
  }

  filterTrips = (trips, departure, arrival) => {
    return trips.filter(obj => (obj.departure === departure && obj.arrival === arrival))
  }

  sortCheapest = (trips) => {
    return trips.sort((a, b) => (a.cost - b.cost));
  }

  sortFastest = (trips) => {
    return trips.sort((a, b) => {
      // compare hours first
      if (a.duration.h < b.duration.h) return -1;
      if (a.duration.h > b.duration.h) return 1;

      // else a.duration.h === b.duration.h, so compare minutes to break the tie
      if (a.duration.m < b.duration.m) return -1;
      if (a.duration.m > b.duration.m) return 1;

      // couldn't break the tie
      return 0;
    });
  }

  render(){
    let {cities, trips, currency, isLoading} = this.state
      return (
        <div className="trips">
          {!isLoading && trips && trips.length !== 0 &&
            <div>
                {trips &&
                trips.map((trip, index) => {
                    return (
                        <div key={index}>
                            <div className="trips__text1">
                              {trip.departure} &nbsp;
                              <i className="fa fa-arrow-circle-right"></i> &nbsp;
                              {trip.arrival}
                            </div>
                            <div className="trips__price">
                              {trip.cost}&nbsp;
                              {currency === 'EUR' && <i className="fa fa-euro"/>}
                            </div>
                            <div className="trips__details">
                              By: {trip.transport} <br />
                              Duration: {trip.duration.h}h {trip.duration.m}m</div>
                            <hr/>
                        </div>
                    )
                })
                }
            </div>
          }

          {isLoading &&
              <div className="global__loader"></div>
          }

          {!isLoading && trips && trips.length === 0 &&
              <div className="alert alert-primary" role="alert">No trops found!</div>
          }
        </div>
    )
  }
}
