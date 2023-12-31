import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {updatePost} from "../store";
function Detail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const postList = useSelector(state => state.postList);
    const idx = postList.findIndex((p) => p.id === Number(id));
    const [post, setPost] = useState(postList[idx]);

    const setValue = (value, target) => {
        setPost({
            ...post,
            [target]: value
        })
    }

    const update = () => {
        axios.patch(`/moim/${post.id}`, post)
            .then(() => {
                dispatch(updatePost(post));
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
                                value={post.author}
                                onChange={(e) => { setValue(e.target.value, "author") }}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">글제목</InputGroup.Text>
                            <Form.Control
                                placeholder="글제목"
                                aria-label="글제목"
                                aria-describedby="basic-addon1"
                                value={post.title}
                                onChange={(e) => { setValue(e.target.value, "title") }}
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text>내용</InputGroup.Text>
                            <Form.Control as="textarea" aria-label="내용"
                                          value={post.content}
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
                                onClick={() => { update() }}>작성하기</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}


export default Detail;