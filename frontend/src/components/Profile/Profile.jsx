import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, updateUserProfile } from '../../redux/user/UserActions'
import { USER_UPDATE_PROFILE_RESET } from '../../redux/user/UserTypes'
import LoadingBox from '../utils/LoadingBox'
import MessageBox from '../utils/MessageBox'

const Profile = () => {
   const dispatch = useDispatch()

   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [sellerName, setSellerName] = useState('');
   const [sellerLogo, setSellerLogo] = useState('');
   const [sellerDescription, setSellerDescription] = useState('');

   const userSignin = useSelector(state => state.userSignin)
   const { userInfo } = userSignin

   const userDetails = useSelector(state => state.userDetails)
   const { loading, error, user } = userDetails

   const userUpdateProfile = useSelector(state => state.userUpdateProfile)
   const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdateProfile

   useEffect(() => {
      if (!user) {
         dispatch({ type: USER_UPDATE_PROFILE_RESET })
         dispatch(detailsUser(userInfo._id))
      } else {
         setName(user.name)
         setEmail(user.email)
         if (user.seller) {
            setSellerName(user.seller.name);
            setSellerLogo(user.seller.logo);
            setSellerDescription(user.seller.description);
         }
      }
      
   }, [dispatch, userInfo._id, user])

   const submitHandler = e => {
      e.preventDefault()

      if (password !== confirmPassword) return alert('Password and Confirm Password Are Not Matched!')
      dispatch(updateUserProfile({userId: user._id, name, email, password, sellerName, sellerLogo, sellerDescription}))
   }

   return (
      <div>
         <form className="form" onSubmit={submitHandler}>
            <div>
               <h1>User Profile</h1>
            </div>
            {
               loading ? <LoadingBox /> : 
               error ? <MessageBox variant="danger">{error}</MessageBox> :
               <>
                  { loadingUpdate && <LoadingBox /> }
                  { errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                  { successUpdate && <MessageBox variant="success">Profile Upadated Successfully</MessageBox>}
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
                     <label htmlFor="password">password</label>
                     <input 
                        type="password" 
                        id="password" 
                        placeholder="Enter password" 
                        onChange={e => setPassword(e.target.value)}
                     />
                  </div>
                  <div>
                     <label htmlFor="confirmPassword">confirmPassword</label>
                     <input 
                        type="password" 
                        id="confirmPassword" 
                        placeholder="Enter confirm password" 
                        onChange={e => setConfirmPassword(e.target.value)}
                     />
                  </div>
                  {user.isSeller && (
                  <>
                     <h2>Seller</h2>
                     <div>
                        <label htmlFor="sellerName">Seller Name</label>
                        <input
                        id="sellerName"
                        type="text"
                        placeholder="Enter Seller Name"
                        value={sellerName}
                        onChange={(e) => setSellerName(e.target.value)}
                        ></input>
                     </div>
                     <div>
                        <label htmlFor="sellerLogo">Seller Logo</label>
                        <input
                        id="sellerLogo"
                        type="text"
                        placeholder="Enter Seller Logo"
                        value={sellerLogo}
                        onChange={(e) => setSellerLogo(e.target.value)}
                        ></input>
                     </div>
                     <div>
                        <label htmlFor="sellerDescription">Seller Description</label>
                        <input
                        id="sellerDescription"
                        type="text"
                        placeholder="Enter Seller Description"
                        value={sellerDescription}
                        onChange={(e) => setSellerDescription(e.target.value)}
                        ></input>
                     </div>
                  </>
                  )}

                  <div>
                     <label/>
                     <button className="primary" type="submit">Update</button>
                  </div>

               </>
            }
         </form>
      </div>
   )
}

export default Profile
