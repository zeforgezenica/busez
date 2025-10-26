import React from "react";
import AuthClient from "./AuthClient.client";

export const metadata = {
  title: "Auth - kadJeBus",
};

export default function AuthPage() {
  return (
    <React.Suspense fallback={null}>
      <AuthClient />
    </React.Suspense>
  );
}
