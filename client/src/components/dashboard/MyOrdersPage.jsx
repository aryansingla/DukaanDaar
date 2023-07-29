import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <div className="allOrderMainPage ">
      <h1 className="text-#fff">All Orders</h1>

      <div className="table m-auto w-full">
        <table className="table w-[30%] sm:w-full m-auto">
          <thead className="">
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Buyer</th> 
              <th>Date</th>
              <th>Payment</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((o, i) => {
              return (
                <>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{o?.status}</td>
                    <td>{o?.buyer?.name}</td>
                    <td>{moment(o?.createAt).fromNow()}</td>
                    <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                    <td>{o?.products?.length}</td>
                  </tr>
                  <div className="container w-full">
                    {o?.products?.map((p,i) => (
                      <div className="cartItem bg-[#c5c5ff] p-2 pt-3 mt-3 rounded-2xl ml-4 mr-4 w-[100%]">
                        <div className="cartItemBox flex justify-around">
                          <div className="itemImage w-[50%]  ">
                            <img
                              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                              alt="Shoes"
                              className="md:min-w-[100px] md:max-w-[100px] md:min-h-[100px] md:max-h-[100px]
                            min-w-[80px] max-w-[80px] min-h-[80px] max-h-[80px]"
                            />
                          </div>
                          <div className="itemDetails text-[black] w-[50%]">
                            <h1>{p.name}</h1>
                            <h3 className="mt-[-10px]"> ₹ {p.price}</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* );
      })} */}
    </div>
  );
};

export default OrdersPage;
