"use client";
import React, { useState } from "react";
import { Nav, Button } from "react-bootstrap";
import { usePathname, useRouter } from "next/navigation";

const navigation = [
  { title: "User", href: "account" },
  { title: "History", href: "history" },
  { title: "Setting", href: "accountinfo" },
];
const UserSidebar: React.FC = () => {
  const router = useRouter();
  const path = usePathname();
  return (
    <Nav className="flex-column mt-36">
      {navigation.map((value, index) => (
        <Button
          variant={
            path.split("/")[path.split("/").length - 1] == value.href
              ? "success"
              : "light"
          }
          onClick={() => router.push(value.href)}
          className="mb-2"
        >
          {value.title}
        </Button>
      ))}
    </Nav>
  );
};

export default UserSidebar;
