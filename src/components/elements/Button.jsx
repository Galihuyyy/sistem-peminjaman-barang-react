const Button = (props) => {
    const {children, variant = "primary", onClick, type = "button"} = props

  return (
    <button className={`btn btn-${variant} w-full`} type={type} onClick={onClick}>{children}</button>
  )
}

export default Button
