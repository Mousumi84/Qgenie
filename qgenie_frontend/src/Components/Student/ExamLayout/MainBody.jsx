import { Input, Checkbox, Col, Row } from 'antd';
const { TextArea } = Input;

const MainBody = ({ item }) => {
    console.log(item);

    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };

    return (
        <div className="flex flex-col gap-20 p-6 w-full border border-gray-200 rounded-sm h-full">
            <div className='flex gap-10'>
                <strong>Q {item?.index + 1}.</strong>
                <div className='w-13/15'>{item?.item?.question}</div>
            </div>

            {/* Multiple Select Question */ }
            {item?.item?.questionType === "MSQ" && (
                <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                    <Row>
                      <Col span={8}>
                        <Checkbox value="A">A</Checkbox>
                      </Col>
                    </Row>
                </Checkbox.Group>
            )}

            {/* Short Answer Question */ }
            {item?.item?.questionType === "SAQ" && (
                <TextArea rows={6} placeholder='Enter your answer' />
            )}

            {/* Long Answer Question */ }
            {item?.item?.questionType === "LAQ" && (
                <TextArea rows={12} placeholder='Enter your answer' />
            )}
        </div>
    )
};

export default MainBody;