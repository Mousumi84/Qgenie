import { Col, Form, Input, Radio, Row, Checkbox, Collapse, InputNumber } from "antd";

/*
{
    questionType: "LAQ",
    question: "Explain Promise.",
    difficultyLevel: "easy",
    marks: 5,
    negativeMarks: 0.5,
    hints: "",
    explanation: "",
    sampleAnswer: "Promise represents eventual completion."
}
*/

const LAQQuestions = ({ item, count, n }) => {
    // console.log("LAQ",  n, count, item);
    let question = [];
    let questionCount = 0;

    for (let i = n; i < count; i++) {
        question.push(
            <div key={`${item.type}-question-${i + 1}`} className="border border-gray-300 bg-gray-50 p-4 rounded-md relative">
                {/* Question Type */}
                <Form.Item name={["questions", i, "questionType"]} initialValue="LAQ" hidden>
                    <Input />
                </Form.Item>

                {/* Question */}
                <Form.Item name={["questions", i, "question"]} label={`Question ${++questionCount}`}>
                    <Input.TextArea placeholder={`Enter question ${questionCount}`} />
                </Form.Item>

                {/* sampleAnswer */}
                <Form.Item name={["questions", i, "sampleAnswer"]} label="Answer">
                    <Input.TextArea placeholder="Enter sample answer" />
                </Form.Item>

                {/* Hints */}
                {item.options.includes("IH") && (
                    <Form.Item name={["questions", i, "hints"]} label="Hints">
                        <Input.TextArea placeholder="Enter hints" />
                    </Form.Item>
                )}

                {/* Explanation */}
                {item.options.includes("IE") && (
                    <Form.Item name={["questions", i, "explanation"]} label="Explanation">
                        <Input.TextArea placeholder="Enter explanation" />
                    </Form.Item>
                )}

                {/* Difficulty Level */}
                <Form.Item label="Difficulty Level" name={["questions", i, "difficultyLevel"]} initialValue={item.difficultyLevel}>
                    <Radio.Group>
                        <Radio.Button value="easy">Easy</Radio.Button>
                        <Radio.Button value="medium">Medium</Radio.Button>
                        <Radio.Button value="hard">Hard</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Row gutter={10}>
                    {/* Marks */}
                    <Col span={12}>
                        <Form.Item name={["questions", i, "marks"]} label="Marks" labelCol={{ span: 10 }} wrapperCol={{ span: 18 }} initialValue={item.marksperQtn}>
                            <InputNumber placeholder="Enter marks" />
                        </Form.Item>
                    </Col>

                    {/* negativeMarks */}
                    {item.options.includes("ENM") && (
                        <Col span={12}>
                            <Form.Item name={["questions", i, "negativeMarks"]} label="Negative Marks" labelCol={{ span: 10 }} wrapperCol={{ span: 18 }}>
                                <InputNumber placeholder="Enter negative marks" />
                            </Form.Item>
                        </Col>
                    )}
                </Row>
            </div>,
        );
    }

    return (
        <>
            <Collapse
                destroyOnHidden={false}
                items={[
                    {
                        key: "1",
                        label: (
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-lg">Long Answer Question</h3>
                                <span>{`Total Questions: ${item.questionCount}`}</span>
                                {/* <span>{`Marks: ${item.questionCount * item.marksperQtn}`}</span> */}
                            </div>
                        ),
                        children: <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>{question}</div>,
                    },
                ]}
            />
        </>
    );
};

export default LAQQuestions;
