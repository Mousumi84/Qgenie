import TemplateModel from "../../Schemas/TeacherSchemas/TemplatesSchema.js";


const saveTemplateInputs = ({templateInput}) => {
    return new Promise(async (resolve,reject) => {
        try {
            const DBdata = await TemplateModel.create(templateInput);
            console.log("TemplateModel line- 8",DBdata);

            resolve(DBdata)
        } catch (error) {
            reject(error);
        }
    })
}

const editTemplateInputs = ({id, templateInput}) => {
    return new Promise(async (resolve,reject) => {
        let update = {
            title: templateInput.title,
            subject: templateInput.subject,
            gradelevel: templateInput.gradelevel,
            description: templateInput.description,
            questionTypeTemplate: templateInput.questionTypeTemplate,
        };

        try {
            const DBdata = await TemplateModel.findByIdAndUpdate(id, update,{ new: true});
            console.log("TemplateModel line- 22",DBdata);
            
            resolve(DBdata)
        } catch (error) {
            console.log(error)
            reject(error);
        }
    })
}

const getTemplates = () => {
    return new Promise(async (resolve,reject) => {
        try {
            const DBdata = await TemplateModel.find();
            console.log("TemplateModel line- 36",DBdata);
            
            resolve(DBdata)
        } catch (error) {
            reject(error);
        }
    })
}

const getTemplateById = ({id}) => {
    return new Promise(async (resolve,reject) => {
        try {
            const DBdata = await TemplateModel.findById(id);
            console.log("TemplateModel line- 49",DBdata);
            
            resolve(DBdata)
        } catch (error) {
            reject(error);
        }
    })
}

const deleteTemplateById = ({id}) => {
    return new Promise(async (resolve,reject) => {
        try {
            const DBdata = await TemplateModel.findByIdAndDelete(id);
            console.log("TemplateModel line- 62",DBdata);
            
            resolve(DBdata)
        } catch (error) {
            reject(error);
        }
    })
}

export { saveTemplateInputs, editTemplateInputs, getTemplates, getTemplateById, deleteTemplateById };