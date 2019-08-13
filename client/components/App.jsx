import React from 'react';
import Feed from './Feed.jsx';
import NewPost from './NewPost.jsx';
import Inbox from './Inbox.jsx';
import Login from './Login.jsx';
import axios from 'axios';
import style from '../style/style.css';
import inboxData from '../data/inboxData.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feed1: [],
      feed2: [],
      feed3: [],
      pending: inboxData.pendingData,
      confirmed: inboxData.confirmationsData,
      currentView: 'login'
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateView = this.updateView.bind(this);
    this.claimItem = this.claimItem.bind(this);
    this.confirmItem = this.confirmItem.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  componentDidMount() {
    fetch('/goodies')
    .then((res) => res.json())
    .then((results) => {
      this.setState({
        feed1: results.slice(0,6),
        feed2: results.slice(6,12),
        feed3: results.slice(12),
        showMenu: false
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

  claimItem(item, wasClaimed) {
    let pendingList = this.state.pending;
    pendingList.push(item);

    this.setState({
      pending: pendingList
    })

    let itemId = item.id;

    axios.patch(`/goodies/claim/${itemId}`, { claimed: wasClaimed })
    .then(() => {
      console.log('successful PATCH request');
    })
    .catch((err) => {
      console.log('ERROR ON CLAIM ITEM: ', err);
    });
  }

  confirmItem(itemId, wasConfirmed) {
    let pendingList = this.state.pending;
    let confirmedList = this.state.confirmed;

    for (let i = 0; i < pendingList.length; i++) {
      if (pendingList[i].id === itemId) {
        confirmedList.push(pendingList[i]);
        pendingList.splice(i, 1);
      }
    }

    this.setState({
      pending: pendingList,
      confirmed: confirmedList
    })

    // axios.patch(`/goodies/confirm/${itemId}`, { confirmed: wasConfirmed })
    // .then(() => {
    //   console.log('successful PATCH request');
    // })
    // .catch((err) => {
    //   console.log('ERROR ON CLAIM ITEM: ', err);
    // });
  }

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
        <div>
          <div className={style.navBar}>
            <div className={style.menuBtnContainer}>
              <div>
                <img src='https://icon-library.net/images/account-icon-png/account-icon-png-1.jpg'
                 alt='profileIcon'
                 className={style.profileBtn}
                 onClick={() => {
                   this.updateView('login');
                 }}/>
                <img src='https://img.icons8.com/carbon-copy/2x/important-mail.png'
                 alt='inboxIcon' 
                 className={style.mailBtn}
                 onClick={() => {
                   this.updateView('inbox');
                 }}/>
                <img src='http://www.myiconfinder.com/uploads/iconsets/37736f35fd7d98b10b35287679b223b8.png'
                 alt='postIcon' 
                 className={style.postBtn}
                 onClick={() => {
                   this.updateView('addItem');
                 }}/>
              </div>
            </div>
            <h1 onClick={() => {
              this.updateView('feed')
            }}>goodiewill</h1>
          </div>
        </div>

        {this.state.currentView === 'feed' && 
         (<div className={style.feedContainer}>
           <Feed 
           items={this.state.feed1} 
           claim={this.claimItem} 
           next={this.state.feed2}/>
          </div>
        )}

        {this.state.currentView === 'addItem' && 
         (<NewPost 
           add={this.addItem}/>
        )}

        {this.state.currentView === 'inbox' &&
         (<Inbox
           confirm={this.confirmItem}
           requests={this.state.pending}
           confirmations={this.state.confirmed}/>
        )}

        {this.state.currentView === 'login' &&
         (<Login updateScreen={this.updateView}/>
        )}
        
        <div className={style.copyright}>&copy; 2019 jbau</div>
      </div>
    )
  }
}

export default App;