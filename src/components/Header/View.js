import * as React from 'react';
import { Link } from 'react-router-dom';
import store from '../../rdx';
import { collapseSidebar } from '../../rdx/utils.rdx';

let isLoggedOut = false;

class Header extends React.Component {
    constructor(state, props) {
        super(state, props);
        this.state = {
            menuOpen: false
        };

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.collapsedSidebar = this.collapsedSidebar.bind(this);
    }

    onFocus() {
        this.setState({
            menuOpen: true
        })
    }
    onBlur() {
        setTimeout(() => {
            if (!isLoggedOut) {
                this.setState({
                    menuOpen: false
                })
            }
        }, 100)
    }
    onLogout() {
        isLoggedOut = true;
        this.props.onLogout();
    }
    collapsedSidebar() {
        store.dispatch(collapseSidebar());
    }

    render() {
        const { user } = this.props;

        return (
            <header>
                <nav className="nav nav--primary">
                    <span className="fa fa-bars nav--menu" onClick={this.collapsedSidebar}></span>
                    <Link to='/' className="nav--menu__title span-fa-text">
                        <span>GoQuo API System</span>
                    </Link>
                    <span className="nav--user-menu" >{user}
                        <input onFocusCapture={this.onFocus} onBlur={this.onBlur} />
                        <span className="span-fa-text fa fa-angle-down">
                    </span>
                    <div className={`${this.state.menuOpen ? 'open' : ''} nav--user-menu__dropdown`}>
                        <div className="nav--user--menu__dropdown__item" onClick={this.onLogout}>
                            <span className="fa fa-power-off"></span>
                            <span className="span-fa-text">Log out</span>
                        </div>
                    </div>
                    </span>
                </nav>
            </header>
        );
    };
}
export default Header;
