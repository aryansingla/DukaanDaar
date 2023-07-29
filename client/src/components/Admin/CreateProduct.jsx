import React, { useState, useEffect, useSyncExternalStore } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "./AdminMenu";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
const { Option } = Select;
const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong is getting category");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.success("Product created successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
    <Navbar/>
    <div className="text-[#fff] text-center">
      <h1 className="mt-10 text-2xl font-bold dashBoardTitle">
        Admin Dashboard
      </h1>
      <div className="flex flex-col-reverse sm:flex-row sm:flex ">
        <div className="p-10 dashmenu">
          <AdminMenu />
        </div>
        <div className="p-10 font-semibold sm:w-[65%] text-large">
          <h1 className="pb-8 text-3xl font-semibold ">Manage Products</h1>
          <div className="w-full">
            <Select
              bordered={true}
              placeholder="Select a category"
              size="large"
              showSearch
              className="w-[60%]"
              onChange={(value) => {
                setCategory(value);
              }}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <div className="mt-6 ">
              <label className="p-2 border rounded cursor-pointer border-slate-50">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mt-6">
              {photo && (
                <div className="">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product-photo"
                    className="w-1/5 m-auto"
                  />
                </div>
              )}
            </div>
            <div className="mt-4">
              <input
                type="text"
                value={name}
                placeholder="Write a name"
                className="w-[60%] p-2 border rounded-lg text-black"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <textarea
                name="desc"
                id="desc"
                cols="30"
                rows="1"
                value={description}
                placeholder="Write description"
                className="w-[60%] p-2 border rounded-lg text-black"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mt-4">
              <input
                type="number"
                value={price}
                placeholder="Write price"
                className="w-[60%] p-2 border rounded-lg text-black"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <input
                type="number"
                value={quantity}
                placeholder="Write quantity"
                className="w-[60%] p-2 border rounded-lg text-black"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <Select
              bordered={true}
              placeholder="Select shipping"
              size="large"
              showSearch
              className="w-[60%] mt-4  "
              onChange={(value) => {
                setShipping(value);
              }}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
            <div className="mt-4">
              <button className="btn btn-primary" onClick={handleCreate}>
                CREATE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CreateProduct;
