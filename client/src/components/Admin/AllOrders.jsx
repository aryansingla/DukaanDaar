import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "./AdminMenu";
import { useAuth } from "../../context/auth";
import Navbar from "../Navbar/Navbar";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;
const AllOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="text-[#fff] text-center">
        <h1 className="dashBoardTitle font-bold text-2xl mt-10">
          Admin Dashboard
        </h1>
        <div className="dashboardContent flex">
          <div className="dashmenu p-10">
            <AdminMenu />
          </div>
          <div class="overflow-auto rounded-lg shadow hidden md:block w-full">
            <table class="w-full">
              <thead class=" border-b-2 border-gray-200">
                <tr>
                  <th class="p-3 w-20 text-sm font-semibold tracking-wide  text-left">
                    Serial Number: 
                  </th>
                  <th class="p-3 w-20 text-sm font-semibold tracking-wide  text-center">
                    Status
                  </th>
                  <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Buyer
                  </th>
                  <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                    Date
                  </th>
                  <th class="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                    Payment
                  </th>
                  <th class="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                {orders?.map((o, i) => {
                  return (
                    <>
                      <tr class="bg-white">
                        <td class="p-3 text-sm text-gray-700 text-left">
                          {i + 1}
                        </td>
                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-left">
                          <span class="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                            {o?.buyer?.name}
                          </span>
                        </td>
                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-left">
                          {moment(o?.createAt).fromNow()}{" "}
                        </td>
                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-left">
                          {o?.payment?.success ? "Success" : "Failed"}{" "}
                        </td>
                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap text-left">
                          {o?.products?.length}{" "}
                        </td>
                      </tr>
                      <div className="container w-full flex">
                        {o?.products?.map((p, i) => (
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

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {orders?.map((o, i) => {
              return (
                <>
                  <div class="bg-white space-y-3 p-4 rounded-lg shadow">
                    <div class="flex items-center space-x-2 text-sm">
                      <div>
                        <p class="text-blue-500 font-bold hover:underline">
                          {i+1}
                        </p>
                      </div>
                      <div class="text-gray-500">                          
                      <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select></div>
                      <div>
                      <span class="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                            {o?.buyer?.name}
                          </span>

                      </div>
                      <div>
                      <p class="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {moment(o?.createAt).fromNow()}{" "}
                        </p>
                      </div>
                    </div>
                    <div class="text-sm text-gray-700 flex">

                        <p class="p-3 text-sm text-gray-700 whitespace-nowrap">
                          Payment:  
                          {o?.payment?.success ? "Success" : "Failed"}{" "}
                        </p>

                        <p class="p-3 text-sm text-gray-700 whitespace-nowrap">
                          Order Quantity : 
                          {o?.products?.length}{" "}
                        </p>
                    </div>
            <div>
              <h3 className="text-bold text-black text-left">Order details:</h3>
              {o?.products?.map((p, i) => (
                          <div className="cartItem bg-[#c5c5ff]  mt-3 rounded-2xl  mr-4 w-[100%]">
                            <div className="cartItemBox flex justify-around">
                              <div className="itemImage ">
                                <img
                                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                  alt="Shoes"
                                  className="md:min-w-[100px] md:max-w-[100px] md:min-h-[100px] md:max-h-[100px]
                            min-w-[80px] max-w-[80px] min-h-[80px] max-h-[80px]"
                                />
                              </div>
                              <div className="itemDetails text-[black] w-[50%]">
                                <h1>{p.name}</h1>
                                <h3 className=""> ₹ {p.price}</h3>
                              </div>
                            </div>
                          </div>
                        ))}
            </div>
                  </div>

                </>
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllOrders;
