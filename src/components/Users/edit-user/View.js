import * as React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import store from '../../../rdx';
import { getUserSuppliers, pendingUserSuppliersPage } from '../../../rdx/user.rdx';

class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: ''
        };
    }

    componentWillMount() {
        store.dispatch(pendingUserSuppliersPage());
        const parsed = queryString.parse(location.search);
        this.setState({
            name: parsed.name,
            email: parsed.email
        });

        store.dispatch(getUserSuppliers(this.props.match.params["id"]));
    }

    render() {
        const { editUserPagePending, userSuppliers } = this.props;

        return (
            <div className={`content-container ${editUserPagePending ? 'xloading' : ''}`}>
                <div className="block-content-wrapper">
                    <div className="container">
                        <div className="header">
                            {this.state.name ? <h4>User: {this.state.name}</h4> : null}
                            {this.state.email ? <h4>Email: {this.state.email}</h4> : null}
                            <button className="btn btn--sm btn--info"> <span className="fa fa-plus"></span><span className="span-fa-text">Add Supplier</span></button>
                            <button className="btn btn--sm btn--info-2"><span className="fa fa-cog"></span><span className="span-fa-text">Set Markup</span></button>
                            <div className="container--info">
                                <label>Please choose supplier to add to current user</label>
                                <input className="input"/>
                                <div className="button-containers">
                                <button className="btn btn--info"><span className="fa fa-save"></span><span className="span-fa-text">Save</span></button>
                                <button className="btn btn--danger"><span className="fa fa-close"></span><span className="span-fa-text">Cancel</span></button>
                                </div>
                            </div>
                        </div>
                        <div className="body">
                            <table className="table--cross">
                                <thead>
                                    <tr>
                                        <th>Supplier Code </th>
                                        <th>Supplier Name </th>
                                        <th>Markup </th>
                                        <th>Status </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userSuppliers ? userSuppliers.map(sup => (
                                        <tr key={sup.id}>
                                            <td>{sup.code}</td>
                                            <td>{sup.name}</td>
                                            <td> 
                                                <span>{`${sup.markup_percent}% `}</span>
                                                <button className="btn btn--info-2">
                                                    <span className="fa fa-save"></span>
                                                    <span className="span-fa-text">Edit</span>
                                                    <span className="fa fa-chevron-down span-fa-text"></span>
                                                </button>
                                            </td>
                                            <td> 
                                            <div className="onoffswitch">
                                                <input className="onoffswitch-checkbox" id={`sw_${sup.id}`} type="checkbox" name={`sw_${sup.id}`} defaultChecked={!sup.inactive} />
                                                <label className="onoffswitch-label" htmlFor={`sw_${sup.id}`}>
                                                    <span className="onoffswitch-inner"></span>
                                                    <span className="onoffswitch-switch"></span>
                                                </label>
                                            </div>
                                            </td>
                                        </tr>
                                    )) : null}
                                </tbody>
                            </table>
                            {userSuppliers && !userSuppliers.length ? <p>No record available</p> : null}
                            <div className="table-info">
                                <p>Showing {userSuppliers.length} of {userSuppliers.length} entries</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`loader-container ${editUserPagePending ? 'xloading' : ''}`}>
                    <div className="svg-loader"></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    editUserPagePending: state.user.editUserPagePending,
    userSuppliers: state.user.userSuppliers
})

export default connect(mapStateToProps)(EditUser);
