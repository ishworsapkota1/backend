import { addCategory } from "@/pages/api/categoryApi";
import { isAuthenticated } from "@/pages/api/userApi";
import React, { useState } from "react";
import { useEffect } from "react";

const add = () => {
  const [category_name, setCategoryName] = useState("");
  // let { token } = isAuthenticated;
  const [token, setToken] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addCategory(category_name, token).then((data) => {
      if (data.error) {
        setError(data.error);
        setSuccess("");
      } else {
        setSuccess(true);
        setError("");
      }
    });
  };
  const showError = () => {
    if (error) {
      return <div className="bg-red-200 text-center">{error}</div>;
    }
  };
  const showSuccess = () => {
    if (success) {
      return (
        <div className="bg-green-200 text-center">
          Catgeory added successfully
        </div>
      );
    }
  };
  useEffect(() => {
    getToken().then((data) => setToken(data));
    async function getToken() {
      return await JSON.parse(localStorage.getItem("jwt"))?.token;
    }
  }, []);
  return (
    <div>
      <div
        id="crud-modal"
        tabindex="-1"
        aria-hidden="true"
        className=" overflow-y-auto overflow-x-hidden  top-1 p-5  justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add category
              </h3>
            </div>
            <form className="p-4 md:p-5">
              {showError()}
              {showSuccess()}
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type category name"
                    required=""
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleSubmit}
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Add new category
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default add;
