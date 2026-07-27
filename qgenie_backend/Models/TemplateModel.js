import TemplateModel from "../Schemas/TemplateSchema.js";


const saveTemplateInputs = ({ templateInput }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const DBdata = await TemplateModel.create(templateInput);
            console.log("TemplateModel line- 8", DBdata);

            resolve(DBdata)
        } catch (error) {
            reject(error);
        }
    })
}

const editTemplateInputs = ({ id, templateInput }) => {
    return new Promise(async (resolve, reject) => {
        let update = {
            title: templateInput.title,
            subject: templateInput.subject,
            gradelevel: templateInput.gradelevel,
            description: templateInput.description,
            questionTypeTemplate: templateInput.questionTypeTemplate || null,
        };

        console.log("UPDATE", update)

        try {
            const DBdata = await TemplateModel.findByIdAndUpdate(id, update, { new: true });
            console.log("TemplateModel line- 31", DBdata);

            resolve(DBdata)
        } catch (error) {
            console.log(error)
            reject(error);
        }
    })
}

const fetchTemplates = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const DBdata = await TemplateModel.find();
            console.log("TemplateModel line- 45", DBdata);

            resolve(DBdata)
        } catch (error) {
            reject(error);
        }
    })
}

const fetchTemplatesByTeacher = ({ username }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const DBdata = await TemplateModel.find({ "createdBy.username": username });
            console.log("TemplateModel line- 58", DBdata);

            resolve(DBdata)
        } catch (error) {
            reject(error);
        }
    })
}

const fetchTemplateById = ({ id }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const DBdata = await TemplateModel.findById(id);
            console.log("TemplateModel line- 58", DBdata);

            resolve(DBdata)
        } catch (error) {
            reject(error);
        }
    })
}

const deleteTemplateById = ({ id }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const DBdata = await TemplateModel.findByIdAndDelete(id);
            console.log("TemplateModel line- 72", DBdata);

            resolve(DBdata)
        } catch (error) {
            reject(error);
        }
    })
}

export { saveTemplateInputs, editTemplateInputs, fetchTemplates, fetchTemplatesByTeacher, fetchTemplateById, deleteTemplateById };