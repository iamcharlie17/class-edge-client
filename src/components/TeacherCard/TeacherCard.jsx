const TeacherCard = ({ teacher }) => {
  const { name, title, image } = teacher || {};
  return (
    <>
      <div className="w-full overflow-hidden bg-white rounded-lg shadow-lg hover:scale-95 transition-transform dark:bg-gray-800">
        <img src={image} className="object-cover w-full h-64" alt="" />
        <div className="py-5 text-center">
          <a
            href="https://www.linkedin.com/feed/"
            target="_blank"
            className="block text-xl font-bold text-gray-800 dark:text-white"
            role="link"
          >
            {name}
          </a>
          <span className="text-sm text-gray-700 dark:text-gray-200">
            {title}
          </span>
        </div>
      </div>
    </>
  );
};

export default TeacherCard;
