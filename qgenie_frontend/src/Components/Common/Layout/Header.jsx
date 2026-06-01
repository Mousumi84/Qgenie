function Header({heading, subheading,role}) {
    const styles = {
        teacher: {
          border: "border-green-200",
          headingText: "text-green-600",
          subheadingText: "text-green-400",
          bgColor: "bg-green-100",
        },
        student: {
          border: "border-indigo-200",
          headingText: "text-indigo-700",
          subheadingText: "text-indigo-400",
          bgColor: "bg-indigo-100",
      },
    };

const currentStyle = styles[role];
console.log(currentStyle);

    return(
        <header className={`px-4 py-1 border-b-2 ${currentStyle.border} ${currentStyle.bgColor} items-center`}>
            <strong className={`text-2xl ${currentStyle.headingText}`}>{heading}</strong>
            <p className={`text-l ${currentStyle.subheadingText}`}>{subheading}</p>
        </header>
    )
}

export default Header;