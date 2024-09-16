import React from 'react';
import LoginContextConsumer from '../contexts/LoginContextConsumer';
import Header from '../components/Header/Header';
import { BoardInsertForm } from '../Board/Form/PostForm';
import { useNavigate } from 'react-router-dom';
import PostForm from '../Board/Form/PostForm';
import * as auth from '../api/auth'

const Post = () => {
    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate("/post-write");
    }

    const postSave = async (form) => {
        console.log(form);

        let response
        let data

        try {
            response = await auth.postSave(form)
        } catch(error){
            console.error(`${error}`)
            console.error(`게시글 등록 중 에러 발생`)
            alert(`게시글 작성 중 오류 발생`)
            return
        }
        
        data = response.data
        const status = response.status
        console.log(`data : ${data}`)
        console.log(`status : ${status}`)

        if (status === 200) {
            console.log(`게시글 작성 성공`)
            alert.log(`게시글 작성 성공`);
            navigate("/")
        } else {
            console.log(`게시글 작성 실패`)
            alert.log(`게시글 작성 실패`);
        }
    }

    return (
        <>

            <Header />
            <div className='container'>
                <div className='title-button-container'>
                    <h1>게시판 페이지</h1>

                    <button onClick={handleClick}>
                        새 글 작성
                    </button>
                </div>
                <hr/>

                {/*<PostForm postSave={postSave} />*/}

            </div>
        </>
    )
}

export default Post;