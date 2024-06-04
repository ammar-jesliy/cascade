import "../assets/spinner.css";

const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-2">
      <div className="spinner" role="status"></div>
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Spinner;
