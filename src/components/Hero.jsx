import Section from "./Section";
import Button from "./Button";
import demoImg from "../assets/demo.png"
import mobileDemoImg from "../assets/Mobile-demo.png"

const Hero = () => {
  return (
    <Section id="hero">
      <div className="flex flex-col items-center gap-6 sm:gap-8">
        <h1 className="font-bold font-amaranth text-[38px] text-primary text-center sm:text-[64px] sm:max-w-[700px] mt-20 leading-[100%]">
          WHERE ORGANIZATION MEETS SIMPLICITY.
        </h1>

        <p className="text-center text-secondary font-inter text-[16px] sm:text-[20px] sm:max-w-[485px]">
          Stay organized and on top of your workload with our app's easy-to-use
          task management features.
        </p>

        <Button className="bg-accent1 text-white w-[180px]" href="/register">
          Get Started
        </Button>
      </div>

      <div className="z-10 max-w-[380px] my-16 relative mx-auto md:max-w-max md:px-6">
        <div className="bg-white z-10 border-2 border-[rgba(0, 0, 0, 0.5)] rounded-3xl">
          <img src={demoImg} alt="Demo"
            className="rounded-3xl hidden md:block"
          />
          <img src={mobileDemoImg} alt="Mobile Demo"
            className="rounded-2xl block md:hidden"
          />
        </div>
        <div className="absolute z-[-1] w-[90%] h-[90%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-accent1 blur-3xl opacity-80"></div>
      </div>
    </Section>
  );
};

export default Hero;
