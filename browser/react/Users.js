import React from 'react';
import UserItem from './UserItem';

const Users = ({ users, router, handleChangeManager }) => {
  const managers = users.filter(user => user.isManager);

  return (
  <div>
    { users.map(user =>
      <UserItem
        key={user.id}
        user={ user }
        router= { router }
        managers={ managers }
        handleChangeManager={ handleChangeManager }
      />) }
  </div>
)};

export default Users;
