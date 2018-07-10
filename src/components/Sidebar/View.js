import * as React from 'react';
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <aside className="sidebar" id="sidebar">
            <div className="sidebar__container">
                <ul className="sidebar__items">
                    <li className="sidebar__item">
                        <Link className="sidebar__item__link" to="/">
                            <span className="fa fa-home">{' '}</span><span className="sidebar__item__text">Dashboard</span>
                        </Link>
                    </li>
                    <li className="sidebar__item">
                        <Link className="sidebar__item__link" to="/users">
                            <span className="fa fa-user-circle"></span>
                            <span className="sidebar__item__text">Users</span>
                        </Link>
                    </li>
                    <li className="sidebar__item">
                        <Link className="sidebar__item__link" to="/suppliers">
                            <span className="fa fa-users"></span><span className="sidebar__item__text">Suppliers</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;
