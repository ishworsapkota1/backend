let API = "http://localhost:8000/api";

export const getAllCategories = () => {
  return fetch(`${API}/getallcategories`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const addCategory = (category_name, token) => {
  return fetch(`${API}/addcategory`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ category_name }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
export const getCategory = (id) => {
  return fetch(`${API}/getcategory/${id}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const editCategory = (id, category, token) => {
  return fetch(`${API}/updatecategory/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const deleteCategory = (id, token) => {
  return fetch(`${API}/deletecategory/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
