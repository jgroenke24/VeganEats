var React = require('react');
var Fragment = React.Fragment;
var Header = require('./Header');
var Home = require('./Home');


class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Home />
      </Fragment>
    );
  }
}

module.exports = App;