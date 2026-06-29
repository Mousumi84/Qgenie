import React from 'react';
import { Form, Input, InputNumber, Radio, Row, Col, Checkbox, Collapse } from 'antd';

function QuestionType({ type, index, id, onRemove }) { 

    let optionsOptn = [
        { label: "Include Hints", value: "IH" },
        { label: "Include Explanations", value: "IE" },
        { label: "Shuffle Options", value: "SO" },
        { label: "Enable Negative Marking", value: "ENM" },
    ];
    let quesTypeOpt = [
        { label: "Multiple Choice Question", value: "MCQ" },
        { label: "Multiple Select Question", value: "MSQ" },
        { label: "True / False", value: "TRUE_FALSE" },
        { label: "Fill in the Blank", value: "FILL_BLANK" },
        { label: "Short Answer Question", value: "SAQ" },
        { label: "Long Answer Question", value: "LAQ" }, 
    ];

    let heading = quesTypeOpt.filter((i) => i.value === type )[0]?.label;

    console.log(id);
    
    return (
        <>
            <Collapse 
                items={[
                    {
                        key: "1",
                        label: (
                            <>
                                <button type="button" className="absolute top-2 right-2 text-red-500 hover:text-red-700" onClick={() => onRemove(id)}>✕</button>
                                <h3 className="font-semibold text-lg mb-4">{heading}</h3>
                            </>
                        ),
                        children: (
                            <div className='border border-gray-300 bg-gray-50 p-4 rounded-md relative'>
                                {/* question Count */}
                                <Form.Item label="Question Count" name={["questionTypeTemplate", index, "questionCount"]}>
                                    <InputNumber min={0} max={100} className="w-full" />
                                </Form.Item>
                                <Form.Item label="Marks Per Question" name={["questionTypeTemplate", index, "marksperQtn"]}>
                                    <InputNumber min={0} max={100} className="w-full" />
                                </Form.Item>
                                <Form.Item label="Difficulty Level" name={["questionTypeTemplate", index, "difficultyLevel"]}>
                                    <Radio.Group>
                                        <Radio.Button value="easy">Easy</Radio.Button>
                                        <Radio.Button value="medium">Medium</Radio.Button>
                                        <Radio.Button value="hard">Hard</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item label="Custom AI Prompt" name={["questionTypeTemplate", index, "aiprompt"]}>
                                    <Input.TextArea placeholder="Enter an AI prompt" rows={3} />
                                </Form.Item>
                                <Form.Item label="Options" name={["questionTypeTemplate", index, "options"]} >
                                    <Checkbox.Group>
                                        <div className="flex flex-col">
                                        {optionsOptn.map(item => (
                                            <Checkbox key={item.value} value={item.value}>{item.label}</Checkbox>
                                        ))}
                                        </div>
                                    </Checkbox.Group>
                                </Form.Item>
                            </div>
                        ),
                    },
                ]}    
            />
        </>
    );
}

export default QuestionType;