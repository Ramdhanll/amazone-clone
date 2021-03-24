import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers } from '../../../redux/index'
import LoadingBox from '../../utils/LoadingBox'
import MessageBox from '../../utils/MessageBox'

const UserList = () => {
   const dispatch = useDispatch()
   const userList = useSelector(state => state.userList)
   const { loading, error, users } = userList

   useEffect(() => {
      dispatch(listUsers())
   }, [dispatch])
   
   return (
      <div>
         <h1>Users</h1>
         { 
            loading ? <LoadingBox/> :
            error ? <MessageBox variant="danger">{error}</MessageBox>:
            (
               <table className="table">
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>IS SELLER</th>
                        <th>IS ADMIN</th>
                        <th>ACTIONS</th>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        users.map(user => (
                           <tr key={user._id}>
                              <td>{user._id}</td>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.isSeller ? 'YES' : 'NO'}</td>
                              <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                              <td>
                                 <button>Edit</button>
                                 <button>Delete</button>
                              </td>
                           </tr>
                        ))
                     }
                  </tbody>
               </table>
            )
         }
      </div>
   )
}

export default UserList
