import React from 'react';
import style from '../style/style.css';

const Confirmations = (props) => (
  <div className={style.mailBox}>
    {props.confirmations.map((request) => (
      <div className={style.request} key={request.id}>
        <div className={style.inboxImgContainer}>
          <img src={request.main_img} alt='item' className={style.inboxImg}/>
        </div>
        <div className={style.inboxImgInfo}>
          {request.brand} {request.item_type}
        </div>
        <div>
          <div className={style.pendingClaimInfo}>
            Claimed by {request.shopper_id}
          </div>
          <div className={style.pendingClaimInfo}>
            Reach out via {request.preferred_contact}
          </div>
        </div>
        <div className={style.confirmedBtnContainer}>
          <div className={style.confirmedBtn}>confirmed</div>
        </div>
      </div>))}
  </div>
)

export default Confirmations;