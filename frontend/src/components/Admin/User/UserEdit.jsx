import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, updateUser } from '../../../redux/index'
import { USER_UPDATE_RESET } from '../../../redux/user/UserTypes'
import LoadingBox from '../../utils/LoadingBox'
import MessageBox from '../../utils/MessageBox'

const UserEdit = (props) => {
   const dispatch = useDispatch()
   const userId = props.match.params.id

   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [isSeller, setIsSeller] = useState(false)
   const [isAdmin, setIsAdmin] = useState(false)

   const userDetails = useSelector(state => state.userDetails)
   const { loading, error, user } = userDetails

   const userUpdate = useSelector(state => state.userUpdate)
   const { loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdate

   useEffect(() => {
      if (successUpdate) {
         dispatch({ type: USER_UPDATE_RESET })
         props.history.push('/admin/userlist')
      }

      if (!user) {
         dispatch(detailsUser(userId))
      } else {
         setName(user.name)
         setEmail(user.email)
         setIsSeller(user.isSeller)
         setIsAdmin(user.isAdmin)
      }

   }, [dispatch, props.history, successUpdate, user, userId])

   const submitHandler = e => {
      e.preventDefault()

      dispatch(updateUser({_id: userId, name, email, isSeller, isAdmin}))
   }

   return (
      <div>
         <form className="form" onSubmit={submitHandler}>
            <div>
               <h1>Edit User {name}</h1>
               { loadingUpdate && <LoadingBox /> }
               { errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
            </div>
            {
               loading ? <LoadingBox /> :
               error ? <MessageBox variant="danger">{error}</MessageBox> :
               (
                  <>
                     <div>
                        <label htmlFor="name">Name</label>
                        <input 
                           type="text"
                           id="name"
                           placeholder="Enter name"
                           value={name}
                           onChange={e => setName(e.target.value)}
                        />
                     </div>
                     <div>
                        <label htmlFor="email">Email</label>
                        <input 
                           type="email"
                           id="email"
                           placeholder="Enter email"
                           value={email}
                           onChange={e => setEmail(e.target.value)}
                        />
                     </div>
                     <div>
                        <label htmlFor="isSeller">Is Seller</label>
                        <input 
                           type="checkbox"
                           id="isSeller"
                           checked={isSeller}
                           onChange={e => setIsSeller(e.target.checked)}
                        />
                     </div>
                     <div>
                        <label htmlFor="isAdmin">Is Admin</label>
                        <input 
                           type="checkbox"
                           id="isAdmin"
                           checked={isAdmin}
                           onChange={e => setIsAdmin(e.target.checked)}
                        />
                     </div>
                     <div>
                        <button type="submit" className="primary">
                           Update
                        </button>
                     </div>
                  </>
               )
            }
         </form>
      </div>
   )
}

export default UserEdit
