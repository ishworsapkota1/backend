"use client";
let API = process.env.API;
export const login = (user) => {
  return fetch(`http://localhost:8000/api/login`, {
    method: "POST",
    headers: {
      accept: "Application/json",
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
export const register = (user) => {
  return fetch(`http://localhost:8000/api/register`, {
    method: "POST",
    headers: {
      accept: "Application/json",
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
export const verifyemail = (token) => {
  return fetch(`${API}/verifyemail/${token}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const authenticate = (data) => {
  localStorage.setItem("jwt", JSON.stringify(data)); // why stringify
};

export const isAuthenticated = () => {
  return localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")) // why parse
    : false;
};

export const logout = () => {
  localStorage.removeItem("jwt");
  return fetch(`${API}/logout`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
