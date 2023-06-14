import React, { useEffect, useState } from "react";
import App from "../components/App";
import { Text, Flex, Spinner } from "@chakra-ui/react";
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
import { Firestore } from "../firebase/index";
import RestaurantSingle from "../components/RestaurantSingle";

interface Props {}
const Restaurant: React.FC<Props> = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getOrders();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const getOrders = async () => {
    const ordersCollection = collection(Firestore, "restaurants");
    const _orders: any = [];
    const docsSnap = await getDocs(ordersCollection);
    docsSnap.forEach((doc) => {
      _orders.push(doc?.data());
    });
    console.log("orders", _orders);
    setOrders(_orders);
  };
  console.log(orders);
  return (
    <App>
      <Text mb={2} fontSize="sm">
        {"All "}
        <b>{"Restaurants"}</b>
      </Text>
      {orders.length ? (
        orders.map((order, key) => <RestaurantSingle order={order} key={key} />)
      ) : (
        <Text>no items</Text>
      )}
      <Flex justify="flex-end" as="i" color="gray.500">
        {`Showing ${orders.length} out of ${orders.length} items `}
      </Flex>
    </App>
  );
};
export default Restaurant;