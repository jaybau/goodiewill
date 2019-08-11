import React from 'react';
import style from '../style/style.css';

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      claimed: false,
      hoverOver: false,
      showModal: false
    }

    this.handleHover = this.handleHover.bind(this);
  }

  handleHover() {
    let updateHoverOver = this.state.hoverOver ? false : true;
    this.setState({
      hoverOver: updateHoverOver
    })
  }

  handleClick() {
    let updateShowModal = this.state.showModal ? false : true;
    this.setState({
      showModal: updateShowModal
    })
  }

  render() {
    let itemLayover = (
      <div 
       className={style.itemInfo}
       onMouseOver={() => {
         
       }}
      >
        <ul>
          <li><span className={style.itemInfoText}>Type</span>: {this.props.product.item_type}</li>
          <li><span className={style.itemInfoText}>Size</span>: {this.props.product.size}</li>    
          <li><span className={style.itemInfoText}>Color</span>: {this.props.product.color}</li> 
          <li><span className={style.itemInfoText}>Brand</span>: {this.props.product.brands_id}</li> 
          <li><span className={style.itemInfoText}>Posted by</span>: {this.props.product.trader_id}</li>
        </ul>
      </div>
    )

    let imageModal = (
      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">{this.props.product.brands_id} {this.props.product.color} {this.props.product.item_type}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
            </div>
          <div class="modal-body">
            <img src={this.props.product.pic_url} alt='clothing'/>
          </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Claim</button>
            </div>
          </div>
        </div>
      </div>
    )

    return (
      <div>
        <div className={style.itemContainer}>
          <img 
            src={this.props.product.pic_url} 
            alt='clothing' 
            className={style.itemPic}
            onMouseOver={() => {
              this.handleHover();
            }}
            onMouseLeave={() => {
              this.handleHover();
            }}
            onClick={() => {
              this.handleClick();
            }}
            data-toggle="modal" 
            data-target="#exampleModalCenter"
          />
          {this.state.hoverOver && itemLayover}
        </div>
        {this.state.showModal && imageModal}
      </div>
    )
  }
}

export default Listing;