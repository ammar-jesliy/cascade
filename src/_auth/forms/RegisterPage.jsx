import Task1Svg from "../../assets/Task-bro.svg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../../assets/styles.css";
import {
  useCreateUserAccountMutation,
  useSignInAccountMutation,
} from "../../lib/react-query/queriesAndMutations";
import { useUserContent } from "../../context/AuthContext";
import { useState } from "react";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const { isLoading: isUserLoading, checkAuthUser } = useUserContent();
  const navigate = useNavigate();

  const { mutateAsync: createUserAccount, isPending } =
    useCreateUserAccountMutation();

  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccountMutation();

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    const newUser = await createUserAccount(data);

    if (!newUser) {
      console.log("sign up failed!");
      setErrorMessage("Email already in use.");
      return;
    }

    const session = await signInAccount({
      email: data.email,
      password: data.password,
    });

    if (!session) {
      console.log("sign-in failed");
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      reset();

      navigate("/app");
    } else {
      console.log("Sign-in failed");
    }
  };

  return (
    <div className="flex lg:justify-between justify-center items-center mt-20">
      <div className="flex flex-col items-center w-full sm:w-auto">
        <div className="flex flex-col items-center mb-11">
          <h1 className="text-primary font-amaranth font-normal leading-[100%] text-[38px] sm:text-[48px]">
            Sign up
          </h1>
          <p className="text-secondary text-[14px] sm:text-[16px] font-normal">
            To use cascade, please enter your details.
          </p>
        </div>
        <form
          className="flex flex-col gap-6 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-1">
            <label
              htmlFor="name"
              className="text-base text-primary font-normal sm:text-xl"
            >
              Name
            </label>
            <input
              {...register("name")}
              type="text"
              name="name"
              id="name"
              required
              className="rounded-2xl h-12 sm:w-96 bg-accent2 px-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-base text-primary font-normal sm:text-xl"
            >
              Email address
            </label>
            <input
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  message: "Invalid e-mail address",
                },
              })}
              type="email"
              name="email"
              id="email"
              required
              className="rounded-2xl h-12 sm:w-96 bg-accent2 px-2"
            />
            {errors.email && (
              <div className="text-red-600 text-sm">{errors.email.message}</div>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="password"
              className="text-base text-primary font-normal sm:text-xl"
            >
              Password
            </label>
            <input
              {...register("password", {
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
              })}
              type="password"
              name="password"
              id="password"
              required
              className="rounded-2xl h-12 sm:w-96 bg-accent2 px-2"
            />
            {errors.password && (
              <div className="text-red-600 text-sm">
                {errors.password.message}
              </div>
            )}
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="rounded-2xl h-16 w-full sm:w-96 bg-accent1 text-white text-xl font-bold"
          >
            {isPending ? "Loading..." : "Sign-up"}
          </button>
          <p className="text-red-600 text-sm self-center mt-[-14px]">
            {errorMessage}
          </p>
        </form>
        <p className="text-sm sm:text-base font-normal text-secondary my-3">
          Already have an account?{" "}
          <a href="/login" className="text-accent1">
            Log in
          </a>
        </p>
      </div>

      <div>
        <img
          src={Task1Svg}
          alt=""
          className="w-[500px] h-[500px] hidden lg:block"
        />
      </div>
    </div>
  );
};

export default RegisterPage;
