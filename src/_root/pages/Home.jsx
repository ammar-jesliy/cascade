import React, { useEffect, useState } from "react";
import { useSignOutAccountMutation } from "../../lib/react-query/queriesAndMutations";
import { useNavigate } from "react-router-dom";
import { useUserContent } from "../../context/AuthContext";

const Home = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccountMutation();
  const navigate = useNavigate();
  const { user } = useUserContent;

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess]);

  return (
    <>
      <div className="bg-bgApp flex items-center justify-center flex-1 h-[calc(100vh-100px)] lg:w-[calc(100vw-320px)] w-screen overflow-auto mt-[100px] pl-8 pb-8 lg:ml-[320px] ">
        <p className="font-bold text-xl text-center w-[60%] text-primary">
          Dive into your tasks and make progress today. <br /> Start where you
          left off and achieve your goals!
        </p>
      </div>
    </>
  );
};

export default Home;
