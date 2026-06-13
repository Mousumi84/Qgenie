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
        };

        templateInput.questionTypeTemplate.map((item,index) => {
            update[`questionTypeTemplate.${index}.type`] = item.type;

            update[`questionTypeTemplate.${index}.questionCount`] = item.questionCount;

            update[`questionTypeTemplate.${index}.marksperQtn`] = item.marksperQtn;

            update[`questionTypeTemplate.${index}.difficultyLevel`] = item.difficultyLevel;

            update[`questionTypeTemplate.${index}.aiprompt`] = item.aiprompt;

            update[`questionTypeTemplate.${index}.options`] = item.options;
        });
        
        console.log("edit template",id,update);


        try {
            const DBdata = await TemplateModel.findByIdAndUpdate(id,{ $set: update },{ new: true});
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