import React from 'react';
import Listing from './Listing.jsx';
import style from '../style/style.css';

const Feed = (props) => (
  <div>
    <div className={style.feed}>
      {props.items.map((item) => (
        <Listing key={item.id} product={item} />
      ))}
    </div>
  </div>
)

export default Feed;