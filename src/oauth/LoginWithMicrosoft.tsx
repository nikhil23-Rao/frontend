import React from "react";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import MicrosoftLogin from "react-microsoft-login";
import { OAUTH_LOGIN_USER } from "../apollo/Mutations";
import { MicrosoftLoginButton } from "../components/MicrosoftLoginButton";

export const LoginWithMicrosoft = () => {
  const [OAuthLogin] = useMutation(OAUTH_LOGIN_USER, {
    onCompleted: ({ OAuthLogin: jwt }) => {
      localStorage.setItem("token", jwt);
      window.location.href = "/home";
    },
    onError: (err) => {
      return toast.error(err.message);
    },
  });
  const onSuccess = (_: any, data: any) => {
    OAuthLogin({
      variables: {
        username: data.account.name,
        email: data.account.userName,
      },
    });
  };

  return (
    <MicrosoftLogin
      clientId="c2b07c10-b196-4e60-87ca-b8c57ebde171"
      authCallback={onSuccess}
      children={<MicrosoftLoginButton />}
      redirectUri="http://localhost:3000/login"
    />
  );
};
