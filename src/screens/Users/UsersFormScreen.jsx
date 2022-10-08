import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createUser, getDetail, updateUser } from '../../services/UserService';

const UsersFormScreen = ({ edit }) => {
  const [user, setUser] = useState({ email: '', name: '' })
  const { id } = useParams()

  useEffect(() => {
    if (edit) {
      getDetail(id)
        .then(user => setUser(user))
    }
  }, [id, edit])

  const handleOnChange = (event) => {
    const { name, value } = event.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const onSubmit = (event) => {
    event.preventDefault()

    if (edit) {
      updateUser(id, user).then(user => console.log(user))
    } else {
      createUser(user).then(user => console.log(user))
    }
  }

  //Another gÜey

  // setUser((prevState) => {
  //   return {
  //     ...prevState,
  //     [name]: value
  //   }
  // })

  console.log(user)

  return (
    <div className="container p-4" style={{ width: "400px" }}>
      <h1>{edit ? 'Update User!' : 'Create User!'}</h1>
      <form className="border p-4" onSubmit={onSubmit}>
        <div className="form-group mt-4">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input value={user.email} onChange={handleOnChange} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group mt-2 mb-4">
          <label htmlFor="exampleInputPassword1">Name</label>
          <input value={user.name} onChange={handleOnChange} name="name" type="text" className="form-control" id="exampleInputPassword1" placeholder="Name" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default UsersFormScreen;