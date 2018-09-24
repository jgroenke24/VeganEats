var React = require('react');
var api = require('../utils/api');
var PropTypes = require('prop-types');

function RestaurantGrid(props) {
  return (
    <ul className='restaurant-list'>
      {props.restaurants.map(function(restaurant) {
        return (
          <li key={restaurant.restaurant.name} className='list-item'>
            <div className='list-name'>
              {restaurant.restaurant.name}
            </div>
            <div>
              {restaurant.restaurant.location.address}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

RestaurantGrid.propTypes = {
  restaurants: PropTypes.array.isRequired
}

class LocationInput extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      location: '',
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    var value = event.target.value;
    
    this.setState(function() {
      return {
        location: value,
      };
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    
    api.getLatLng(this.state.location)
      .then(api.getRestaurants)
      .then((result) => {
        this.props.onSubmit(result);
      })
      .catch(api.handleError);

    // call props onsubmit with returned restaurants array
  }
  render() {
    return (
      <section>
        <form className='column' onSubmit={this.handleSubmit}>
          <input
            type='text'
            autoComplete='off'
            placeholder='Address or Zip Code'
            value={this.state.location}
            onChange={this.handleChange}
          />
          <button
            className='button'
            type='submit'
          >
            Search location
          </button>
        </form>
      </section>
    );
  }
}

LocationInput.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      restaurants: null,
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(restaurants) {
    this.setState(function() {
      var newState = {
        restaurants: restaurants,
      };
      return newState;
    });
  }
  render() {
    var restaurants = this.state.restaurants;
    return (
      <main className='container'>
      
        <section className='column'>
          <h1>Find Vegan Friendly Restaurants In Your Area!</h1>
          <h2>Just enter your address or zipcode</h2>
        </section>
        
        {!restaurants &&
          <LocationInput 
            onSubmit={this.handleSubmit}
          />}
          
        {restaurants &&
          <RestaurantGrid
            restaurants={this.state.restaurants}
          />}
      
      </main>
    );
  }
}

module.exports = Home;