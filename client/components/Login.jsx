import React from 'react';
import style from '../style/style.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      placeholderPW: ''
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange(event, type) {
    if (type === 'email') {
      this.setState({
        email: event.target.value
      })
    } else if (type === 'password') {
      let pwCharCount = this.state.placeholderPW;
      pwCharCount += '*'
      this.setState({
        password: event.target.value,
        placeholderPW: pwCharCount
      })
    }
  }

  render() {
    return (
      <div className={style.loginBox}>
        <h4>Log In</h4>
          <form className={style.form}>
            <div>
              <label>
                Email: 
                <input type='text' 
                 value={this.state.email} 
                 onChange={(e) => {
                   this.onChange(e, 'email');
                 }}
                />
              </label>
            </div>
            <div>
              <label>
                Password: 
                <input type='text' 
                 value={this.state.placeholderPW} 
                 onChange={(e) => {
                   this.onChange(e, 'password');
                 }}
                />
              </label>
            </div>
            <div className={style.forgotPw}>
              Forgot password?
            </div>
            <button
             className={style.postItemBtn}
             onClick={() => {
               this.props.updateScreen('feed');
             }}
            >log in</button>
          </form>
      </div>
    )
  }
}

export default Login;