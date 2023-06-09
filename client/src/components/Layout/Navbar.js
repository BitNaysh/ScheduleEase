import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import Cookies from "js-cookie";
import OutsideClickHandler from "react-outside-click-handler";
import { FiLogOut, FiUser } from "react-icons/fi";
import Confirmation from "../modal/confirmation";
import { RiMenu4Line, RiMore2Fill, RiWhatsappFill } from "react-icons/ri";
import { IoChevronBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../store/user";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import { BiChevronDown, BiChevronUp, BiSupport } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { MdCall } from "react-icons/md";

// const ThemeSwitch = dynamic(() => import("../buttons/ThemeSwitch"));

const antIcon = (
  <LoadingOutlined
    style={{ fontSize: 20, color: "white", marginLeft: 8 }}
    spin
  />
);

import { setShowSidebar } from "../../store/choices";
import { BsInfoSquare } from "react-icons/bs";

const Navbar = ({ headerName, showBack = false, handleBack }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { showSidebar, isModeDark } = useSelector((state) => state.choices);
  const { selectedBusiness, selectedBusinessIndex } = useSelector(
    (state) => state.user
  );
  const [logoutLoading, setLogoutLoading] = useState(false);

  const [supportDropdownOpen, setSupportDropdownOpen] = useState(false);

  const [logoutModal, setLogoutModal] = useState(false);
  const { user } = useSelector((state) => state.user);

  const logout = async () => {
    try {
      const { data } = await logout();
      dispatch(clearUser());
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`sticky  text-black z-10 bg-white 111011] top-0 flex justify-center items-center w-full py-3 md:px-4 px-2 ${
        isModeDark && ""
      }`}
    >
      {true ? (
        <div
          className="lg:hidden mr-auto "
          // onClick={() => handleBack()}
        >
          <IoChevronBackOutline className="text-2xl" />
        </div>
      ) : (
        <div
          className="lg:hidden mr-auto "
          // onClick={() => dispatch(setShowSidebar(!showSidebar))}
        >
          <div className="w-[35px] h-[35px] cursor-pointer flex bg-secondary-blue 303131]  rounded-full items-center justify-center">
            <RiMenu4Line className="text-xl" />
          </div>
        </div>
      )}
      <div className="flex w-7/12 lg:w-5/12 lg:mr-auto">
        {headerName && (
          <div className="w-full px-10 flex items-center  text-center justify-center lg:justify-start text-2xl font-medium">
            {headerName}
          </div>
        )}
      </div>

      <div className="flex ml-auto items-center">
        <div className="rounded-full h-10 group flex items-center relative">
          <div className="w-[35px] h-[35px] cursor-pointer flex bg-secondary-blue 303131]  rounded-full items-center justify-center">
            <RiMore2Fill className="text-xl" />
          </div>

          <div className="p-3 bg-white 3A3B3B] z-40 rounded-md shadow-3xl hidden group-hover:flex absolute right-0 top-10 flex-col">
            <div
              className={`w-48 flex-col text-black cursor-pointer rounded-md p-2 mb-1 flex hover:bg-gray-100 no-underline hover:text-black -white`}
            >
              <div
                onClick={() => setSupportDropdownOpen((prev) => !prev)}
                className={`flex items-center`}
              >
                <FiUser className="text-lg mr-2 text-" />
                My Account
              </div>
            </div>

            <div
              className={`w-48 flex-col text-black cursor-pointer rounded-md p-2 mb-1 flex hover:bg-gray-100 -[#1F1E1F]  no-underline hover:text-black -white`}
            >
              <div
                onClick={() => setSupportDropdownOpen((prev) => !prev)}
                className={`flex items-center`}
              >
                <BiSupport className="text-lg mr-2 text-" />
                Contact Us
              </div>
            </div>

            <div
              className={`w-48 flex-col text-black cursor-pointer rounded-md p-2 mb-2 flex hover:bg-gray-100 no-underline hover:text-black -white`}
            >
              <div
                onClick={() => setSupportDropdownOpen((prev) => !prev)}
                className={`flex items-center`}
              >
                <BsInfoSquare className="text-lg mr-2 text-" />
                About Us
              </div>
            </div>

            <hr />

            <button
              className="w-48 bg-red-500 rounded-md text-white p-1"
              onClick={async () => {
                setLogoutLoading(true);
                try {
                  await logoutUser();
                  Cookies.remove("accessToken", { path: "" });
                  Cookies.remove("refreshToken", { path: "" });
                  router.push("/login");
                } catch (error) {
                  setLogoutLoading(false);
                  console.log(error);
                }
              }}
            >
              Logout {logoutLoading && <Spin indicator={antIcon} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
