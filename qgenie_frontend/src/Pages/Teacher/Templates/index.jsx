import { useDispatch } from "react-redux";
import { headingUpdate } from "../../../Redux/Slices/TeacherLayoutSlice";
import { useEffect } from "react";
import { Button, Table, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { MdEdit, MdDelete  } from "react-icons/md";
import { BiExpandAlt } from "react-icons/bi";
import ViewTemplateDetails from "../../../Components/Teacher/Templates/ViewTemplate";

    let {confirm} = Modal;

function TeacherTemplatesPage() {
    const [TempData, setTempData] = useState();
    const [viewDetails, setViewDetails] = useState(false);
    const [viewTempId, setViewTempId] = useState();

    let navigate = useNavigate();
    let dispatch = useDispatch();

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
        },
        {
            title: 'Grade Level',
            dataIndex: 'gradelevel',
            key: 'grade level',
        },
        {
            title: 'Created On',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt) => {
                const date = new Date(createdAt);
        
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const year = String(date.getFullYear()).slice(-2);
        
                return `${day}/${month}/${year}`;
            }           
        },
        {
            title: 'Actions',
            key: 'actions',
            width: "120px",
            render: (_,record) => {
                return(
                    <div className="flex flex-row gap-4">
                        <BiExpandAlt className="text-green-300" onClick={() => viewTempDetails(record)} />
                        <MdEdit className="text-blue-300" onClick={() => navigate('/teacher/templates/create', { state: record})} />
                        <MdDelete className="text-red-300" onClick={() => showDeleteConfirm(record)} />
                    </div>
                )
            }
        },
    ];

    const viewTempDetails = (item) => {
        setViewDetails(!viewDetails);
        setViewTempId(item?._id);
    }

    const showDeleteConfirm = (item) => {
        confirm({
            title: 'Are you sure delete this template?',
            // content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                try {
                    let response = await axios({
                        url: `${import.meta.env.VITE_API_URL}/template/delete/${item._id}`,
                        method: "POST",
                        headers: { Authorization: `${localStorage.getItem("teacherToken")}` }
                    })
        
                    console.log(response); 
        
                    if(response?.data?.status == 200) {
                        toast.success(response?.data?.message);
                        fetchTemplateData();
                        return; 
                    }
        
                    toast.error(response?.data?.message);
                } catch (error) {
                    console.log(error);
                    toast.error(error.message);
                }
            },
           
        });
    };

    const fetchTemplateData = async () => {
        try {
            let response = await axios({
                url: `${import.meta.env.VITE_API_URL}/template/getAll`,
                method: "GET",
                headers: { Authorization: `${localStorage.getItem("teacherToken")}` }
            })

            console.log(response);
            setTempData(response?.data?.data)
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchTemplateData();
    },[]);

    useEffect(() => {
        dispatch(headingUpdate({heading:"Templates", subheading:"This is the place where you can manage your templates"}));
    },[dispatch]);

    return (
        <div id="TeacherTemplates">
            <Button type="primary" className="w-2/12" onClick={() => navigate('/teacher/templates/create')}>Create Template</Button>
            <Table columns={columns} dataSource={TempData} rowKey="_id"/>
            {viewDetails && <ViewTemplateDetails id={viewTempId} setViewDetails={setViewDetails}/>}
        </div>
    )
}

export default TeacherTemplatesPage;