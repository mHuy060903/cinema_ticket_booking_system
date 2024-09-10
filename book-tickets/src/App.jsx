import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import LeftBar from "./components/LeftBar";
import RightHeader from "./components/RightHeader";
import Modal from "./components/Model";
import { useEffect, useState } from "react";
import TopWeek from "./components/TopWeek";
import TopDiscount from "./components/TopDiscount";
import Footer from "./components/Footer";
import { useMutation } from "@tanstack/react-query";
import { fetchTokenLogin } from "./fetchApi/users/login";
import Loader from "./components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./reducers/auth/authSlice";
import { MdOutlineMessage } from "react-icons/md";

import ChatClient from "./components/ChatClient";
import { toast } from "react-toastify";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenChat, setIsOpenChat] = useState(false);
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const dispatch = useDispatch();

  const { mutate: handleFetchTokenLogin, isLoading } = useMutation({
    mutationFn: fetchTokenLogin,
    onSuccess: (data) => {
      const { token, ...user } = data;
      localStorage.setItem("token", token);
      dispatch(
        login({
          user: user,
          token: token,
        })
      );
    },
  });

  useEffect(() => {
    handleFetchTokenLogin();
  }, [handleFetchTokenLogin]);

  const toggleOpenChat = () => {
    if (!user) {
      return toast.error("Please login to chat");
    }
    setIsOpenChat((prev) => !prev);
  };

  if (isLoading) {
    return (
      <div className="w-full h-[100vh] flex flex-col items-center justify-center">
        <Loader color="blue" size={100} />
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12  h-full dark:bg-black relative">
      {isOpenChat && user ? (
        <ChatClient toggleOpenChat={toggleOpenChat} />
      ) : (
        <div
          onClick={toggleOpenChat}
          className="fixed top-[98vh] right-6 -translate-y-[100%] p-4 rounded-full cursor-pointer hover:bg-red-800 hover:dark:bg-gray-300 bg-red-600 z-20 dark:bg-white"
        >
          <MdOutlineMessage
            className="text-white dark:text-red-600"
            size={24}
          />
        </div>
      )}

      <div className="hidden  lg:col-span-2 lg:flex h-full ">
        <LeftBar />
      </div>
      <div className="col-span-12 sm:col-span-7 p-2 sm:p-6">
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            content={<LeftBar />}
            onClose={() => setIsModalOpen(false)}
          />
        )}
        <Header onOpenModel={() => setIsModalOpen(true)} />
        <Outlet />
      </div>
      <div className=" p-2 sm:p-6 hidden  sm:col-span-3 sm:flex sm:flex-col items-start gap-4">
        <RightHeader />
        <TopWeek />
        <TopDiscount />
      </div>
      <div className="md:col-span-2"></div>
      <div className=" col-span-12 md:col-span-12 lg:col-span-10 w-full bg-black">
        <Footer />
      </div>
    </div>
  );
};

export default App;
