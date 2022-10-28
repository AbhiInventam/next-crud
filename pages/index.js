import Head from "next/head";
import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid'
import { BiEdit, BiTrash, BiUserPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, updateUser } from "../store/userSlice";
import styles from "../styles/Layout.module.css";

const initialData = {
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  date: null,
};

export default function Home() {
  const dispatch = useDispatch();
  const unique_id = uuidv4();
  const [formToggle, setFormToggle] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const userData = useSelector(({ user }) => user.userData);
  const userList = useSelector(({ user }) => user.userList);
  const [form, setForm] = useState(initialData);

  useEffect(() => {
    setForm(userData);
  }, [dispatch, userList, userData]);

  useEffect(() => {
    if (userList.length !== 0) {
      setForm(userData);
    }
  }, []);

  const handleAdd = () => {
    setFormToggle(!formToggle);
  };

  const HandleChange = (event) => {
    const newData = {
      ...form,
      [event.target.name]: event.target.value,
    };
    setForm(newData);
  };

  const HandleSubmit = (event) => {
    event.preventDefault();
    let temp = [];

    if (isUpdate) {
      // Edit
      const updatedUserList = userList.map((item, index) => {
        if (item.id === form.id) {
          return form
        }
        return item
      })
      dispatch(updateUser(updatedUserList))

    } else {
      // Add 
      const finalData = {
        ...form,
        id: unique_id?.slice(0, 6),
      };

      temp.push(...userList, finalData);
      dispatch(addUser(temp))
    }

    setIsUpdate(false)
    setForm()
    return;
  };

  const UpdateUserHandler = (item) => {
    setForm(item)
  };

  // Delete Record
  const DeleteUserHandler = (item) => {
    dispatch(deleteUser(item?.id));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>CRUD App</title>
        <meta name="description" content="next js crud app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style jsx>
        {`
        .inputField{
          bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
        }
        .lableField {
          "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        }
        `}
      </style>

      <main className="container">
        <h1 className="text-3xl text-center m-10">Next JS CRUD Application</h1>

        <div className="formadd">
          <button
            type="button"
            className="flex flex-row text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => handleAdd()}
          >
            <span className="px-1">
              <BiUserPlus size={20} />
            </span>
            Add User
          </button>
        </div>
        {/* <div className={styles.card}>Hello Abhishek</div> */}
        {formToggle && (
          <div>
            <form onSubmit={HandleSubmit} noValidate>
              <div className="grid gap-6 mb-6 md:grid-cols">
                <div className="flex flex-row input-type">
                  <label htmlFor="first_name" className="lableField">
                    First name:
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    className="border w-100"
                    placeholder="first name"
                    value={form?.first_name}
                    onChange={HandleChange}
                    required
                  />
                </div>
                <div className="flex flex-row input-type">
                  <label htmlFor="last_name" className="lableField">
                    Last name:
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    className="border w-100"
                    placeholder="last name"
                    value={form?.last_name}
                    onChange={HandleChange}
                    required
                  />
                </div>
                <div className="flex flex-row input-type">
                  <label htmlFor="email" className="lableField">
                    Email address:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="border w-100"
                    placeholder="email"
                    value={form?.email}
                    onChange={HandleChange}
                    required=""
                  />
                </div>
                <div className="flex flex-row input-type">
                  <label htmlFor="phone" className="lableField">
                    Phone number:
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="border w-100"
                    placeholder="phone number"
                    // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    value={form?.phone}
                    onChange={HandleChange}
                    required=""
                  />
                </div>
                <div className="flex flex-row input-type">
                  <label htmlFor="email" className="lableField">
                    Date of Join:
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="border w-100"
                    value={form?.date ? form?.date : {}}
                    onChange={HandleChange}
                    required=""
                  />
                </div>
              </div>

              <button
                type="submit"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                {isUpdate ? 'Update' : 'ADD'}
              </button>
            </form>
          </div>
        )}

        <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  First Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Last Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Phone number
                </th>
                <th scope="col" className="py-3 px-6">
                  Email
                </th>
                <th scope="col" className="py-3 px-6">
                  DOJ
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {userList && userList?.map((item, index) => {
                return (
                  <>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                      <td className="py-4 px-6">{item?.first_name}</td>
                      <td className="py-4 px-6">{item?.last_name}</td>
                      <td className="py-4 px-6">{item?.phone}</td>
                      <td className="py-4 px-6">{item?.email}</td>
                      <td className="py-4 px-6">{item?.date}</td>
                      {item.length !== 0 && (
                        <td className="flex flex-row py-4 px-6 gap-7">
                          <BiEdit
                            size={20}
                            color="blue"
                            onClick={() => {
                              setIsUpdate(true)
                              UpdateUserHandler(item)
                            }}
                          />{" "}
                          <BiTrash
                            size={20}
                            color="red"
                            onClick={() => DeleteUserHandler(item)}
                          />
                        </td>
                      )}
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
