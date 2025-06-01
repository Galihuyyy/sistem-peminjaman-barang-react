const Select = (props) => {
  const { children, name, required = true, style, title} = props;

  return (
      <div className="relative z-0 w-full mb-5 group">
          <select
              name={name}
              id={name}
              required={required}
              className={`block py-2.5 text-2xl text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-300 peer ${style}`}
          >
              {children}
              
          </select>
          <label
              htmlFor={name}
              className="peer-focus:font-medium absolute text-xl left-4 text-gray-500 duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-80 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10"
          >
            {title}
          </label>
      </div>
  );
};

export default Select;
