import React, { useContext } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Login from "../components/Login";
import { Center } from "@chakra-ui/layout";
import { AuthContext } from "../context/AuthContext";

const Home: NextPage = () => {
  const user = useContext(AuthContext);

  return (
    <>
      {!user ? (
        <Center>
          <Login />
        </Center>
      ) : (
        <h2 className="mt-4 text-center">Welcome {user.email}</h2>
      )}
    </>
  );
};

export default Home;
