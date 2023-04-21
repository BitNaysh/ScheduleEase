import Head from "next/head";
import React from "react";
import useSWR from "swr";
import Navbar from "../../components/Layout/Navbar";
import { FcFolder } from "react-icons/fc";

const Portion = () => {
  const fetchWithToken = (url) => axios.get(url).then((res) => res.data);

  const { data, error } = useSWR(`/api/portion/`, fetchWithToken);

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
      {/* <div className="w-full py-2 px-2"></div> */}

      <main className="overflow-visible h-screen bg-white">
        <div className="w-screen md:w-full bg-white z-10 sticky top-0 md:py-1">
          <Navbar headerName="Portion" />
        </div>

        <div className="mx-5">
          <h6>
            SUBJECTS
            <hr style={{ marginTop: "2px" }} />
          </h6>

          <div className="grid grid-cols-6 gap-3 mt-5">
            {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((subject) => (
              <div
                key={subject}
                className="border group relative flex cursor-pointer rounded-md p-2 px-3 items-center"
              >
                <FcFolder className="text-lg" />
                <text className="ml-2 uppercase">
                  {/* {subject[0]} */}
                  MA100
                </text>
                <span className="absolute hidden group-hover:block bg-black/80 z-20 text-white p-2 px-2 rounded-md -bottom-10 w-full left-0">
                  Mathematics
                </span>
              </div>
            ))}
          </div>

          <h6 className="mt-10">
            MA100
            <hr className="mt-1" />
          </h6>

          <div className="grid grid-cols-8 gap-5 mt-5">
            {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((subject) => (
              <div
                key={subject}
                className="border flex-col relative flex cursor-pointer rounded-md overflow-hidden"
              >
                <img src="/book.jpeg" className="h-36" />
                <text className="mt-2 text-xs text-left px-2 line-clamp-1">
                  Physics book hysics book hysics book hysics book
                </text>
                <text className="mb-2 text-gray-400 text-xs text-left px-2 line-clamp-1">
                  John Doe
                </text>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Portion;
