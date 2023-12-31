import {Button, Nav, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createPost, deletePost, renderPost, updatePost} from "../store";


function Moim() {
    const dispatch = useDispatch();
    const postList = useSelector(state => state.postList);

    const [tab, setTab] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/moim')
            .then((res) => {
                if (res.data.length > 0) {
                    dispatch(renderPost(res.data));
                }
            });
    }, []);

    return (
        <>
            <div className="d-grid gap-2"></div>
            <Tabs tab={tab} setTab={setTab}/>
            {tab === 1 && <DataList dispatch={dispatch} postList={postList} navigate={navigate}/> }
            {tab === 2 && (<div>내 모임</div>)}
            <Button variant="primary" size="lg" onClick={() => navigate("/post") }>
                글쓰기
            </Button>
        </>
    );
}

function DataList({dispatch, postList, navigate}) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>이미지</th>
                    <th>글제목</th>
                    <th>작성자</th>
                    <th>삭제하기</th>
                </tr>
            </thead>
            <tbody>
                {
                    postList.map((v, i) => {
                       return (
                           <tr key={i} onClick={() => navigate(`/moim/${v.id}`)}>
                               <td>{ i }</td>
                               <td>{ v.imageSrc && <img src={v.imageSrc} width={'100'}/> }</td>
                               <td>{ v.title }</td>
                               <td>{ v.author }</td>
                               <td><Button onClick={(e) => {
                                   e.stopPropagation();
                                   removePost(dispatch, v.id);
                               }}>X</Button></td>
                           </tr>
                       );
                    })
                }

            </tbody>
        </Table>
    );
}


function Tabs({setTab}) {
    return (
        <Nav fill variant="tabs" defaultActiveKey="find">
            <Nav.Item>
                <Nav.Link eventKey="find"
                      onClick={() => {
                          setTab(1);
                      }}
                >모임 찾기</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="list"
                      onClick={() => setTab(2)}
                >내 모임</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

let removePost = (dispatch, id) => {
    let idx = id;
    if (window.confirm('삭제하시겠습니까?')) {
        axios.delete(`/moim/${id}`)
            .then(() => {
                dispatch(deletePost(id));
                alert('삭제 완료했습니다.');
            });
    }
}

export default Moim;