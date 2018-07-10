import * as React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import store from '../../rdx';
import { getUsersPage } from '../../rdx/user.rdx';

class Users extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        store.dispatch(getUsersPage());
    }

    render() {
        const { users, usersPagePending, match } = this.props;

        return (
            <div className={`content-container ${usersPagePending ? 'xloading' : ''}`}>
                <div className="block-content-wrapper">
                    <div className="container"> 
                        <div className="header">
                            <h4>Users</h4>
                            <p>Viewing all users' detail</p>
                        </div>
                        <div className="body">
                            <table className="table--cross">
                                <thead>
                                    <tr>
                                    <th>Name</th>
                                    <th>Email </th>
                                    <th>Action  </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users ? users.map(u => (
                                        <tr key={u.id}>
                                            <td>{u.name}</td>
                                            <td>{u.email}</td>
                                            <td>
                                                <Link 
                                                    className="btn btn--transparent" 
                                                    to={`${match.path}/${u.id}?name=${u.name}&email=${u.email}`}
                                                >
                                                    <span className="fa fa-save"></span>
                                                    <span className="span-fa-text">Edit</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    )): null}
                                </tbody>    
                            </table>
                            <div className="table-info">
                                { users ? <p>Showing {users.length} of {users.length} entries</p> : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`loader-container ${usersPagePending ? 'xloading' : ''}`}>
                    <div className="svg-loader"></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    users: state.user.users,
    usersPagePending: state.user.usersPagePending
})

export default withRouter(connect(mapStateToProps)(Users));
