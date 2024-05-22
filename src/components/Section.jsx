const Section = (props) => {
  return (
    <div className={`max-w-[1110px] mx-auto px-6 sm:px-4 ${props.className}`} id={props.id}>
      {props.children}
    </div>
  )
}

export default Section
