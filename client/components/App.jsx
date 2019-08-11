import React from 'react';
import Feed from './Feed.jsx';
import listings from '../data/listingsData.jsx';
import axios from 'axios';
import style from '../style/style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      claimed: [],
      available: [],
      feed: listings
    }
  }

  render() {
    return (
      <div>
        <h1>goodiewill</h1>
        <Feed items={this.state.feed}/>
      </div>
    )
  }
}

export default App;
