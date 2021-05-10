import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postCategory } from "../../Redux/Products/productActions.js";
import style from "./addcategory.module.scss";

export function AddCategory() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    description: "",
  });

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const clearInputs = () => {
    setData({
      name: "",
      description: "",
    })
  };

  const createCat = (data) => {
    dispatch(postCategory(data));
    clearInputs();
  };
  return (
    <div class={style.div}>
      <div>
      <h1>Create category</h1>
      <div>
        <label>Name</label>
        <input
          value={data.name}
          name="name"
          onChange={(e) => handleInputChange(e)}
        ></input>
      </div>
      <div>
        <label>Description</label>
        <input
          value={data.description}
          name="description"
          onChange={(e) => handleInputChange(e)}
        ></input>
      </div>
      <button onClick={() => createCat(data)}>Create</button>
      </div>
    </div>
  );
}
