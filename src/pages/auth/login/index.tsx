import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { api } from "../../../services/api";
import Router, { useRouter } from "next/router";
import { toast } from "react-nextjs-toast";
import dayjs from "dayjs";
const LoginPage: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname, asPath, push, query } = useRouter();
  useEffect(() => {
    if (!!asPath && !!pathname && typeof window !== undefined) {
      const value = localStorage.getItem("@token");
      const date = localStorage.getItem("@timestampToken");
      const typeUser = localStorage.getItem("@typeUser");
      const isValid =
        value &&
        dayjs(date).toDate().getDate() === dayjs(new Date()).toDate().getDate();

      if (!!typeUser && typeUser == "admin" && !!isValid) {
        push(`/painel/admin`);
      }
      if (!!typeUser && typeUser == "consultant" && !!isValid) {
        push(`/painel/consultant`);
      }
      setLoading(false)
    }
  }, [typeof window, query, asPath]);

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);
    const response = await api.post("/consultant/signin", {
      ...data,
    });
    if (!!response.data?.message) {
      toast.notify(response.data?.message, {
        title: "error",
      });
      setLoading(false);
    } else {
      localStorage.setItem("@token", response?.data?.accessToken);
      localStorage.setItem(
        "@timestampToken",
        dayjs(new Date()).toDate().toString()
      );
      localStorage.setItem(
        "@typeUser",
        !!response.data.user.isMaster ? "admin" : "consultant"
      );
      localStorage.setItem("@userId", response.data.user.id);
      Router.replace(
        `/painel/${!!response.data.user.isMaster ? "admin" : "consultant"}`
      );
    }
 
  };

  return (
    <>
      <div className="min-h-screen bg-blue-900 flex flex-col justify-center items-center">
        <img src="/img/logo.png" alt="logo" />
        <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300 rounded">
          <form
            action=""
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="" className="text-sm font-bold text-gray-600 block">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
              {...register("email")}
            />

            <label htmlFor="" className="text-sm font-bold text-gray-600 block">
              Senha
            </label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
              {...register("password")}
            />

            <button className="w-full py-2 px-4 bg-blue-900 hover:bg-blue-800 rounded-md text-white text-sm">
              Entrar
            </button>
          </form>
        </div>
      </div>
      <div className={loading ? "loader" : ""} />
    </>
  );
};

export default LoginPage;
