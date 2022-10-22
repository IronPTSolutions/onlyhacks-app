import React from 'react';
import UserList from '../../components/users/UserList/UserList';
import { useAuthContext } from '../../contexts/AuthContext';
import './UsersScreen.css'

const UsersScreen = () => {
  const { user } = useAuthContext()

  return (
    <div>
      <h1>{user.name}</h1>
      <div className="jumbotron bg-dark text-light jumbotron-fluid p-4">
        <div className="container">
          <h1 className="display-4">Users screen</h1>
          <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
        </div>
      </div>
      <UserList />
    </div>
  );
};

export default UsersScreen;