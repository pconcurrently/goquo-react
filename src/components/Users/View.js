import * as React from 'react';

const Users = () => {
    return (
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
                    <tr>
                        <td>DOTW </td>
                        <td>dotw@goquo.com</td>
                        <td> <a className="btn btn--transparent" href="./edit-user.html"><span className="fa fa-save"></span><span className="span-fa-text">Edit</span></a></td>
                    </tr>
                    <tr>
                        <td>DOTW </td>
                        <td>dotw@goquo.com</td>
                        <td> <a className="btn btn--transparent" href="./edit-user.html"><span className="fa fa-save"></span><span className="span-fa-text">Edit</span></a></td>
                    </tr>
                </tbody>    
              </table>
              <div className="table-info">
                <p>Showing 2 of 2 entries</p>
              </div>
            </div>
          </div>
    );
}

export default Users;
