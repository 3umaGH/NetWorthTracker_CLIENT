import React, { useEffect, useState } from "react";
import { FirebaseAuth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();

  // Give firebase some time to fetch current user and then check if user is actually logged in.
  useEffect(() => {
    setTimeout(() => {
      if (!FirebaseAuth.currentUser) return navigate("/");
      setRefresh(refresh + 1);
    }, 500);
  },[]);

  if (FirebaseAuth.currentUser) return children;
};
