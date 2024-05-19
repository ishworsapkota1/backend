import { getAllCategories, deleteCategory } from "@/pages/api/categoryApi";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";

export async function getStaticProps() {
  const categories = await getAllCategories();

  // Props returned will be passed to the page component
  return { props: { categories } };
}

const category = (props) => {
  let categories = props.categories;
  // useEffect(() => {
  //   getAllCategories().then((data) => {
  //     if (data.error) {
  //       console.log(error);
  //     } else {
  //       setCategories(data);
  //     }
  //   });
  // }, []);
  const handleDelete = (id) => (e) => {
    e.preventDefault();
    Swal.fire({
      title: "delete garne nai ho?",
      text: "Are you sure you want to delete this category",
      icon: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(id).then((data) => {
          if (data.error) {
            Swal.fire("error", data.error, "error");
          } else {
            Swal.fire("success", "Category Deleted successfully", "success")
            .then(result => {
              router.refresh()
            })
          }
        });
      } else {
        Swal.fire("cancelled", "nothing is deleted", "info");
      }
    });
  };
  return (
    <div>
      <div className="py-5 text-center">
        <h1 className="text-2xl">Categories</h1>
        <Link href={"/admin/category/new"}>
          <button type="add" className="bg-green-100">
            Add new categories
          </button>
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-3/4 text-center mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                S.no
              </th>
              <th scope="col" className="px-6 py-3">
                Category name
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, i) => {
              return (
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {i + 1}
                  </th>
                  <td className="px-6 py-4">{category.category_name}</td>

                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/category/edit/${category._id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      <button className="bg-blue-100">Edit</button>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-slate-200 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={handleDelete(category._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default category;
