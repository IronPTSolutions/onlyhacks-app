import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, deleteUser } from '../../../services/UserService';

const UserList = () => {
  const [users, setUsers] = useState([]);
  //podriamos tener un estado que fuera needRefresh, que lo escuchara el useEffect que hace la petición para traerse TODOS los usuarios. Si cuando elimino un usuario cambio needRefresh, el useEffect lo escucha y se trae todos los usuarios con el que acabo de quitar eliminado

  // puede ser interesante importarse todo el servicio como UserService y acceder a los métodos creados, como UserService.list, UserService.create, UserService.detail

  const handleDelete = (id) => {
    deleteUser(id)
      .then(deletedUser => {
        const newUsers = users.filter(user => user.id !== deletedUser.id)
        setUsers(newUsers)
      })
  }

  useEffect(() => {
    getUsers()
      .then(usersData => {
        setUsers(usersData);
      })
  }, []);

  return (
    <ul className="list-group container mt-4">
      {users.map((user) => (
        <li key={user.id} className="mb-2 list-group-item d-flex justify-content-between align-items-center">
          <Link className="link-unstyled" to={`/users/${user.id}`}>
            {user.name}
          </Link >
          <div className="badge">
            <Link className="link-unstyled me-3" to={`/users/edit/${user.id}`}>
              <span className="badge badge-primary bg-primary badge-pill">Edit</span>
            </Link>
            <a onClick={() => handleDelete(user.id)} className="btn badge badge-danger text-light bg-danger badge-pill">Delete</a>
          </div>
        </li >
      ))
      }
    </ul >
  )
};

export default UserList;


// const UserList = () => {
//   const [users, setUsers] = useState([]) //useState es un hook que exporta un estado y una funcion modificadora del estado

//   //useEffect es un hook que recibe como primer parametro un callback, y como segundo parámetro un array de dependencias
//   useEffect(() => {
//     console.log('se ha montado mi componente!')
//     setUsers(usersData)

//     return () => {
//       console.log('aqui me destruyo')
//     }
//   }, [])

//   useEffect(() => {
//     if (users.length) {
//       console.log('ya tengo usuarios!')
//     }
//   }, [users]) // en nuestro array de dependencias, vamos a incluir todo aquello que el useEffect va a escuchar si está siendo cambiado o no, en caso de que sí se ejecutará el callback del useEffect

//   return (
//     <div>
//       {users.map(user => {
//         return (<div key={user.id}>{user.name}</div>)
//       })}
//     </div>
//   );
// };
