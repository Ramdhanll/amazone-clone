import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrderMine } from '../../../redux'
import LoadingBox from '../../utils/LoadingBox'
import MessageBox from '../../utils/MessageBox'

const OrderHistory = (props) => {
   const orderMineList = useSelector(state => state.orderMineList)
   const { loading, error, orders } = orderMineList

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(listOrderMine())
   }, [dispatch])

   return (
      <div>
         <h1>Order History</h1>
         { 
            loading ? <LoadingBox /> : 
            error ? <MessageBox variant="danger">{error}</MessageBox> :
            (
               <table className="table">
                  <thead>
                     <tr>
                        <th>ID</th>
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
                              <td>{order.createdAt.substring(0, 10)}</td>
                              <td>Rp. {order.totalPrice}</td>
                              <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                              <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                              <td>
                                 <button 
                                    type="button" 
                                    className="small"
                                    onClick={() => {props.history.push(`/order/${order._id}`)}}
                                    >
                                       Details
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

export default OrderHistory
