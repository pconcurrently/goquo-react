import * as React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import store from '../../../rdx';
import {
    getUserSuppliers,
    pendingUserSuppliersPage,
    pendingEditUserButton,
    submitMarkup,
    switchUserSupplierStatus,
    getSuppliersPage,
    addSupplierToUser,
    setSingleMarkup
} from '../../../rdx/user.rdx';
import {
    setInterval,
    clearInterval
} from 'timers';

class EditUser extends React.Component {
    constructor(props) {
        let interval;

        super(props);
        this.state = {
            name: '',
            email: '',
            setMarkupTriggered: false,
            addSupplierTriggered: false,
            markup: '',
            supplier: '',
            popover: {},
            singlemarkup: ''
        };

        this.triggerSetMarkup = this.triggerSetMarkup.bind(this);
        this.triggerAddSupplier = this.triggerAddSupplier.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitMarkup = this.submitMarkup.bind(this);
        this.switchStatus = this.switchStatus.bind(this);
        this.submitAddSupplier = this.submitAddSupplier.bind(this);
    }

    componentWillMount() {
        store.dispatch(pendingUserSuppliersPage());
        const parsed = queryString.parse(location.search);
        if (!(parsed.name && parsed.email)) {
            window.location.href = "/users";
        }
        this.setState({
            name: parsed.name,
            email: parsed.email
        });

        if (!this.props.suppliers) {
            store.dispatch(getSuppliersPage());
        }

        store.dispatch(getUserSuppliers(this.props.match.params["id"]));

        this.interval = setInterval(() => {
            if (this.props.suppliers && this.props.suppliers.length && this.props.supplierIds) {
                let supplier;
                this.props.suppliers.every(sup => {
                    if (this.props.supplierIds.indexOf(sup.id) === -1) {
                        supplier = sup.id.toString();
                        this.setState({
                            supplier
                        });
                        clearInterval(this.interval);
                        return false;
                    }
                    return true;
                }) 
            }
        }, 1000);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.editUserPending.setMarkup && this.state.setMarkupTriggered) {
            this.setState({
                setMarkupTriggered: false,
                markup: ''
            })
        }
        if (!nextProps.editUserPending.setSingleMarkup && Object.keys(this.state.popover).length) {
            this.setState({
                setSingleMarkupTriggered: false,
                popover: {},
                singlemarkup: ''
            })
        }
        if (!nextProps.editUserPending.addSupplier && this.state.addSupplierTriggered) {
            this.setState({
                addSupplierTriggered: false
            })
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    triggerSetMarkup() {
        this.setState({
            setMarkupTriggered: !this.state.setMarkupTriggered,
            addSupplierTriggered: false
        });
    }
    triggerAddSupplier() {
        this.setState({
            addSupplierTriggered: !this.state.addSupplierTriggered,
            setMarkupTriggered: false
        });
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submitMarkup() {
        if (this.state.markup >= 0 && this.state.markup <= 100) {
            store.dispatch(pendingEditUserButton('setMarkup'));

            store.dispatch(submitMarkup(this.state.markup, this.state.email));
        }
    }
    setSingleMarkup(supplierCode) {
        store.dispatch(pendingEditUserButton('setSingleMarkup'));

        store.dispatch(setSingleMarkup(supplierCode, this.state.singlemarkup, this.state.email));
    }
    switchStatus(e, code) {
        store.dispatch(switchUserSupplierStatus(code, e.target.checked, this.state.email));
    }
    submitAddSupplier() {
        store.dispatch(pendingEditUserButton('addSupplier'));

        store.dispatch(addSupplierToUser(this.state.supplier, this.props.match.params["id"]));
    }
    popEditPopover(id) {
        const popover = { [id]: true};
        this.setState({
            popover
        });
    }

    render() {
        const {
            editUserPagePending,
            userSuppliers,
            editUserPending,
            suppliers,
            supplierIds,
            collapsed
        } = this.props;

        return (
            <div className={`content-container ${editUserPagePending ? 'xloading' : ''} ${collapsed ? 'extend' : ''}`}>
                <div className="block-content-wrapper">
                    <div className="container">
                        <div className="header">
                            {this.state.name ? <h4>User: {this.state.name}</h4> : null}
                            {this.state.email ? <h4>Email: {this.state.email}</h4> : null}
                            <div className="action-button-containers">
                                <button className="btn btn--sm btn--info" style={{"marginRight": "4px"}} onClick={this.triggerAddSupplier}>
                                    <span className="fa fa-plus"></span>
                                    <span className="span-fa-text">Add Supplier</span>
                                </button>
                                <button className="btn btn--sm btn--info-2" onClick={this.triggerSetMarkup}>
                                    <span className="fa fa-cog"></span>
                                    <span className="span-fa-text">Set Markup</span>
                                </button>
                            </div>
                            <div className={`info-wrapper ${this.state.setMarkupTriggered ? 'open' : ''}`}>
                                <div className={`container--info`}>
                                    <label>Please enter markup value for all suppliers</label>
                                    <input className="input" disabled={editUserPending.setMarkup} type="number" name="markup" value={this.state.markup} onChange={this.handleChange} autoFocus/>
                                    <div className="button-containers">
                                    <button 
                                        className={`btn btn--info ${editUserPending.setMarkup ? 'btn__loading' : ''}`} 
                                        onClick={this.submitMarkup}
                                    >
                                        <span className="fa fa-save"></span>
                                        <span className="span-fa-text">Save</span>
                                    </button>
                                    <button className="btn btn--danger" onClick={this.triggerSetMarkup}>
                                        <span className="fa fa-close"></span>
                                        <span className="span-fa-text">Cancel</span>
                                    </button>
                                    </div>
                                </div>
                            </div>
                            <div className={`info-wrapper ${this.state.addSupplierTriggered ? 'open' : ''}`}>
                                <div className={`container--info`}>
                                    <label>Please choose supplier to add to current user</label>
                                    <select 
                                        className="select suppliers-select"
                                        name="supplier"
                                        onChange={this.handleChange}
                                    >
                                        {suppliers && supplierIds ? suppliers.map(sup => {
                                            if (supplierIds.indexOf(sup.id) === -1) {
                                                return <option value={sup.id} key={sup.id} defaultValue={this.state.supplier}>{sup.name}</option>;
                                            }
                                        }) : null}
                                    </select>
                                    <div className="button-containers">
                                    <button 
                                        className={`btn btn--info ${editUserPending.addSupplier ? 'btn__loading' : ''}`}
                                        onClick={this.submitAddSupplier}
                                    >
                                        <span className="fa fa-save"></span>
                                        <span className="span-fa-text">Save</span>
                                    </button>
                                    <button className="btn btn--danger" onClick={this.triggerAddSupplier}>
                                        <span className="fa fa-close"></span>
                                        <span className="span-fa-text">Cancel</span>
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="body body__table">
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
                                            <td className="markup-popover__container"> 
                                                <span>{`${sup.markup_percent}% `}</span>
                                                <button className="btn btn--info-2" onClick={() => this.popEditPopover(sup.id)}>
                                                    <span className="fa fa-edit"></span>
                                                    <span className="span-fa-text">Edit</span>
                                                    <span className="fa fa-chevron-down span-fa-text"></span>
                                                </button>
                                                <div className={`markup-popover ${this.state.popover[sup.id] ? 'open' : ''}`}>
                                                    <h4>Markup percentage</h4>
                                                    <input 
                                                        className="input" 
                                                        name="singlemarkup" 
                                                        type="number"
                                                        value={this.state.singlemarkup}
                                                        onChange={this.handleChange}
                                                    />
                                                    <a 
                                                        className={`btn btn--info ${editUserPending.setSingleMarkup ? 'btn__loading' : ''}`} 
                                                        onClick={() => this.setSingleMarkup(sup.code)}
                                                    >
                                                        <span className="fa fa-save"></span>
                                                        <span className="span-fa-text">Save</span>
                                                    </a>
                                                </div>
                                                <div className="markup-popover__overlay" onClick={() => this.setState({ popover: {} })}></div>
                                            </td>
                                            <td> 
                                            <div className="onoffswitch">
                                                <input 
                                                    className="onoffswitch-checkbox" 
                                                    id={`sw_${sup.id}`} 
                                                    type="checkbox" 
                                                    name={`sw_${sup.id}`} 
                                                    defaultChecked={!sup.inactive} 
                                                    onChange={(e) => this.switchStatus(e, sup.code)}
                                                />
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
    userSuppliers: state.user.userSuppliers,
    editUserPending: state.user.editUserPending,
    suppliers: state.user.suppliers,
    supplierIds: state.user.supplierIds,
    collapsed: state.utils.sidebarCollapsed
})

export default connect(mapStateToProps)(EditUser);
