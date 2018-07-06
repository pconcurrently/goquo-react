import * as React from 'react';
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <aside className="sidebar" id="sidebar">
            <div className="sidebar__container">
                <ul className="sidebar__items">
                    <li className="sidebar__item"><a className="sidebar__item__link" href="./">
                        <span className="fa fa-home">{' '}</span><span className="sidebar__item__text">Dashboard</span></a>
                    </li>
                    <li className="sidebar__item">
                        <a className="sidebar__item__link" href="/users">
                            <span className="fa fa-user-circle"></span>
                            <span className="sidebar__item__text">Users</span>
                        </a>
                    </li>
                    <li className="sidebar__item">
                        <a className="sidebar__item__link" href="/suppliers">
                            <span className="fa fa-users"></span><span className="sidebar__item__text">Suppliers</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;
