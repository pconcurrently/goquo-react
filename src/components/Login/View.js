import * as React from 'react';
import { connect } from 'react-redux';

import store from '../../rdx';
import { login } from '../../rdx/user.rdx';

class Login extends React.Component {
    constructor(state, props) {
        super(state, props);

        this.state = {
            username: '',
            password: '',
            emailError: ''
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resetError = this.resetError.bind(this);
    }

    handleLogin(e) {
        e.preventDefault();
 
        const email_regex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
        const emailValid = this.state.username.length && email_regex.test(this.state.username.toLowerCase());
        if (!emailValid) {
            this.setState({
                emailError: 'Please provide a valid email.'
            })
        }
        
        const passwordValid = this.state.password.length;
        if (!passwordValid) {
            this.setState({
                passwordError: 'Please enter password.'
            })
        }

        if (emailValid && passwordValid) {
            store.dispatch(login(this.state.username, this.state.password));
        } 
        return;
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    resetError() {
        this.setState({
            emailError: '',
            passwordError: ''
        })
    }

    render() {
        const { error } = this.props;
        
        return (
            <div className="login-container">
                <div className="login-form">
                    <div className="login-form__intro">
                        <div className="container">
                            <h2>GoQuo</h2>
                            <p>Empowering real time ancillary revenue</p>
                        </div>
                    </div>
                    <form className="login-form__form" onSubmit={this.handleLogin}>
                        <p className="form--error-message">{error}</p>
                        <h4>Sign in to Your Account</h4>
                        <div className="form--block">
                            <label className="form--label">Email:</label>
                            <input 
                                value={this.state.username} 
                                name="username" 
                                type="text" 
                                className="input input--block" 
                                placeholder="Enter your email address" 
                                onChange={this.handleChange}
                                onFocus={this.resetError}
                                autoFocus 
                            />
                            <p className="form--error-message">{this.state.emailError}</p>
                        </div>
                        <div className="form--block">
                            <label className="form--label">Password:</label>
                            <input 
                                value={this.state.password} 
                                name="password" type="password" 
                                className="input input--block" 
                                placeholder="Enter your password" 
                                onChange={this.handleChange}
                                onFocus={this.resetError}
                            />
                            <p className="form--error-message">{this.state.passwordError}</p>
                        </div>
                        <div className="form--block"><a className="form--link" href="#">Reset your password</a></div>   
                        <input className="btn btn--primary btn--block" type="submit" value="Sign In" />
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    error: state.user.errorMessage
});

export default connect(mapStateToProps)(Login);
