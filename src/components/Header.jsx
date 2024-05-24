import Button from "./Button"
import LogoIcon from "../assets/Logo-icon.png"
import LogoText from "../assets/Logo-text.svg"

const Header = () => {
    return (
        <div className="flex justify-between max-w-[1110px] mx-auto px-3 my-6 h-14 sm:px-4">
            <div>
                <a href="/" className="flex">
                    <img src={LogoIcon} alt="Logo"/>
                    <img src={LogoText} alt="Cascade" />
                </a>
            </div>
            <div className="flex gap-3">
                <Button className="text-accent1 border-2 border-accent1 px-[22px] py-[14px]" href="/login">Log in</Button>
                <Button className="text-white bg-accent1 hidden sm:block" href="/register">Register</Button>
            </div>
        </div>
    )
}

export default Header
