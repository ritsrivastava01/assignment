const Filters = () => {
  return (
    <div className="flex gap-4">
      <select className="border-2 border-gray rounded-full p-4">
        <option>Filter</option>
        <option>Filter 1</option>
        <option>Filter 2</option>
        <option>Filter 3</option>
      </select>
      <button className="border-2 border-vibrant-blue rounded-full text-vibrant-blue flex items-center p-4 text-base">
        Latest Added
      </button>
    </div>
  );
};

export default Filters;
