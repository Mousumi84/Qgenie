import { NavLink } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Sidebar({Elements, collapse, collapsefun, role}) {
    const navigate = useNavigate();
    const styles = {
        teacher: {
          border: "border-green-300",
          activeText: "text-green-500",
          hoverText: "hover:text-green-500",
          bgColor: "bg-green-200",
        },
        student: {
          border: "border-indigo-300",
          activeText: "text-indigo-600",
          hoverText: "hover:text-indigo-600",
          bgColor: "bg-indigo-200",
      },
    };

const currentStyle = styles[role];
console.log(currentStyle);

    return (
        <aside className={collapse ? `border-r-3 ${currentStyle.border} w-2/13 h-screen flex-col p-1.5 ${currentStyle.bgColor} fixed` : `border-r-3 ${currentStyle.border} w-1/20 h-screen flex-col p-1.5 ${currentStyle.bgColor} fixed`} >
            <div className="h-1/10 flex items-center justify-center" onClick={() => navigate("/")}>
            {collapse ? <img src="/Qgenie_transparent.png" alt="Qgenie-logo" className=" h-9/12"/>
                         : <img src="/Qgenie_logo_transparent.png" alt="Qgenie-logo" />}
            </div>

            <section className="flex-col h-8/10 p-1.5 pt-5">
                {Elements.map(i => {
                    return (
                        <NavLink to={i.to} key={i.heading} className={({isActive}) => (isActive ? `${currentStyle.activeText}` : `text-gray-400 ${currentStyle.hoverText}`)}>
                            <div className="flex flex-row items-center gap-2.5 font-bold text-xl pb-9">
                                <i.icons />
                                {collapse && <div>{i.heading}</div>}
                            </div>
                        </NavLink>
                    )
                })}
            </section>
            
            <button onClick={collapsefun} className="flex flex-row items-center text-gray-400">
                {collapse ? <IoIosArrowBack size={22} /> : <IoIosArrowForward size={22} />}
                <div className="text-l">{collapse ? "Collapse" : "" }</div>
            </button>
        </aside>
    )
}

export default Sidebar;