import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { LoginPage } from "../../components/Layout/middleware";
import axios from "axios";
import Cookies from "js-cookie";
import { storeProfile, storeSchool, storeUser } from "../../store/user";
import { useCookie } from "next-cookie";

const Login = (props) => {
    const dispatch = useDispatch();
    const cookie = useCookie(props.cookie);
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                process.env.NEXT_PUBLIC_API_URL_LOCAL + "/api/auth/login",
                {
                    email: email,
                    password: password,
                },
                {
                    withCredentials: false,
                }
            );
            console.log(data);
            cookie.set("accessToken", data.token);
            Cookies.set("refreshToken", data.refreshToken, { path: "" });
            Cookies.set("accessToken", data.token, { path: "" });
            dispatch(storeUser(data.user));
            dispatch(storeProfile(data.user.adminProfile));
            dispatch(storeSchool(data.user.adminProfile.school));
            router.push("/");
        } catch (error) {
            if (error?.response?.data?.msg) {
                message.error(error.response.data.msg);
            }
            console.log(error, "hi");
        }
    };

    return (
        <div className='absolute z-50 bg-white left-0 top-0 flex h-screen w-screen'>
            <Head>
                <title>Login</title>
            </Head>
            <div className='h-screen w-[60%] bg-[#F4F1E9] hidden flex-col justify-center items-center md:flex'>
                <div className='absolute left-0 top-0 mt-8 ml-8 font-bold text-2xl'>
                    Geeks<span className='text-[#063FED]'>Bee</span>
                </div>
                <div className='relative'>
                    <div className='absolute h-52 w-52 -top-4 -left-4 rounded-full bg-[#00227B]' />
                    <Image src='/helloBot.png' height={200} width={200} />
                </div>
                <div className='font-bold text-2xl mt-3'>Welcome back !!</div>
                <div className='font-normal text-sm mt-2'>Login to start posting jobs</div>
            </div>

            <form
                onSubmit={handleSubmit}
                className='h-screen w-full flex flex-col justify-center items-center md:w-[40%]'
            >
                <div className='font-semibold text-2xl -mt-3'>Login</div>
                <div className='mt-3 text-sm'>Enter your credentials to access the platform</div>

                <input
                    className='w-[60%] border-2 rounded-full h-9 mt-5 flex items-center px-8 p-5'
                    placeholder='Enter your email id'
                    type='email'
                    required
                    pattern='+@+.+'
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className='w-[60%] border-2 rounded-full h-9 mt-3 flex items-center px-8 p-5'
                    placeholder='Enter Password'
                    type='password'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type='submit'
                    className='w-[60%] mt-5 bg-[#063FED] text-white p-2 px-8 rounded-full'
                >
                    Log In
                </button>

                <div className='flex flex-col'>
                    <div
                        onClick={() => router.push("/register")}
                        className='flex justify-center text-center items-center text-xs cursor-pointer mt-5'
                    >
                        Facing any issues?
                        <span className='text-[#063FED] ml-1'>Contact Us</span>
                    </div>
                </div>
            </form>
        </div>
    );
};

export const getServerSideProps = LoginPage(async (_ctx) => {
    const cookie = useCookie(_ctx);

    // cookie.set("getServerSideProps", "This value is set by getServerSideProps.");

    return {
        props: {
            cookie: _ctx.req.headers.cookie || "",
        },
    };
});

export default Login;
