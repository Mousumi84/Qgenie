import React from 'react';
import { Form, Input, InputNumber, Radio, Row, Col, Checkbox } from 'antd';

function QuestionType({ type, index, onRemove }) { 

    let optionsOptn = [
        { label: "Include Hints", value: "IH" },
        { label: "Include Explanations", value: "IE" },
        { label: "Shuffle Options", value: "SO" },
        { label: "Enable Negative Marking", value: "ENM" },
    ];

    return (
        <div className='border border-dashed border-gray-300 p-4 rounded-md relative'>
            <button type="button" className="absolute top-2 right-2 text-red-500 hover:text-red-700" onClick={() => onRemove(index)}>
                ✕
            </button>

            <h3 className="font-semibold text-lg mb-4">
                {type.label}
            </h3>

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
    );
}

export default QuestionType;