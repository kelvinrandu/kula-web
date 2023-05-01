import React, { useEffect, useState } from "react";
import { Text, Flex, Spinner } from "@chakra-ui/react";
import OrderSingle from "../components/OrderSingle";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  limit,
  query,
  QueryDocumentSnapshot,
  updateDoc,
  where,
} from "@firebase/firestore";
import { Firestore} from "../firebase/index";


import App from "../components/App";

interface Props {}
const Dashboard: React.FC<Props> = () => {
    const [orders, setOrders] = useState<QueryDocumentSnapshot<DocumentData>[]>(
      []
    );
     const [loading, setLoading] = useState<boolean>(true);
      useEffect(() => {
        getOrders();
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }, []);

    

      const getOrders = async () => {
  
   const ordersCollection = collection(Firestore, "orders");
        // const citiesRef = Firescollection("cities");
        // const snapshot = await citiesRef.get();
        // snapshot.forEach((doc) => {
        //   console.log(doc.id, "=>", doc.data());
        // });
        // const ordersQuery = query(
        //   ordersCollection,
        //   where("user", "==", "admin2@gmail.com"),
        //   limit(10)
        // );
        // const querySnapshot = await getDocs(ordersQuery);
        // const result: QueryDocumentSnapshot<DocumentData>[] = [];
        // // querySnapshot.forEach((snapshot) => {
        //   querySnapshot.forEach((doc) => {
        //   result.push(doc);

        //   setOrders(result);
        // });
        // setOrders(result);
      };
      console.log(orders)


  return (
    <App>
      <Text mb={2} fontSize="sm">
        {"Active "}
        <b>{"Orders"}</b>
      </Text>
      {orders.length ? (
        orders.map((order) => <OrderSingle />)
      ) : (
        <Text>no items</Text>
      )}

      <Flex justify="flex-end" as="i" color="gray.500">
        {`Showing 2 out of all items `}
      </Flex>
    </App>
  );
};

export default Dashboard;
