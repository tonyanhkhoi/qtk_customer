"use client";
import React from "react";
import Container from "react-bootstrap/Container";
import HistoryTable from "@/components/historytable";
import { Col, Row } from "react-bootstrap";
import UserSidebar from "@/components/UserSidebar";
import { useRouter } from "next/navigation";

const history: React.FC = () => {
  const router = useRouter();
  router.replace("user/account");
  return (
    <></>
  );
};

export default history;
