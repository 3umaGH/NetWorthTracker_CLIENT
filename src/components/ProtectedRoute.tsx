import React, { useEffect } from "react";
import { FirebaseAuth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!FirebaseAuth.currentUser) return navigate("/");
  });

  return children;
};
