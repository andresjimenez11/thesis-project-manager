"use client"; // ← Agregar esta línea importante

import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";

// Mover la configuración dentro del componente o a un useEffect
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Configurar Amplify dentro del componente
  React.useEffect(() => {
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
          userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "",
        },
      },
    });
  }, []);

  const formFields = {
    signUp: {
      username: {
        order: 1,
        placeholder: "Choose a username",
        label: "Email",
        inputProps: { required: true },
      },
      password: {
        order: 2,
        placeholder: "Enter your password",
        label: "Password",
        inputProps: { type: "password", required: true },
      },
      confirm_password: {
        order: 3,
        placeholder: "Confirm your password",
        label: "Confirm Password",
        inputProps: { type: "password", required: true },
      },
    },
  };

  return (
    <Authenticator formFields={formFields}>
      {({ user }) =>
        user ? (
          <>{children}</>
        ) : (
          <div>
            <h1>Please sign in below:</h1>
          </div>
        )
      }
    </Authenticator>
  );
};

export default AuthProvider;
