import { Radio } from 'antd';
import { Input, Checkbox, Col, Row, Button, Form } from 'antd';
import { useEffect } from 'react';

const MainBody = ({ item, setQuesClk, questions, selectedQuestionType }) => {
    const [form] = Form.useForm();

    const questionId = item?.item?._id;
    const questionType = item?.item?.questionType;

    const handleSaveAndNext = (values) => {
        console.log("Form values:", values);

        const newAnswer = {
            questionId: values.questionId,
            questionType: values.questionType,
            StudentAnswer: values.StudentAnswer === undefined ? null : values.StudentAnswer,
        };

        // Get existing answers
        const existingAnswers = JSON.parse(localStorage.getItem("answers")) || [];

        // Check whether this question was already answered
        const existingIndex = existingAnswers.findIndex((answer) => answer.questionId === questionId );

        let updatedAnswers;

        if (existingIndex !== -1) {
            // Replace existing answer
            updatedAnswers = [...existingAnswers];
 
            updatedAnswers[existingIndex] = newAnswer;
        } else {
            // Add new answer
            updatedAnswers = [ ...existingAnswers, newAnswer ];
        }

        localStorage.setItem("answers", JSON.stringify(updatedAnswers));

        const filteredQuestions = questions?.filter((question) => question.questionType === selectedQuestionType );

        if (filteredQuestions.length === 0) {
            return;
        }

        const currentIndex = filteredQuestions.findIndex((question) => question._id === questionId );

        const nextIndex = currentIndex < filteredQuestions.length - 1 ? currentIndex + 1 : 0;

        setQuesClk({ item: filteredQuestions[nextIndex], index: nextIndex });
    };

    useEffect(() => {
        if (!questionId) {
            return;
        }

        // Read localStorage
        const savedAnswers = JSON.parse(localStorage.getItem("answers") || "[]");

        // Find current question's answer
        const savedAnswer = savedAnswers.find((answer) => answer.questionId === questionId);

        form.setFieldsValue({ questionId, questionType, StudentAnswer: savedAnswer?.StudentAnswer ?? undefined});
    }, [questionId, questionType]);

    return (
        <div className="flex flex-col gap-20 p-6 w-full border border-gray-200 rounded-sm h-full">
            <div className='flex gap-10'>
                <strong>Q {item?.index + 1}.</strong>
                <div className='w-13/15'>{item?.item?.question}</div>
            </div>

            <Form form={form} layout="vertical" onFinish={handleSaveAndNext} autoComplete="off">

                <Form.Item label={null} name="questionId" initialValue={item?.item?._id} hidden>
                    <Input />
                </Form.Item>
                <Form.Item label={null} name="questionType" initialValue={item?.item?.questionType} hidden>
                    <Input />
                </Form.Item>


                <Form.Item label={null} name="StudentAnswer">
                    {/* Multiple Choice Question */}
                    {selectedQuestionType === "MCQ" && (
                        <Radio.Group>
                            <Row gutter={[16, 16]}>
                                {item?.item?.sampleOptions?.map((option, index) => (
                                    <Col span={24} key={option?._id || index}>
                                        <Radio value={option.label}>{option.label}</Radio>
                                    </Col>
                                ))}
                            </Row>
                        </Radio.Group>
                    )}

                    {/* Multiple Select Question */}
                    {selectedQuestionType === "MSQ" && (
                        <Checkbox.Group style={{ width: '100%' }}>
                            <Row gutter={[16, 16]}>
                                {item?.item?.sampleOptions?.map((option, index) => (
                                    <Col span={24} key={option?._id || index} >
                                        <Checkbox value={option.label}> {option.label} </Checkbox>
                                    </Col>
                                )
                                )}
                            </Row>
                        </Checkbox.Group>
                    )}

                    {/* True/False Question */}
                    {selectedQuestionType === "TRUE_FALSE" && (
                        <Radio.Group>
                            <Radio value={true}>True</Radio>
                            <Radio value={false}>False</Radio>
                        </Radio.Group>
                    )}

                    {/* Fill in the Blank Question */}
                    {selectedQuestionType === "FILL_BLANK" && (
                        <Input placeholder="Enter your answer" />
                    )}

                    {/* Short Answer Question */}
                    {selectedQuestionType === "SAQ" && (
                        <Input.TextArea rows={6} placeholder='Enter your answer' />
                    )}

                    {/* Long Answer Question */}
                    {selectedQuestionType === "LAQ" && (
                        <Input.TextArea rows={12} placeholder='Enter your answer' />
                    )}
                </Form.Item>

                <Form.Item label={null} className='flex flex-row-reverse'>
                    <Button type="primary" htmlType="submit" className='w-40'>Save & Next</Button>
                </Form.Item>

            </Form>
        </div>
    )
};

export default MainBody; 