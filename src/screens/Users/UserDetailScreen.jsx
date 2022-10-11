import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetail } from '../../services/UserService';


const UserDetailScreen = () => {
  // esto es lo mismo que el destructuring de useParams ->  const { id } = useParams()
  // const params = useParams();
  // const id = params.id
  const [user, setUser] = useState({})
  const [date, setDate] = useState(new Date());
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    console.log("Executing initial useEffect // componentDidMount");
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      console.log("Unmounting user detail component");
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    getDetail(id)
      .then(user => {
        setUser(user)
      })
  }, [id, navigate])

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <div>
      <div className="jumbotron bg-dark text-light jumbotron-fluid p-4">
        <div className="container">
          <h1 className="display-4">Users Detail</h1>
          <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
          <hr />
          <h1>{user.name}</h1>
          <h2>{user.email}</h2>
          <p>{moment(date).format("HH:mm:ss")}</p>
        </div>
      </div>

    </div>
  );
};

export default UserDetailScreen;