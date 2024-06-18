const InfoText = (props) => {
  return (
    <div className="flex flex-col gap-7 md:gap-12 max-w-[420px] md:justify-center">
      <h2 className="font-amaranth text-primary text-[26px] font-normal sm:text-[32px]">
        {props.heading}
      </h2>
      <p className="font-inter text-secondary text-[16px] sm:text-[20px] font-normal">
        {props.text}
      </p>
    </div>
  );
};

export default InfoText;
