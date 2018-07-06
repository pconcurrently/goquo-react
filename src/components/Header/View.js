import * as React from 'react';

const Header = () => {
    return (
        <header>
            <nav className="nav nav--primary">
                <span className="fa fa-bars nav--menu" data-toggle="sidebar" data-toggle-target="#sidebar">
                    <span className="nav--menu__title">GoQuo API System</span>
                </span>
                <span className="nav--user-menu">admin@goquo.com 
                    <span className="fa fa-sort-down"></span>
                </span>
            </nav>
        </header>
    );
}

export default Header;
