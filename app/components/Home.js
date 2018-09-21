var React = require('react');

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
    // Call api function to get lat lng and restaurants
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
      
      </main>
    );
  }
}

module.exports = Home;