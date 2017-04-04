import React from 'react';
import UserItem from './UserItem';

const Users = ({ users, router, managers, handleChangeManager }) => (
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
);

export default Users;
