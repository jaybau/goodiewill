import React from 'react';
import style from '../style/style.css';
import Pending from './Pending.jsx';
import Confirmations from './Confirmations.jsx';

class Inbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'pending',
      pendingBackgroundColor: '#000',
      pendingTextColor: '#fff',
      confirmBackgroundColor: '#fff',
      confirmTextColor: '#000'
    }

    this.updateCurrentView = this.updateCurrentView.bind(this);
  }
  
  updateCurrentView(type) {
    if (type === 'pending') {
      this.setState({
        currentView: type,
        pendingBackgroundColor: '#000',
        pendingTextColor: '#fff',
        confirmBackgroundColor: '#fff',
        confirmTextColor: '#000'
      })
    } else if (type === 'confirmed') {
      this.setState({
        currentView: type,
        pendingBackgroundColor: '#fff',
        pendingTextColor: '#000',
        confirmBackgroundColor: '#000',
        confirmTextColor: '#fff'
      })
    }
  }

  render() {
    return (
      <div className={style.inbox}>
        <div className={style.inboxBtnContainers}>
          <div className={style.inboxBtn}
          onClick={() => {
            this.updateCurrentView('pending');
          }}
          style={{
            backgroundColor: this.state.pendingBackgroundColor,
            color: this.state.pendingTextColor
          }}>pending</div>
          <div className={style.inboxBtn}
          onClick={() => {
            this.updateCurrentView('confirmed');
          }}
          style={{
            backgroundColor: this.state.confirmBackgroundColor,
            color: this.state.confirmTextColor
          }}>confirmed</div>
        </div>

        {(this.state.currentView === 'pending' && this.props.requests.length > 0) &&
         (<Pending requests={this.props.requests} confirm={this.props.confirm}/>)}

        {(this.state.currentView === 'confirmed' && this.props.confirmations.length > 0) && 
         (<Confirmations confirmations={this.props.confirmations}/>)}
      </div>
    )
  }
}

export default Inbox;