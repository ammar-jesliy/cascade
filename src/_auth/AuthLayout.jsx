import { Outlet, Navigate } from 'react-router-dom';
import Section from '../components/Section';
import LogoIcon from "../assets/Logo-icon.png";
import LogoText from "../assets/Logo-text.svg";
import { useUserContent } from '../context/AuthContext';

const AuthLayout = () => {

    const { isAuthenticated } = useUserContent();

    return (
        <>
            {isAuthenticated ? (
                <Navigate to="/app" />
            ) : (
                <>
                    <Section>
                        <div className='my-6'>
                            <a href="/" className="flex">
                                <img src={LogoIcon} alt="Logo"/>
                                <img src={LogoText} alt="Cascade" />
                            </a>
                        </div>
                        <Outlet/>
                    </Section>
                </>
            )}
        </>
    )
}

export default AuthLayout
