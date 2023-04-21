import Head from "next/head";
import React from "react";
import useSWR from "swr";
import Navbar from "../../components/Layout/Navbar";
import { GrYoutube } from "react-icons/gr";
import { HiOutlineMail } from "react-icons/hi";
import {
  BsInstagram,
  BsLink45Deg,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { BiLink } from "react-icons/bi";

const College = () => {
  const fetchWithToken = (url) => axios.get(url).then((res) => res.data);

  const { data, error } = useSWR(`/api/College/`, fetchWithToken);

  //   if (error) {
  //     return (
  //       <div className="main_content_body">Error while Fetching Data...</div>
  //     );
  //   }

  //   if (!data) {
  //     return <div className="main_content_body">Loading...</div>;
  //   }

  return (
    <div>
      <Head>
        <title>GeeksBee</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="overflow-visible mx">
        <div className="w-screen md:w-full bg-white z-10 sticky top-0 md:py-1">
          <Navbar headerName="College" />
        </div>

        <div className="mt-1">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              alt="College Logo"
              src={
                "https://upload.wikimedia.org/wikipedia/en/e/e6/NIT_Goa_logo.png"
              }
              className="h-32"
            />
            <div className="mt-2 font-medium text-xl">
              National Institute Of Technology Goa
            </div>
            <h5>EST. 2010</h5>
            <div className="mt-1">Pharmagudi Goa</div>
            <div className="mt-5 flex">
              <a
                href={data?.website_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BiLink className="text-black text-xl mx-2" />
              </a>
              <a
                href={`https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=${data?.email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <HiOutlineMail className="text-black text-xl mx-2" />
              </a>
              <a
                href={data?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsLinkedin className="text-black text-xl mx-2" />
              </a>
              <a
                href={data?.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsInstagram className="text-black text-xl mx-2" />
              </a>
              <a
                href={data?.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookSquare className="text-black text-xl mx-2" />
              </a>
              <a href={data?.twitter} target="_blank" rel="noopener noreferrer">
                <BsTwitter className="text-black text-xl mx-2" />
              </a>
              <a href={data?.youtube} target="_blank" rel="noopener noreferrer">
                <GrYoutube className="text-black text-xl mx-2" />
              </a>
            </div>
            <div
              style={{
                width: "100%",
                height: "50vh",
                marginTop: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <iframe
                width="600"
                height="450"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                ></iframe> */}
              <iframe
                title="Google map link for college"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d246125.36248083532!2d73.78013248450334!3d15.446260986625163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfba54fee1f1cd%3A0xea0a4948645fa299!2sNational%20Institute%20of%20Technology%20Goa!5e0!3m2!1sen!2sin!4v1666529775293!5m2!1sen!2sin"
                style={{
                  width: "85%",
                  height: "85%",
                  border: "0",
                  loading: "lazy",
                }}
              ></iframe>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default College;
