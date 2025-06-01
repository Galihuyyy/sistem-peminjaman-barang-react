const Card = (props) => {
    const {title, width = "25rem" , children, style} = props

  return (
    <div className={`card ${style}`} style={{ width:width }}>
      <h1 className="card-title text-center my-4">{title}</h1>
      <div className="card-body">
        {children}
      </div>
    </div>
  )
}

export default Card