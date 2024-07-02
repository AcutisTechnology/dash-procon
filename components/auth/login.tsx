"use client";

import { createAuthCookie } from "@/actions/auth.action";
import { LoginSchema } from "@/helpers/schemas";
import { LoginFormType } from "@/helpers/types";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const Login = () => {
  const router = useRouter();

  const initialValues: LoginFormType = {
    email: "",
    password: "",
  };

  const handleLogin = useCallback(
    async (values: LoginFormType) => {
      try {
        const response = await axios.post("http://localhost:3000/login", {
          email: values.email,
          password: values.password,
        });

        if (response.status === 200 && response.data) {
          localStorage.setItem("userData", JSON.stringify(response.data.user));
          localStorage.setItem("token", JSON.stringify(response.data.token));
          await createAuthCookie();

          router.replace("/");
        } else {
          console.error("Falha ao fazer login");
        }
      } catch (error) {
        console.error("Erro ao fazer login:", error);
      }
    },
    [router]
  );

  return (
    <>
      <div className="text-center text-[25px] font-bold mb-6">Entrar</div>

      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className="flex flex-col w-1/2 gap-4 mb-4">
              <Input
                variant="bordered"
                label="Email"
                type="email"
                value={values.email}
                isInvalid={!!errors.email && !!touched.email}
                errorMessage={errors.email}
                onChange={handleChange("email")}
              />
              <Input
                variant="bordered"
                label="Password"
                type="password"
                value={values.password}
                isInvalid={!!errors.password && !!touched.password}
                errorMessage={errors.password}
                onChange={handleChange("password")}
              />
            </div>

            <Button
              onPress={() => handleSubmit()}
              variant="flat"
              color="primary"
              className="w-1/2"
            >
              Login
            </Button>
          </>
        )}
      </Formik>

      {/* <div className="font-light text-slate-400 mt-4 text-sm">
      Don&apos;t have an account ?{" "}
      <Link href="/register" className="font-bold">
        Register here
      </Link>
    </div> */}
    </>
  );
};
