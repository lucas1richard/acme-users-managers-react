import React from 'react';
import { Link } from 'react-router';

const UserItem = ({ user, router, managers, handleChangeManager }) => {
  const { pathname } = router.location;
  return (
  <div className="panel panel-default">
    <div className="panel-heading">
    { user.name }
    </div>
    <div className="panel-body">
      { pathname === '/users' && 'managed by ' }
      { pathname === '/users' && <Link to="/users/edit">{ user.managerId ? managers.filter(manager => manager.id === user.managerId)[0].name : 'nobody' }</Link> }
      { pathname === '/users/edit' && (
      <div>
        <select className="form-control" value={user.managerId ? user.managerId : 'null'} onChange={ev => handleChangeManager(ev, user.id)}>
          <option value="null">Nobody</option>
          { managers.map(manager => <option key={manager.id} value={manager.id}>{manager.name}</option>) }
        </select>
        <Link to="/users">Cancel</Link>
      </div>
        ) }
    </div>
  </div>
)};

export default UserItem;
