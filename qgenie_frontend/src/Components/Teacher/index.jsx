import { NavLink, Outlet } from "react-router-dom";
import { teacherElements } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { collapseUpdate } from "../../Redux/Slices/TeacherLayout";
import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";

function TeacherLayout() {
    let {collapse,heading,subheading} = useSelector(state => state.teacher);
    let dispatch = useDispatch();

    const collapsefun=() => {
        dispatch(collapseUpdate());
    }


    return (
        <div id="TeacherLayout" className="flex flex-row">
            <aside className={collapse ? "border-r-3 border-gray-600 w-2/13 h-screen flex-col p-1.5 bg-emerald-900" : "border-r-3 border-gray-600 w-1/20 h-screen flex-col p-2.5 bg-emerald-900"} >
                {collapse ? <img src="../public/Qgenie_horizontal.png" alt="Qgenie-logo" className="w-10/12"/>
                          : <img src="../public/Qgenie_logo.png" alt="Qgenie-logo" className="w-12/12"/>
                }

                <section className="flex-col h-10/12 p-1.5 pt-5 w-11/12">
                    {teacherElements.map(i => {
                        return (
                            <NavLink to={i.to} key={i.heading} className={({isActive}) => (isActive ? "text-blue-700 " : "")}>
                                <div className="flex flex-row items-center gap-2.5 font-bold text-2xl pb-9">
                                    <i.icons />
                                    {collapse && <div>{i.heading}</div>}
                                </div>
                            </NavLink>
                        )
                    })}
                </section>

                <button onClick={collapsefun} className="flex flex-row items-center">
                    {collapse ? <IoIosArrowBack /> : <IoIosArrowForward />}
                    <div>{collapse ? "Collapse" : "" }</div>
                </button>
            </aside>


            <main className={collapse ? "bg-emerald-100 w-11/13" : "bg-emerald-100 w-19/20"}>
                <header className="flex flex-col border-b-2 border-b-gray-500 py-3.5 items-center bg-emerald-200">
                    <strong className="text-3xl">{heading}</strong>
                    <p className="text-xl">{subheading}</p>
                </header>

                <Outlet />
            </main>

        </div>
    )
}

export default TeacherLayout;