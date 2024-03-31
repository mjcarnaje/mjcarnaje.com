"use client";
import React from "react";

const ClientComponent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};

export default ClientComponent;
