import React, { useEffect, useContext } from "react";
import type { NextPage } from "next";
import { Text, Flex, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Login from "../components/Login";
import { Center } from "@chakra-ui/layout";
import { AuthContext } from "../context/AuthContext";
import Router from "next/router";

const Home: NextPage = () => {
  const user = useContext(AuthContext);
  useEffect(() => {
    if (user) Router.push("/dashboard");
  }, [user]);

  return (
    <>
      {!user ? (
        <Center>
          <Login />
        </Center>
      ) : (
        <Flex pt={24} align="center" justify="center">
          <Spinner size="xl" label="Loading outbox" />
        </Flex>
      )}
    </>
  );
};

export default Home;
