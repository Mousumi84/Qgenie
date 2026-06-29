import { Col, Form, Input, Radio, Row, Checkbox, Collapse } from "antd";

/*
{
    questionType: "MCQ",
    question: "What is React?",
    marks: 2,
    negativeMarks: 0.5,
    hints: "",
    explanation: "",
    sampleOptions: [
        {
            label: "Library",
            isCorrect: true
        },
        {
            label: "Framework",
            isCorrect: false
        },
        {
            label: "Database",
            isCorrect: false
        },
        {
            label: "Language",
            isCorrect: false
        }
    ]
}
*/

const MCQQuestions = ({item, index}) => {
    console.log("MCQ",item);
    let question = [];

    for (let i = 0; i < item.questionCount; i++) {
        question.push(
            <div key={`${item.type}-question-${i + 1}`} className="border border-gray-300 bg-gray-50 p-4 rounded-md relative">
    
                {/* Question Type */}
                <Form.Item name={["questions", i, "questionType"]} initialValue="MCQ" hidden>
                    <Input />
                </Form.Item>
    
                {/* Question */}
                <Form.Item name={["questions", i, "question"]} label={`Question ${i + 1}`}>
                    <Input.TextArea placeholder={`Enter question ${i + 1}`} />
                </Form.Item>
    
                {[0, 1, 2, 3].map((optionIndex) => (
                // <Form.Item key={optionIndex} label={`Sample Option ${optionIndex + 1}`}>
                    <Row gutter={10} key={optionIndex}>
                        {/* label */}
                        <Col span={20}>
                            <Form.Item name={[ "questions", i, "sampleOptions", optionIndex, "label" ]} label={`Option ${optionIndex + 1}`} labelCol={{ span: 6 }} wrapperCol={{ span: 20 }}>
                                <Input placeholder={`Enter option ${optionIndex + 1}`} />
                            </Form.Item>
                        </Col>

                        {/* isCorrect */}
                        <Col span={3}>
                            <Form.Item name={["questions", i, "sampleOptions", optionIndex, "isCorrect"]} valuePropName="checked" initialValue={false} noStyle>
                                <Checkbox style={{ fontSize: "12px", color: "#51dafc"}}>Is Correct</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                // </Form.Item>
                ))}

                {/* Hints */}
                {item.options.includes("IH") && <Form.Item name={["questions", i, "hints"]} label="Hints">
                                                    <Input placeholder="Enter hints" />
                                                </Form.Item>
                }

                {/* Explanation */}
                {item.options.includes("IE") && <Form.Item name={["questions", i, "explanation"]} label="Explanation">
                                                    <Input placeholder="Enter explanation" />
                                                </Form.Item>
                }


                <Row gutter={10}>
                    {/* Marks */}
                    <Col span={12}>
                        <Form.Item name={["questions", i, "marks"]} label="Marks" labelCol={{ span: 10 }} wrapperCol={{ span: 18 }} initialValue={item.marksperQtn}>
                            <Input placeholder="Enter marks" />
                        </Form.Item>
                    </Col>
    
                    {/* negativeMarks */}
                    {item.options.includes("ENM") && <Col span={12}>
                                                        <Form.Item name={["questions", i, "negativeMarks"]} label="Negative Marks" labelCol={{ span: 10 }} wrapperCol={{ span: 18 }}>
                                                            <Input placeholder="Enter negative marks" />
                                                        </Form.Item>
                                                    </Col>
                    }
                </Row>
            </div>
        );
    }

    return (
        <>
            <Collapse defaultActiveKey={[]}
                items={[
                    {
                        key: "1",
                        label: (
                            <h3 className="font-semibold text-lg" name={["questions", index, "question"]}>Multiple Choice Question</h3>
                        ),
                        children: (
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                {question}
                            </div>
                        ),
                    },
                ]}
            />
        </>
    )
}

export default MCQQuestions;