
const Input = (props) => {
    const {children, type = "text", name, style, onChange, value} = props

    return (
        <div className={`relative z-0 w-full group ${style}`}>
            <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            placeholder=" "
            required
            className={`block py-2.5 ps-4 text-2xl w-full text-gray-900 bg-transparent border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-300 peer rounded-pill`}
            />
            <label
            htmlFor={name}
            className="peer-focus:font-medium absolute text-xl left-4 text-gray-500 duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-80 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10"
            >
            {children}
            </label>
        </div>


        
    )
}

export default Input
