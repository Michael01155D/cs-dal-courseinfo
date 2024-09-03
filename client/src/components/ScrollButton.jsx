const ScrollButton = ({clickHandler, scrollDir}) => {
    const text = scrollDir == "forward" ? "->" : "<-";

    return (
        <button onClick={() => clickHandler(scrollDir)}>{text}</button>
    )
}

export default ScrollButton;