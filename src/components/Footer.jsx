import Button from "./Button";
import Section from "./Section";
import LogoIcon from "../assets/Logo-icon.png";
import LogoText from "../assets/Logo-text.svg";

const Footer = () => {
  return (
    <div className="w-full bg-accent2 rounded-t-[62px] mt-[120px]">
      <Section id="footer" className="pt-[65px] sm:pt-[90px] pb-7">
        <div>
          <div className="flex flex-col items-center gap-14 mb-20">
            <h3 className="text-primary font-amaranth font-normal text-[32px] leading-[100%] text-center sm:text-[45px] w-[90%]">
              Don’t wait any longer– <br />
              Sign up and begin your journey with us today!
            </h3>

            <Button
              className="bg-accent1 text-white w-[180px]"
              href="/register"
            >
              Get Started
            </Button>
          </div>
          <div className="w-full bg-[#ABA0F0] h-[2px]"></div>
          <div className="flex flex-wrap justify-center sm:flex-nowrap sm:items-center sm:justify-between mt-8 gap-8">
            <div>
              <a href="#home" className="flex">
                <img src={LogoIcon} alt="Logo" />
                <img src={LogoText} alt="Cascade" />
              </a>
            </div>
            <div className="flex w-full justify-between sm:w-[54%]">
              <p className="text-primary text-[10px] font-normal sm:text-[14px]">
                &copy; Cascade {new Date().getFullYear()}
              </p>
              <p className="text-primary text-[10px] font-normal sm:text-[14px]">
                Made with &#x2764; by{" "}
                <a
                  className="underline text-accent1"
                  href="https://ammarjesliy.netlify.app/"
                  target="_blank"
                >
                  Ammar
                </a>
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Footer;
