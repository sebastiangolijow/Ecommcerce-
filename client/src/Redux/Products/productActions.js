import * as actionType from "../action_types/actionTypes";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zgycwtqkzgitgsycfdyk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjE3NzMwOTg0LCJleHAiOjE5MzMzMDY5ODR9.8cmeNSjMvLmtlFtAwRjuR0VhXUhu5PX7174IBiXsU-E";
const supabase = createClient(supabaseUrl, supabaseKey);

export const Search = (input) => {
  return async function (dispatch) {
    dispatch({ type: actionType.SEARCHING, payload: input });
  };
};


export const clearSearch = () => {
  return async function (dispatch) {
    dispatch({ type: actionType.SEARCHING, payload: '' });
  };
};

export const totalProducts = (product) => {
  return async function(dispatch) {
    if (!product) {
      let JSON = await supabase
        .from("product")
        .select("*, images(url), reviews(*)");
      return dispatch({
        type: actionType.PRODUCTS,
        payload: JSON.data,
      });
    }
    const JSON = await supabase
      .from("product")
      .select("*, images(url)")
      .ilike("name", `%${product}%`);
    dispatch({ type: actionType.PRODUCTS, payload: JSON.data });
  };
};

export const getAllProducts = (limit, offset, cate, price, input) => {
  let categoryName = !cate ? "" : "categories.name";
  let lowestPrice = !price[0] ? "" : "price";
  let highestPrice = !price[1] ? "" : "price";
  let name = !input ? "" : "name";
  return async function(dispatch) {
    let JSON = await supabase
      .from("product")
      .select(
        "name,price,rating,id,stock,discount,categories(name), images(url), reviews(*)"
      )
      .ilike(name, `%${input}%`)
      .eq(categoryName, cate)
      .gt(lowestPrice, price[0])
      .lt(highestPrice, price[1]);
    dispatch({
      type: actionType.SEARCH,
      payload: JSON.data,
      pages: { limit, offset },
    });
  };
};

export const productDetail = (input) => {
  return async function(dispatch) {
    const JSON = await supabase
      .from("product")
      .select("*, categories(id, name), images(url), reviews(*)")
      .eq("id", input);
    dispatch({ type: actionType.PRODUCT_DETAIL, payload: JSON.data[0] });
  };
};

export const getCategories = (category) => {
  return async function(dispatch) {
    if (!category) {
      const JSON = await supabase.from("categories").select("*");
      return dispatch({ type: actionType.GET_CATEGORIES, payload: JSON.data });
    }
    const JSON = await supabase
      .from("categories")
      .select("*")
      .ilike("name", `%${category}%`);
    return dispatch({ type: actionType.GET_CATEGORIES, payload: JSON.data });
  };
};

export const getProductsByCategories = (input) => {
  return async function(dispatch) {
    // eslint-disable-next-line
    let { data: categories, error } = await supabase
      .from("categories")
      .select("name , product_categories(product(*,images(url),reviews(*)))");

    dispatch({
      type: actionType.GET_PRODUCTBYCATEGORIES,
      payload: categories.sort(() => Math.random() - 0.5).slice(0, 3),
    });
  };
};

export const postProduct = (product) => {
  return async (dispatch) => {
    await supabase.from("product").insert([
      {
        name: product.name,
        description: product.description,
        price: product.price,
        brand: product.brand,
        stock: product.stock,
        model: product.model,
        rating: product.ranking,
        storage: product.storage,
        status: product.status,
      },
    ]);

    const productId = await supabase
      .from("product")
      .select("id")
      .eq("name", product.name);

    product.images.map(async (image) => {
      await supabase.from("images").insert([
        {
          url: image.link,
          product_id: productId.data[0].id,
          cloudinary_id: image.public_id,
        },
      ]);
    });

    product.categories.map(async (category) => {
      const categoryId = await supabase
        .from("categories")
        .select("id")
        .eq("name", category);

      await supabase.from("product_categories").insert([
        {
          product_id: productId.data[0].id,
          categories_id: categoryId.data[0].id,
        },
      ]);
    });
    dispatch({ type: actionType.POST_PRODUCT });
  };
};

export const postCategory = (category) => {
  return async (dispatch) => {
    await supabase.from("categories").insert([
      {
        name: category.name,
        description: category.description,
      },
    ]);
    const JSON = await supabase.from("categories").select("*");
    dispatch({ type: actionType.GET_CATEGORIES, payload: JSON.data });
  };
};

export const updateProduct = (product, id) => {
  return async () => {
    await supabase
      .from("product_categories")
      .delete("*")
      .match({ product_id: id });
    product.categories.map(async (category) => {
      await supabase
        .from("product_categories")
        .insert([{ product_id: id, categories_id: category.id }]);
    });
    product.delImages.map(async (img) => {
      await supabase
        .from("images")
        .delete("*")
        .match({ url: img.url });
    });
    product.upImages.map(async (image) => {
      await supabase.from("images").insert([
        {
          url: image.link,
          product_id: id,
          cloudinary_id: image.public_id,
        },
      ]);
    });
    await supabase
      .from("product")
      .update({
        name: product.name,
        description: product.description,
        price: product.price,
        brand: product.brand,
        stock: product.stock,
        model: product.model,
        ranking: product.ranking,
        storage: product.storage,
        status: true,
      })
      .eq("id", id);
  };
};

export const deleteProduct = (id) => {
  return async () => {
    await supabase
      .from("product_categories")
      .delete("*")
      .eq("product_id", id);
    await supabase
      .from("images")
      .delete("*")
      .match({ product_id: id });
    await supabase
      .from("product")
      .delete()
      .eq("id", id);
  };
};

export const deleteCategory = (id) => {
  return async () => {
    await supabase
      .from("categories")
      .delete("*")
      .match({ id: id });
  };
};

export const getProductsVisited = (products) => {
  return async function(dispatch) {
    const promiseProducts = await Promise.all(
      products.map(async (id) => {
        const product = await supabase
          .from("product")
          .select("*, images(url), reviews(*)")
          .eq("id", id);
        return product.data[0];
      })
    );
    dispatch({ type: actionType.LAST_PRODUCT, payload: promiseProducts });
  };
};
