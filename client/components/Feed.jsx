import React from 'react';
import Listing from './Listing.jsx';
import style from '../style/style.css';
import Carousel from 'react-bootstrap/Carousel'

const Feed = (props) => (
  <Carousel 
   interval={null} 
   keyboard={true}
   nextIcon={<img src='https://cdn.iconscout.com/icon/free/png-256/right-chevron-1-458461.png' className={style.carouselArrow}/>}
   prevIcon={<img src='https://cdn.iconscout.com/icon/free/png-512/left-chevron-458460.png' className={style.carouselArrow}/>}
  >
    <Carousel.Item>
      <div className={style.feed}>
        {props.items.map((item) => (
          <Listing key={item.id} product={item} claimItem={props.claim}/>
        ))}
      </div>
    </Carousel.Item>
    {props.next.length > 0 && (<Carousel.Item>
      <div className={style.feed}>
        {props.next.map((item) => (
          <Listing key={item.id} product={item} claimItem={props.claim}/>
        ))}
      </div>
    </Carousel.Item>)}
    {/* <Carousel.Item>
      <div className={style.feed}>
        {props.items.map((item) => (
          <Listing key={item.id} product={item} />
        ))}
      </div>
    </Carousel.Item> */}
  </Carousel>
)

export default Feed;