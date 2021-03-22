import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../../../redux/index'
import LoadingBox from '../../utils/LoadingBox'
import MessageBox from '../../utils/MessageBox'

const OrderList = (props) => {
   const dispatch = useDispatch()
   const orderList = useSelector(state => state.orderList)
   const { loading, error, orders } = orderList

   useEffect(() => {
      dispatch(listOrders())
   }, [dispatch])

   const deleteHandler = order => {

   }

   return (
      <div>
         <h1>Orders Lists</h1>
         {
            loading ? <LoadingBox/> :
            error ? <MessageBox variant="danger">{error}</MessageBox>:
            (
               <table className="table">
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th>ACTIONS</th>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        orders.map(order => (
                           <tr key={order._id}>
                              <td>{order._id}</td>
                              <td>{order.user.name}</td>
                              <td>{order.createdAt.substring(0, 10)}</td>
                              <td>{order.totalPrice}</td>
                              <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                              <td>{order.isDelivered ? order.delivered.substring(0, 10) : 'No'}</td>
                              <td>
                                 <button
                                    type="button"
                                    className="small"
                                    onClick={() => props.history.push(`/order/${order._id}`)}
                                 >
                                    Details
                                 </button>

                                 <button
                                    type="button"
                                    className="small"
                                    onClick={() => deleteHandler(order)}
                                 >
                                    Delete
                                 </button>
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

export default OrderList
