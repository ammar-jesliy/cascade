import Task2Svg from '../../assets/Task-amico 1.svg';
import { Form, useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom';
import '../../assets/styles.css'
import { useSignInAccountMutation } from '../../lib/react-query/queriesAndMutations';
import { useUserContent } from '../../context/AuthContext';

const LoginPage = () => {
    const { register, handleSubmit, setError, formState: {errors, isSubmitting}, reset } = useForm();

    const { isLoading: isUserLoading, checkAuthUser } = useUserContent();
    const navigate = useNavigate();

    const { mutateAsync: signInAccount, isPending } = useSignInAccountMutation();

    const onSubmit = async (data) => {

        const session = await signInAccount({
            email: data.email,
            password: data.password,
        })

        if(!session) {
            console.log("sign-in failed");
        }

        const isLoggedIn = await checkAuthUser();

        if(isLoggedIn) {
            reset();

            navigate('/app')
        } else {
            console.log("Sign-in failed")
        }
    }


    return (
        <div className='flex lg:justify-between justify-center items-center mt-20'>
            <div className='flex flex-col items-center w-full sm:w-auto'>
                <div className='flex flex-col items-center mb-11'>
                    <h1 className='text-primary font-amaranth font-normal leading-[100%] text-[38px] sm:text-[48px]'>Log in</h1>
                    <p className='text-secondary text-[14px] sm:text-[16px] font-normal'>Welcome back! please enter your details.</p>
                </div>
                <form className='flex flex-col gap-6 w-full' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email" className='text-base text-primary font-normal sm:text-xl'>Email address</label>
                        <input 
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                                    message: 'Invalid e-mail address'
                                }
                            })}
                            type="email" 
                            name="email" 
                            id="email"
                            required
                            className='rounded-2xl h-12 sm:w-96 bg-accent2 px-2' />
                            {errors.email && <div className='text-red-600 text-sm'>{errors.email.message}</div>}
                    </div>
                    <div className='flex flex-col gap-1 w-full'>
                        <label htmlFor="password" className='text-base text-primary font-normal sm:text-xl'>Password</label>
                        <input 
                            {...register("password", {
                                minLength: {
                                    value: 8,
                                    message: "Password must have at least 8 characters"
                                }
                            })}
                            type="password" 
                            name="password" 
                            id="password"
                            required
                            className='rounded-2xl h-12 sm:w-96 bg-accent2 px-2' />
                        {errors.password && <div className='text-red-600 text-sm'>{errors.password.message}</div>}
                    </div>
                    <button disabled={isSubmitting} type="submit" className='rounded-2xl h-16 w-full sm:w-96 bg-accent1 text-white text-xl font-bold'>
                        {isUserLoading ? "Loading..." : "Log-in"}
                    </button>
                </form>
                <p className='text-sm sm:text-base font-normal text-secondary my-3'>Don't have an account? <a href="/register" className='text-accent1'>Sign up</a></p>
            </div>

            <div>
                <img src={Task2Svg} alt=""  className='w-[500px] h-[500px] hidden lg:block'/>
            </div>
        </div>
    )
}

export default LoginPage
