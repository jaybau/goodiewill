import React from 'react';
import Feed from './Feed.jsx';
import NewPost from './NewPost.jsx';
// import listings from '../data/listingsData.jsx';
import axios from 'axios';
import style from '../style/style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feed1: [],
      feed2: [],
      feed3: [],
      currentView: 'feed'
    }

    this.claimItem = this.claimItem.bind(this);
    // this.fetchNext = this.fetchNext.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  componentDidMount() {
    fetch('/goodies')
    .then((res) => res.json())
    .then((results) => {
      this.setState({
        feed1: results.slice(0,6),
        feed2: results.slice(6,12),
        feed3: results.slice(12)
      })
    })
    .catch((err) => {
      console.log('ERROR ON MOUNT: ', err);
    });
  }

  updateView(type) {
    this.setState({
      currentView: type
    })
  }

  // fetchNext(lastId) {
  //   axios.get(`/goodies/next/${lastId}`)
  //   .then((results) => {
  //     this.setState({
  //       feed3: results
  //     })
  //   })
  //   .catch((err) => {
  //     console.log('ERROR ON FETCHNEXT: ', err);
  //   })
  // }

  claimItem(itemId, wasClaimed) {
    axios.patch(`/goodies/claim/${itemId}`, { claimed: wasClaimed })
    .then(() => {
      console.log('successful PATCH request');
    })
    .catch((err) => {
      console.log('ERROR ON CLAIM ITEM: ', err);
    });
  }

  // confirmItem() {}

  addItem(itemInfo) {
    axios.post(`/goodies`, { 
      main_img: itemInfo.main_img,
      item_type: itemInfo.item_type,
      color: itemInfo.color,
      size: itemInfo.size,
      claimed: itemInfo.claimed,
      confirmed: itemInfo.confirmed,
      brand: itemInfo.brand,
      info: itemInfo.info,
      extra_imgs: itemInfo.extra_imgs,
      posted_by: itemInfo.posted_by
    })
    .then(() => {
      console.log('successful POST request');
      this.componentDidMount();
    })
    .catch((err) => {
      console.log('ERROR ON CLAIM ITEM: ', err);
    });
  }

  render() {
    return (
      <div>
        <h1 onClick={() => {
          this.updateView('feed')
        }}>goodiewill</h1>
        <div className={style.navBar}>
          {/* <div className={style.searchBarContainer}> */}
            {/* <Search /> */}
            {/* <div>Search</div> */}
          {/* </div> */}
          {this.state.currentView !== 'addItem' && 
          (<div className={style.postBtnContainer}>
            <img 
              src='https://image.flaticon.com/icons/png/512/60/60745.png' 
              alt='upload'
              className={style.postBtn}
              onClick={() => {
                this.updateView('addItem')
              }}
            />
          </div>)}
        </div>
        {this.state.currentView === 'feed' && 
         (<Feed 
           items={this.state.feed1} 
           claim={this.claimItem} 
           next={this.state.feed2}/>
        )}
        {this.state.currentView === 'addItem' && 
         (<NewPost 
           add={this.addItem}/>
        )}
      </div>
    )
  }
}

export default App;
