const Button = (props) => {

    const classes = `text-base w-[110px] px-6 py-4 font-inter font-semibold rounded-[25px] hover:opacity-80 transition duration-200 ${props.className}`

  return (
    <button className={classes}>
        <a href={props.href}>
            <span>{props.children}</span>
        </a>
    </button>
  )
}

export default Button;
