import Image from "next/image";
import { Inter } from "next/font/google";

import Head from "next/head";
import Navbar from "../components/Layout/Navbar";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { ProtectedPage } from "../components/Layout/middleware";
import { useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Combobox, Transition } from "@headlessui/react";
import Timetable from "@/components/timetable";
import axios from "axios";
import { Button, Spinner } from "flowbite-react";
import { handleClientScriptLoad } from "next/script";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const { user } = useSelector((state) => state.user);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showSlots, setShowSlots] = useState(false);

  const [timeslots, setTimeslots] = useState([]);

  const [sections, setSections] = useState([]);

  const [sectionIndices, setSectionIndices] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL_LOCAL}/api/meetingtimes`
        );

        setTimeslots(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    console.log(sectionIndices);
  }, [sectionIndices]);

  const handleGenerateTimetable = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL_LOCAL}/api/timetable_generation`
      );

      setSectionIndices(
        res.data.sections.reduce((acc, curr) => {
          acc[curr.section] = acc[curr.section] + 1 || 1;
          return acc;
        }, {})
      );

      setSections(res.data.sections);
      setData(res.data.schedule);
      console.log(res.data.schedule);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>GeeksBee | Timetables</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div className="w-full py-2 px-2"></div> */}

      <main className="overflow-visible   ">
        <div className="w-screen md:w-full bg-white z-10 sticky top-0 md:py-1">
          <Navbar headerName="Dashboard" />
        </div>

        <div className="flex flex-col  h-full   md:flex-row mb-4 bg-white">
          <div className="md:w-9/12 w-full  px-10">
            <div className="w-full mt-2 xs:px-4 h-full ">
              <div className="w-full flex justify-end gap-3 py-3 px-6">
                <Button
                  className="bg-blue-500 h-[2.5rem] w-[10rem] "
                  onClick={() => setShowSlots((prev) => !prev)}
                >
                  {!showSlots ? "Show Time Slots" : "Hide Time Slots"}
                </Button>

                <Button
                  onClick={handleGenerateTimetable}
                  className="bg-blue-500 pl-8 h-[2.5rem]"
                >
                  Generate Timetable
                  <Spinner
                    aria-label="Default status example"
                    className={loading ? "opacity-100 ml-2" : "opacity-0 ml-2"}
                  />
                </Button>
              </div>
              <div className="w-[97%] ml-2 shadow-shad-prime rounded-2xl ">
                <div className="w-full px-[1rem] py-[0.1rem] xs:px-1 mr-2 h-full  ">
                  <div className="h-full w-[100%] xs:w-full">
                    {showSlots && (
                      <Timetable
                        slots={true}
                        data={timeslots}
                        header="Available Time Slots"
                        setData={setTimeslots}
                      />
                    )}

                    {data.length > 0 ? (
                      <>
                        {data.filter((item) => item.section === "sec-1")
                          .length > 0 && (
                          <Timetable
                            header="Section 1"
                            data={data.filter(
                              (item) => item.section === "sec-1"
                            )}
                          />
                        )}

                        {data.filter((item) => item.section === "sec-2")
                          .length > 0 && (
                          <Timetable
                            header="Section 2"
                            data={data.filter(
                              (item) => item.section === "sec-2"
                            )}
                          />
                        )}

                        {data.filter((item) => item.section === "sec-3")
                          .length > 0 && (
                          <Timetable
                            header="Section 3"
                            data={data.filter(
                              (item) => item.section === "sec-3"
                            )}
                          />
                        )}

                        {data.filter((item) => item.section === "sec-4")
                          .length > 0 && (
                          <Timetable
                            header="Section 4"
                            data={data.filter(
                              (item) => item.section === "sec-4"
                            )}
                          />
                        )}

                        {data.filter((item) => item.section === "sec-5")
                          .length > 0 && (
                          <Timetable
                            header="Section 5"
                            data={data.filter(
                              (item) => item.section === "sec-5"
                            )}
                          />
                        )}

                        {/* {sections.map((section) => {
                          return (
                            <Timetable
                              header={section}
                              data={data.filter(
                                (item) => item.section === section
                              )}
                            />
                          );
                        })} */}
                        {/* {Array.from(sections).map((section) => {
                          return String(section);
                        })} */}
                      </>
                    ) : (
                      <Timetable data={[]} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-3/12 p-4 md:pt-4 md:p-6 pb-0 w-full">
            <div className="shadow-4xl rounded-2xl flex flex-col items-center p-6 h-[82vh]">
              <div className="flex items-center w-full self-start">
                <div className="w-full">
                  <h1 className="text-base font-semibold">Reminders</h1>
                  <div className="overflow-scroll flex-col py-12 text-center w-full flex justify-center items-center">
                    <div>
                      <img
                        src={`https://www.svgrepo.com/show/97068/empty-box.svg`}
                        height={80}
                        width={80}
                        className="h-16"
                      />
                    </div>
                    <div className="text-black">No Reminders</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// export const getServerSideProps = ProtectedPage(async (_ctx) => {
//   return {
//     props: {},
//   };
// });

export default Home;
