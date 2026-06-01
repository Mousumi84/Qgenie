import React from 'react';
import { Form, Input, InputNumber, Radio, Row, Col } from 'antd';

function QuestionType({ type, id, onRemove }) { 

    return (
        <div className='border border-dashed border-gray-300 p-4 rounded-md relative'>
            <button type="button" className="absolute top-2 right-2 text-red-500 hover:text-red-700" onClick={() => onRemove(id)}>
                ✕
            </button>

            <h3 className="font-semibold text-lg mb-4">
                {type.label} 
            </h3>

            <Form.Item label="Question Count" name={`${type.value}_${id}_questionCount`}>
                <InputNumber min={0} max={100} className="w-full" />
            </Form.Item>
            <Form.Item label="Marks Per Question" name={`${type.value}_${id}_marks`}>
                <InputNumber min={0} max={100} className="w-full" />
            </Form.Item>
            <Form.Item label="Difficulty Level" name={`${type.value}_${id}_level`}>
                <Radio.Group>
                    <Radio.Button value="easy">Easy</Radio.Button>
                    <Radio.Button value="medium">Medium</Radio.Button>
                    <Radio.Button value="hard">Hard</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Custom AI Prompt" name={`${type.value}_${id}_aiprompt`}>
                <Input.TextArea placeholder="Enter an AI prompt" rows={3} />
            </Form.Item>
        </div>
    );
}

export default QuestionType;