import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, listUsers } from '../../../redux/index'
import { USER_DETAILS_RESET } from '../../../redux/user/UserTypes'
import LoadingBox from '../../utils/LoadingBox'
import MessageBox from '../../utils/MessageBox'

const UserList = (props) => {
   const dispatch = useDispatch()

   const userList = useSelector(state => state.userList)
   const { loading, error, users } = userList

   const userDelete = useSelector(state => state.userDelete)
   const { loading: loadingDelete, error: errorDelete, success: successDelete } = userDelete

   useEffect(() => {
      dispatch(listUsers())
      dispatch({
         type: USER_DETAILS_RESET,
      });
   }, [dispatch, successDelete])

   const deleteHandler = user => {
      if (window.confirm('Are you sure to delete?')) {
         dispatch(deleteUser(user._id));
      }
   }

   return (
      <div>
         <h1>Users</h1>
         { loadingDelete && <LoadingBox />}
         { errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
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
                                 <button onClick={() => props.history.push(`/admin/user/${user._id}/edit`)}>Edit</button>
                                 <button onClick={() => deleteHandler(user)}>Delete</button>
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
