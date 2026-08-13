import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { collapseUpdate } from "../../../Redux/Slices/TeacherLayoutSlice";
import Sidebar from "../../Common/Layout/Sidebar";
import Header from "../../Common/Layout/Header";
import { teacherElements } from "./Elements";

function TeacherLayout() {
  let { collapse, heading, subheading } = useSelector((state) => state.teacher);
  let dispatch = useDispatch();
  let localCollapse = JSON.parse(localStorage.getItem("Collapsed"));

  console.log("Teacher Layout", collapse, localCollapse);

  const collapseFun = () => {
    dispatch(collapseUpdate());
  };

  return (
    <div id="TeacherLayout" className="flex flex-row">
      <Sidebar Elements={teacherElements} collapse={localCollapse} collapseFun={collapseFun} role="teacher" />

      <main className={localCollapse ? " w-11/13 absolute right-0" : " w-19/20 absolute right-0"}>
        <Header heading={heading} subheading={subheading} role="teacher" />
        <div className="p-4 relative top-16">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default TeacherLayout;
