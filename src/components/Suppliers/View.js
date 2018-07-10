import * as React from 'react';
import { connect } from 'react-redux';
import store from '../../rdx';
import { getSuppliersPage } from '../../rdx/user.rdx';

class Suppliers extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        store.dispatch(getSuppliersPage());
    }

    render() {
        const { suppliers, suppliersPagePending } = this.props;

        return (
            <div className={`content-container ${suppliersPagePending ? 'xloading' : ''}`}>
                <div className="block-content-wrapper">
                    <div className="container"> 
                        <div className="header">
                            <h4>Suppliers</h4>
                            <p>Viewing all suppliers' detail</p>
                        </div>
                        <div className="body">
                            <table className="table--cross">
                                <thead>
                                    <tr>
                                        <th>Supplier Code </th>
                                        <th>Supplier Name </th>
                                        <th>Status  </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {suppliers ? suppliers.map(sup => (
                                        <tr key={sup.id}>
                                            <td>{sup.code}</td>
                                            <td>{sup.name}</td>
                                            <td> 
                                            <div className="onoffswitch">
                                                <input className="onoffswitch-checkbox" id={`sw_${sup.id}`} type="checkbox" name={`sw_${sup.id}`} defaultChecked={!sup.del_flag} />
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
                            <div className="table-info">
                                { suppliers ? <p>Showing {suppliers.length} of {suppliers.length} entries</p> : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`loader-container ${suppliersPagePending ? 'xloading' : ''}`}>
                    <div className="svg-loader"></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    suppliers: state.user.suppliers,
    suppliersPagePending: state.user.suppliersPagePending
})

export default connect(mapStateToProps)(Suppliers);
