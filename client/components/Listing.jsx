import React from 'react';
import style from '../style/style.css';

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      claimed: this.props.product.claimed,
      hoverOver: false,
      showModal: false,
      viewedItem: {}
    }

    this.handleClick = this.handleClick.bind(this);
    this.submitClaim = this.submitClaim.bind(this);
  }

  handleClick(item) {
    let updateShowModal = this.state.showModal ? false : true;
    console.log(item);
    this.setState({
      showModal: updateShowModal,
      viewedItem: item
    })
  }

  submitClaim() {
    let updatedClaim = this.state.claimed ? false : true;
    this.setState({
      claimed: updatedClaim
    })
    this.props.claimItem(this.props.product, updatedClaim);
  }

  render() {
    let imageOverlay = (
      <div className={style.imgOverlay}>
        <div>swapped</div>
      </div>
    )

    let imageModal = (
      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">
                   {this.state.viewedItem.brand} {this.state.viewedItem.color} {this.state.viewedItem.item_type}
                   {this.state.claimed && (<span className={style.claimed}>PENDING</span>)}
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                 onClick={() => {
                   this.handleClick({});
                 }}>
                  <span aria-hidden="true">&times;</span>
                </button>
            </div>
          <div className="modal-body">
            <div>
              <div className={style.bodyContainer}>
                <div className={style.sideImgContainer}>
                  {this.props.product.extra_imgs[0] !== '' && this.props.product.extra_imgs.map((url, index) => (
                    <img src={url} alt={this.props.product.item_type} className={style.sideImg} key={index}/>
                  ))}
                </div>
                <div className={style.mainImgContainer}>
                  <img src={this.state.viewedItem.main_img} alt='clothing' className={style.mainImg}/>
                </div>
                <div>
                  <ul>
                    <li><span className={style.itemInfoText}>Item</span>: {this.state.viewedItem.item_type}</li>
                    <li><span className={style.itemInfoText}>Size</span>: {this.state.viewedItem.size}</li>    
                    <li><span className={style.itemInfoText}>Color</span>: {this.state.viewedItem.color}</li> 
                    <li><span className={style.itemInfoText}>Brand</span>: {this.state.viewedItem.brand}</li> 
                    <li><span className={style.itemInfoText}>Posted by</span>: {this.state.viewedItem.name}</li>
                    <li><span className={style.itemInfoText}>Notes</span>: {this.state.viewedItem.info}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal"
               onClick={() => {
                 this.handleClick({});
               }}
              >close</button>
              <button type="button" className="btn btn-primary" 
               onClick={() => {
                 this.submitClaim();
               }}>claim</button>
            </div>
          </div>
        </div>
      </div>
    )

    return (
      <div>
        <div className={style.itemContainer}>
          <img 
            src={this.props.product.main_img} 
            alt='clothing' 
            className={style.itemPic}
            onClick={() => {
              this.handleClick(this.props.product);
            }}
            data-toggle="modal" 
            data-target="#exampleModalCenter"
          />
          {this.state.claimed && imageOverlay}
        </div>
        {this.state.showModal && imageModal}
      </div>
    )
  }
}

export default Listing;