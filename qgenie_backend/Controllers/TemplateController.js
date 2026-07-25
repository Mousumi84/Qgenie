import { editTemplateInputs, fetchTemplates, fetchTemplateById, saveTemplateInputs, deleteTemplateById, fetchTemplatesByTeacher } from "../Models/TemplateModel.js";

const createTemplateController = async (req, res) => {
    console.log("Create Template");
    let templateInput = req.body;

    if (!templateInput) {
        return res.send({
            status: 400,
            message: "Required fields are missing",
        });
    }

    try {
        const data = await saveTemplateInputs({ templateInput });

        return res.send({
            status: 201,
            message: "Template created successfully",
            data: data,
        });
    } catch (error) {
        return res.send({
            status: error.status || 500,
            message: error.message || "Internal server error",
        })
    }
}

const editTemplateController = async (req, res) => {
    console.log("Edit Template", req.params.id, req.body);
    let id = req.params.id;
    let templateInput = req.body;

    try {
        const data = await editTemplateInputs({ id, templateInput });
        return res.send({
            status: 200,
            message: `Update templat successfully`,
            data: data,
        });
    } catch (error) {
        return res.send({
            status: error.status || 500,
            message: error.message || "Internal server error",
        })
    }
}

const getAllTemplatesController = async (req, res) => {
    try {
        const data = await fetchTemplates();

        return res.send({
            status: 200,
            message: "Data fetched",
            data: data,
        });
    } catch (error) {
        return res.send({
            status: error.status || 500,
            message: error.message || "Internal server error",
        })
    }
}

// Fetch all the templates created by a specific teacher
const getTeacherTemplatesController = async (req, res) => {
    let username = req.params.username;
    try {
        const data = await fetchTemplatesByTeacher({ username });

        return res.send({
            status: 200,
            message: "Data fetched",
            data: data,
        });
    } catch (error) {
        return res.send({
            status: error.status || 500,
            message: error.message || "Internal server error",
        })
    }
}

const getTemplateByIdController = async (req, res) => {
    console.log("get template by id: =>", req.params.id);
    const id = req.params.id;

    try {
        const data = await fetchTemplateById({ id });

        return res.send({
            status: 200,
            message: "Data fetched",
            data: data,
        });
    } catch (error) {
        return res.send({
            status: error.status || 500,
            message: error.message || "Internal server error",
        })
    }
}

const deleteTemplateController = async (req, res) => {
    console.log("delete template by id: =>", req.params.id);
    const id = req.params.id;

    try {
        const data = await deleteTemplateById({ id });

        return res.send({
            status: 200,
            message: "Template deleted successfully",
        });
    } catch (error) {
        return res.send({
            status: error.status || 500,
            message: error.message || "Internal server error",
        })
    }
}

export { createTemplateController, editTemplateController, getAllTemplatesController, getTeacherTemplatesController, getTemplateByIdController, deleteTemplateController };