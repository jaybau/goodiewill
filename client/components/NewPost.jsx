import React from 'react';
import style from '../style/style.css';

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      main_img: '',
      item_type: '',
      color: '',
      size: '',
      brand: '',
      info: '',
      extraImgOne: '',
      extraImgTwo: '',
      posted_by: 2,
      showPhotoSlot2: false,
      showPhotoSlot3: false
    }

    this.onChange = this.onChange.bind(this);
    this.showNextPhotoSlot = this.showNextPhotoSlot.bind(this);
    this.submitNewItem = this.submitNewItem.bind(this);
  }

  onChange(event, type) {
    console.log(event.target.value);
    if (type === 'type') {
      this.setState({
        item_type: event.target.value
      })
    } else if (type === 'color') {
      this.setState({
        color: event.target.value
      })
    } else if (type === 'size') {
      this.setState({
        size: event.target.value
      })
    } else if (type === 'brand') {
      this.setState({
        brand: event.target.value
      })
    } else if (type === 'info') {
      this.setState({
        info: event.target.value
      })
    } else if (type === 'main') {
        this.setState({
          main_img: event.target.value
        })
    } else if (type === 'extra1') {
      this.setState({
        extraImgOne: event.target.value
      })
    } else if (type === 'extra2') {
      this.setState({
        extraImgTwo: event.target.value
      })
    } 
  }

  showNextPhotoSlot(num) {
    if (num === 2) {
      this.setState({
        showPhotoSlot2: true
      })
    } else if (num === 3) {
      this.setState({
        showPhotoSlot3: true
      })
    }
  }

  submitNewItem() {
    let extra_imgs = [];
    
    if (this.state.extraImgOne !== '') {
      extra_imgs.push(this.state.extraImgOne);
    }

    if (this.state.extraImgTwo !== '') {
      extra_imgs.push(this.state.extraImgTwo);
    }

    let item = {
      main_img: this.state.main_img,
      item_type: this.state.item_type,
      color: this.state.color,
      size: this.state.size,
      claimed: false,
      confirmed: false,
      brand: this.state.brand,
      info: this.state.info,
      extra_imgs: extra_imgs,
      posted_by: this.state.posted_by
    };

    this.props.add(item);
  }

  render() {
    return (
      <div>
        <div>
          <h4>Post New Item</h4>
          <form className={style.form}>
            <div>
              <label>
                Type of Clothing: 
                <input type='text' 
                 value={this.state.item_type} 
                 onChange={(e) => {
                   this.onChange(e, 'type');
                 }}
                />
              </label>
            </div>
            <div>
              <label>
                Color: 
                <input type='text' 
                 value={this.state.color} 
                 onChange={(e) => {
                   this.onChange(e, 'color');
                 }}
                />
              </label>
            </div>
            <div>
              <label> 
                Size: 
                <select 
                 value={this.state.size}
                 onChange={(e) => {
                    this.onChange(e, 'size');
                 }}>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                Brand: 
                <input type='text' 
                 value={this.state.brand} 
                 onChange={(e) => {
                   this.onChange(e, 'brand');
                 }}
                />
              </label>
            </div>
            <div>
              <label>
                Additional Info: 
                <div className={style.additionalInfo}>
                  <textarea 
                    value={this.state.info} 
                    onChange={(e) => {
                    this.onChange(e, 'info');
                    }}
                    className={style.formInfo}
                  /> 
                </div>
              </label>
            </div>
            <div>
              <label>
                Picture #1: 
                <input type='text' 
                 value={this.state.main_img} 
                 onChange={(e) => {
                   this.onChange(e, 'main');
                 }}
                />
              </label>
            </div>
            {!this.state.showPhotoSlot2 && 
             (<div>
                <button 
                 className={style.addPhotoBtn}
                 onClick={() => {
                  this.showNextPhotoSlot(2);
                 }}
                >add another photo</button>
              </div>)}
            {this.state.showPhotoSlot2 && 
             (<div>
              <label>
                Picture #2: 
                <input type='text' 
                 value={this.state.extraImgOne} 
                 onChange={(e) => {
                   this.onChange(e, 'extra1');
                 }}
                />
              </label>
             </div>)}
            {(!this.state.showPhotoSlot3 && this.state.showPhotoSlot2) && 
             (<div>
                <button 
                 className={style.addPhotoBtn}
                 onClick={() => {
                  this.showNextPhotoSlot(3);
                 }}
                >add another photo</button>
              </div>)}
            {this.state.showPhotoSlot3 && 
             (<div>
              <label>
                Picture #3: 
                <input type='text' 
                 value={this.state.extraImgTwo} 
                 onChange={(e) => {
                   this.onChange(e, 'extra2');
                 }}
                />
              </label>
            </div>)}
            <button
             className={style.postItemBtn}
             onClick={() => {
              this.submitNewItem();
            }}>post</button>
          </form>
        </div>
      </div>
    )
  }
}

export default NewPost;