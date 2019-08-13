import React from 'react';
import style from '../style/style.css';

const Pending = (props) => (
  <div className={style.mailBox}>
    {props.requests.map((claim) => (
      <div className={style.request} key={claim.id}>
        <div className={style.inboxImgContainer}>
          <img src={claim.main_img} alt='item' className={style.inboxImg}/>
        </div>
        <div className={style.inboxImgInfo}>
          {claim.brand} {claim.item_type}
        </div>
        <div>
          <div className={style.pendingClaimInfo}>
            Claimed by {claim.shopper_id}
          </div>
          <div className={style.pendingClaimInfo}>
            Reach out via {claim.preferred_contact}
          </div>
        </div>
        <div className={style.confirmBtnContainer}>
          <button 
           className={style.confirmBtn}
           onClick={() => {
             props.confirm(claim.id, true);
           }}>
             confirm
           </button>
        </div>
      </div>
    ))}
  </div>
)

export default Pending;