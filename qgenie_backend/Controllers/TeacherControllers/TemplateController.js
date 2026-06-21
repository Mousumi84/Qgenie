import { editTemplateInputs, getTemplates, getTemplateById, saveTemplateInputs, deleteTemplateById } from "../../Models/TeacherModels/TemplateModel.js";

const createTemplateController = async (req,res) => {
    console.log("Create Template");
    let templateInput = req.body;

    if(!templateInput) {
        return res.send({
            status: 400,
            message: "Required fields are missing",
        });
    }

    try {
        const data = await saveTemplateInputs({templateInput});
        
        return res.send({
            status: 201,
            message: "Template created successfully",
            data: data,
        });
    } catch (error) {
        return res.send({
            status: 500,
            message: "Internal server error",
            error: error
        });
    }
}

const editTemplateController = async (req,res) => {
    console.log("Edit Template",req.params.id,req.body);
    let id = req.params.id;
    let templateInput = req.body;

    try {
        const data = await editTemplateInputs({id, templateInput});
        return res.send({
            status: 200,
            message: `Update templat of id: ${data._id} successfully`,
            data: data,
        });
    } catch (error) {
        return res.send({
            status: 500,
            message: "Internal server error",
            error: error
        });
    }
} 

const getAllTemplateController = async (req,res) => {
    try {
        const data = await getTemplates();

        return res.send({
            status: 200,
            message: "Data fetched",
            data: data,
        });
    } catch (error) {
        return res.send({
            status: 500,
            message: "Internal server error",
            error: error
        });
    }
}

const getTemplateByIdController = async (req,res) => {
    console.log("get template by id: =>",req.params.id);
    const id = req.params.id;

    try {
        const data = await getTemplateById({id});

        return res.send({
            status: 200,
            message: "Data fetched",
            data: data,
        });
    } catch (error) {
        return res.send({
            status: 500,
            message: "Internal server error",
            error: error
        });
    }
}

const deleteTemplateController = async (req,res) => {
    console.log("delete template by id: =>",req.params.id);
    const id = req.params.id;

    try {
        const data = await deleteTemplateById({id});
        
        return res.send({
            status: 200,
            message: "Template deleted successfully",
        });
    } catch (error) {
        return res.send({
            status: 500,
            message: "Internal server error",
            error: error
        });
    }
}

export {createTemplateController, editTemplateController, getAllTemplateController, getTemplateByIdController, deleteTemplateController};