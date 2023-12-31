import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {createPost} from "../store";
function Post() {
    const dispatch = useDispatch();
    const [post, setPost] = useState({});
    let navigate = useNavigate();

    const setValue = (value, target) => {
        setPost({
            ...post,
            [target]: value
        })
    }

    const create = () => {
        axios.post("/moim", post)
            .then(() => {
                dispatch(createPost(post));
                navigate('/moim');
            });
    }


    const imageUpload = (e, setValue) => {

        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise((resolve) => {
            reader.onload = () => {
                setValue(reader.result, "imageSrc")
                resolve();
            };
        });
    }


    return (
        <>
            <Container fluid="md">
                <Row>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">작성자</InputGroup.Text>
                            <Form.Control
                                placeholder="lee"
                                aria-label="lee"
                                aria-describedby="basic-addon1"
                                onChange={(e) => { setValue(e.target.value, "author") }}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">글제목</InputGroup.Text>
                            <Form.Control
                                placeholder="글제목"
                                aria-label="글제목"
                                aria-describedby="basic-addon1"
                                onChange={(e) => { setValue(e.target.value, "title") }}
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text>내용</InputGroup.Text>
                                <Form.Control as="textarea" aria-label="내용"
                                  onChange={(e) => { setValue(e.target.value, "content") }}
                                />
                        </InputGroup>
                        <input
                            accept="image/*"
                            multiple type="file"
                            onChange={e => { imageUpload(e, setValue) }}
                        />

                        { post.imageSrc && <img width={'100%'} src={post.imageSrc}/> }
                    </Col>
                </Row>
                <Row>
                <Col>
                    <Button variant="primary" type="submit"
                        onClick={() => { create() }}
                    >작성하기</Button>
                </Col>
                </Row>
            </Container>

        </>
    );
}

export default Post;