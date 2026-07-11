import { Col, Form, Input, Radio, Row, Checkbox, Collapse } from "antd";

/*
{
    questionType: "TRUE_FALSE",
    question: "React is a framework.",
    difficultyLevel: "easy",
    marks: 1,
    negativeMarks: 0.5,
    hints: "",
    explanation: "",
    sampleAnswer: false,
},
*/

const TFQQuestions = ({ item, index }) => {
    console.log("TF", item);
    let question = [];

    for (let i = 0; i < item.questionCount; i++) {
        question.push(
            <div key={`${item.type}-question-${i + 1}`} className="border border-gray-300 bg-gray-50 p-4 rounded-md relative">
                {/* Question Type */}
                <Form.Item name={["questions", i, "questionType"]} initialValue="TRUE_FALSE" hidden>
                    <Input />
                </Form.Item>

                {/* Question */}
                <Form.Item name={["questions", i, "question"]} label={`Question ${i + 1}`}>
                    <Input.TextArea placeholder={`Enter question ${i + 1}`} />
                </Form.Item>

                {/* sampleAnswer */}
                <Form.Item name={["questions", i, "sampleAnswer"]} label="Answer">
                    <Radio.Group>
                        <Radio.Button value="true">True</Radio.Button>
                        <Radio.Button value="false">False</Radio.Button>
                    </Radio.Group>
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
                            <Input placeholder="Enter marks" />
                        </Form.Item>
                    </Col>

                    {/* negativeMarks */}
                    {item.options.includes("ENM") && (
                        <Col span={12}>
                            <Form.Item name={["questions", i, "negativeMarks"]} label="Negative Marks" labelCol={{ span: 10 }} wrapperCol={{ span: 18 }}>
                                <Input placeholder="Enter negative marks" />
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
                defaultActiveKey={[]}
                items={[
                    {
                        key: "1",
                        label: (<h3 className="font-semibold text-lg" name={["questions", index, "question"]}>True / False</h3>),
                        children: (<div style={{ display: "flex", flexDirection: "column", gap: "10px",}}>{question}</div>),
                    },
                ]}
            />
        </>
    );
};

export default TFQQuestions;
