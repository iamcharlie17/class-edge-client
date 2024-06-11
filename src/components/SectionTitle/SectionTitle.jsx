const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="my-4">
      <h1 className="text-2xl md:text-5xl font-semibold text-gray-500">{heading}</h1>
      <p className="md:text-2xl text-gray-400">{subHeading}</p>
    </div>
  );
};

export default SectionTitle;
