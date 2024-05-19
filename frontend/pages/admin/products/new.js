// import { useState } from "react";
'use client'
import { getAllCategories } from "@/pages/api/categoryApi";
import { addProduct } from "@/pages/api/productAPI";
import { useEffect, useRef, useState } from "react";

const add = () => {
    let [token, setToken] = useState('')
    let [categories, setCategories] = useState([])

    let sel_ref = useRef()
    let file_ref = useRef()

    let [product, setProduct] = useState({
        title: '',
        price: "",
        description: "",
        count_in_stock: "",
        category: '',
        formdata: new FormData
    })
    let { formdata, title, price, description, category, count_in_stock } = product

    let [error, setError] = useState('')
    let [success, setSuccess] = useState(false)

    const handleChange = (e) => {
        // if(e.target.name == "image"){
        //     formdata.set("image", e.target.files[0])
        // }
        // else{
        setProduct({ ...product, [e.target.name]: e.target.value })
        //     formdata.set(e.target.name,e.target.value)
        // }
    }

    const handleImage = e => {
        formdata.set("image", e.target.files[0])
    }

    const handleSubmit = e => {
        e.preventDefault()

        formdata.set('title', product.title)
        formdata.set('price', product.price)
        formdata.set('description', product.description)
        formdata.set('count_in_stock', product.count_in_stock)
        formdata.set('category', product.category)

        addProduct(formdata, token)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    setSuccess(false)
                }
                else {
                    setSuccess(true)
                    setProduct({ title: '', price: '', description: '', count_in_stock: '' })
                    sel_ref.current.value = ''
                    file_ref.current.value = ''
                    setError('')
                }
            })
    }

    const showError = () => {
        if (error) {
            return <div className="bg-red-200 text-center">{error}</div>
        }
    }
    const showSuccess = () => {
        if (success) {
            return <div className="bg-green-200 text-center">Product Added Successfully</div>
        }
    }

    useEffect(() => {
        getToken().then(data => {
            setToken(data)
            // setProduct({...product, formdata: new FormData})
        })


        getAllCategories()
            .then(data => {
                setCategories(data)
            })

        async function getToken() {
            return await JSON.parse(localStorage.getItem('jwt'))?.token
        }
    }, [])



    return (<>


        <div id="defaultModal" tabindex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full p-5">
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Add Product
                        </h3>
                    </div>
                    <form>
                        {showError()}
                        {showSuccess()}
                        <div className="grid gap-4 mb-4 sm:grid-cols-1">
                            <div>
                                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ProductName</label>
                                <input type="text" name="title" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Category name" required=""
                                    onChange={handleChange}
                                    value={title}
                                />
                            </div>
                        </div>
                        <div className="grid gap-4 mb-4 sm:grid-cols-1">
                            <div>
                                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                <input type="number" name="price" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Category name" required=""
                                    onChange={handleChange}
                                    value={price}
                                />
                            </div>
                        </div>
                        <div className="grid gap-4 mb-4 sm:grid-cols-1">
                            <div>
                                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea name="description" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 resize-none" placeholder="Type Category name" required=""
                                    onChange={handleChange}
                                    value={description}
                                ></textarea>
                            </div>
                        </div>
                        <div className="grid gap-4 mb-4 sm:grid-cols-1">
                            <div>
                                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Count in Stock</label>
                                <input type="number" name="count_in_stock" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Category name" required=""
                                    onChange={handleChange}
                                    value={count_in_stock}
                                />
                            </div>
                        </div>
                        <div className="grid gap-4 mb-4 sm:grid-cols-1">
                            <div>
                                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Image</label>
                                <input type="file" name="image" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Category name" required=""
                                    onChange={handleImage}
                                    ref={file_ref}
                                />
                            </div>
                        </div>
                        <div className="grid gap-4 mb-4 sm:grid-cols-1">
                            <div>
                                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required=""
                                    onChange={handleChange}
                                    name="category"
                                    ref={sel_ref}
                                >
                                    <option disabled selected>Select Category</option>
                                    {
                                        categories.map(category => {
                                            return <option value={category._id} key={category._id}>{category.category_name}</option>
                                        })
                                    }

                                </select>
                            </div>
                        </div>
                        <button type="submit" className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleSubmit}>
                            <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                            Add new Product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </>);
}

export default add;