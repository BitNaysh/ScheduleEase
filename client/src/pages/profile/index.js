import React, { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../../components/Layout/Navbar";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { ProtectedPage } from "../../components/Layout/middleware";
import StateSelector from "../../components/helper/StateSelector";
import Form from "../../components/Organizations/Form";
import { CreateOrganizationBaseJson } from "../../components/Organizations/util/CreateOrganizationJson";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { organisation } = useSelector((state) => state.user);
  const [profile, setProfile] = useState(CreateOrganizationBaseJson);

  useEffect(() => {
    (async () => {
      try {
        setProfile(organisation);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [organisation, dispatch]);

  return (
    <div>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="./favicon.ico" />
      </Head>

      <div className="w-full py-2 px-2"></div>

      <main className="w-full relative overflow-hidden">
        <Navbar headerName="Profile" />

        <Form profile={profile} setProfile={setProfile} />
      </main>
    </div>
  );
};

export const getServerSideProps = ProtectedPage(async (_ctx) => {
  return {
    props: {},
  };
});

export default Home;
