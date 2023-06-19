import React, { useEffect, useState } from "react";
import "./CreateCategory.css";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../Form/CategoryForm";
import { Modal } from "antd";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in updating");
    }
  };

  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`
      );
      if (data?.success) {
        toast.success(`${name} is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in deleting");
    }
  };
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong is getting category");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div className="text-[#fff] text-center">
      <h1 className="mt-10 text-2xl font-bold dashBoardTitle">
        Admin Dashboard
      </h1>
      <div className="flex flex-col-reverse sm:flex-row sm:flex ">
        <div className="p-10 dashmenu">
          <AdminMenu />
        </div>
        <div className="p-10 font-semibold sm:w-[65%] text-large">
          <h1 className="pb-8 text-3xl font-semibold ">Manage Categories</h1>
          <CategoryForm
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
          />
          <div>
            <table className="w-[100%] border-teal-200 border">
              <thead className="border border-teal-200">
                <tr className="text-2xl text-emerald-500">
                  <th className="p-2" scope="col">
                    Name
                  </th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="">
                {categories?.map((c) => (
                  <>
                    <tr className="text-xl border border-teal-200">
                      <td key={c._id} className="p-2">
                        {c.name}
                      </td>
                      <td>
                        <button
                          className="text-[#4d70ff] hover:underline pr-6"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="text-[red] hover:underline"
                          onClick={() => handleDelete(c._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            visible={visible}
          >
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
               handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
