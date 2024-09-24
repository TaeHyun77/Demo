import React, { useEffect, useContext } from 'react';
import './PostForm.css'
import Header from '../../components/Header/Header';
import {useNavigate} from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContextProvider';
import { PostSaveProvider, usePostSave } from './PostSaveProvider';
import { FaPen } from "react-icons/fa6";


const PostForm = () => {

    const postSave = usePostSave();

    console.log(postSave)

    const onPost = (e) => {

        e.preventDefault(); // submit 기본 동작 방지

        const form = e.target

        const title = form.title.value;
        const content = form.content.value;
        const writer = userInfo?.name; 

        console.log(title, content, writer);

        postSave( {title, content, writer} );
    }

    const {isLogin, userInfo} = useContext(LoginContext);
    const navigate = useNavigate()

    useEffect( () => {

        if (!isLogin) {
            alert("로그인이 필요합니다.")
            navigate("/login")
            return
        }
    },)

    return (

        <div>
            <Header/>
            <div className='board-insert-form'>
                
                <h1 className="heading-with-icon">
                    <FaPen className="icon" />
                    게시글 등록
                </h1>

                <hr/>
                <form onSubmit={(e) => onPost(e)}>
                    <table>
                        <tbody>
                        <tr>
                            <td>제목</td>
                            <td>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="input-field"
                                placeholder="제목을 입력하세요"
                                required
                            />
                            </td>
                        </tr>

                        <tr>
                            <td>작성자</td>
                            <td>
                            <input
                                id="writer"
                                name="writer"
                                className="input-field"
                                defaultValue={userInfo?.name}
                                required
                            />
                            </td>
                        </tr>

                        <tr>
                            <td>내용</td>
                            <td>
                            <textarea
                                id="content"
                                name="content"
                                className="textarea-field"
                                cols="40"
                                rows="5"
                                placeholder="내용을 입력하세요"
                                required
                            />
                            </td>
                        </tr>
                        </tbody>
                    </table>

                <div className='button-container'>
                    <button className='submit-button'>등록</button>
                </div>
            </form>

            </div>
        </div>
    )
}

export default PostForm;