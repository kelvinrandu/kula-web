import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Login from '../src/components/Login'
import {  Center } from "@chakra-ui/layout";

const Home: NextPage = () => {
  return (
    <Center>

      <Login />
    </Center>
   
  )
}

export default Home
