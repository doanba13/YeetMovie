import {Comment, Avatar, Input, Button, Form} from "antd";
import {useContext, useState} from "react";
import AuthContext from "../../store/AuthContext";

const {TextArea} = Input;

const Editor = ({onChange, onSubmit, submitting, value}) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value}/>
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);

const CommentSection = () => {
    const [value, setValue] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const authCtx = useContext(AuthContext);

    const handleSubmit = () => {
        if (!value) {
            return;
        }
        setSubmitting(true);
        console.log(value);
    };

    const handleChange = e => {
        setValue(e.target.value)
    };

    return (
        <>
            {
                authCtx.user &&
                <Comment
                    avatar={<Avatar
                        src={authCtx.userData?.avatar ? `http://54.169.180.127${authCtx.userData?.avatar}` : 'https://joeschmoe.io/api/v1/random'}
                        alt="Han Solo"/>}
                    content={
                        <Editor
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
            }
        </>
    )
}

export default CommentSection;