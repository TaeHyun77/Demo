import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as auth from '../../api/auth';  
import Header from '../Header/Header';
import './PostInfo.css'
import { useNavigate } from 'react-router-dom';

const PostInfo = () => {
    
    const navigate = useNavigate();

    const { id } = useParams();
    const [postInfo, setPostInfo] = useState();  
    const [userInfo, setUserInfo] = useState();
    const [comment, setComment] = useState('');  // 댓글 입력 값 상태
    const [commentsList, setCommentsList] = useState([]);  // 댓글 목록 상태

    console.log(id);

    // 현재 로그인 한 사용자 정보 ( 삭제 권한을 체크하기 위함 )  
    const getUserInfo = async () => {

        try {
            const response = await auth.info();
            const data = response.data;
            console.log('Fetched userInfo:', data);
            setUserInfo(data);
        } catch (error) {
            console.error('Failed to fetch user info:', error);
        }
    };

    // 게시물 정보
    const getPostInfo = async (id) => {
        try {
            const response = await auth.postInfo(id);
            const data = response.data;
            setPostInfo(data);  
            console.log(data);
        } catch (error) {
            console.error('Failed to fetch post info:', error);
        }
    }

    // 게시물 수정 - 권한 고려
    const updatePost = async (form) => {
        try {
            const response = await auth.updatePost(form);
            if (response.status === 200) {
                alert('게시글 수정 성공 !!');
            } else {
                alert('게시글 수정 실패 !!');
            }
        } catch (error) {
            console.error('Failed to update post info:', error);
            alert('게시글 수정 중 에러 발생');
        }
    };

    // 게시글 삭제 - 권한 고려
    const deletePost = async (id) => {
        try {
            const check = window.confirm('게시물을 삭제 하시겠습니까 ?');
            if (check) {
                
                if (!postInfo) {
                    alert('게시글 정보를 불러오는 중입니다. 잠시만 기다려주세요.');
                    return;
                }

                console.log(userInfo?.username)
                console.log(postInfo.writer)

                // userInfo와 postInfo가 모두 로드된 상태에서만 비교
                // 현재 로그인 한 사용자의 아이디와 게시물 작성자 비교

                if (userInfo?.username === postInfo?.writer) {
                    const response = await auth.removePost(id);

                    if (response.status === 200) {
                        alert('게시글 삭제 성공!');
                        navigate("/post");
                    } else {
                        alert('게시글 삭제 실패!');
                    }
                } else {

                    // 관리자일 경우 모든 게시물 삭제 가능하게 변경
                    if (userInfo?.username === "admin0515") {
                        const response = await auth.removePost(id);

                        if (response.status === 200) {
                            alert('관리자 권한 게시글 삭제 성공!');
                            navigate("/post");
                        } else {
                            alert('관리자 권한 게시글 삭제 실패!');
                        }
                    } else {
                        alert('삭제 권한이 없습니다.');
                        navigate("/post");
                    }
                }
            } else {
                navigate("/post");
            }
        } catch (error) {
            console.log("게시글 삭제 중 에러 발생", error);
            alert('게시글 삭제 중 에러 발생');
        }
    };

    // 게시글 댓글 리스트 
    const getCommentsList = async (postId) => {

        try {
            const response = await auth.CommentList(postId);  
            setCommentsList(response.data);
        } catch (error) {
            console.error('Failed to fetch comments:', error);
        }
    };

    // 댓글 작성
    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!comment.trim()) {
            alert('댓글을 입력해주세요.');
            return;
        }

        try {
            const response = await auth.addComment(id, { comment: comment });  

            console.log(comment)

            if (response.status === 200) {
                setComment('');  // 댓글 작성 후 입력란 초기화
                getCommentsList(id);  // 댓글 목록 갱신
                alert('댓글 작성 성공 !');
            }
        } catch (error) {
            console.error('Failed to add comment:', error);
            alert('댓글 작성 중 에러 발생');
        }
    };

    // LocalDateTime 형의 시각 표시를 보기 편하게 변환
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };


    useEffect(() => {
        if (id) {
            getPostInfo(id);
            getCommentsList(id);
        }
        getUserInfo();
    }, [id]);


    // postInfo 값이 불러오기 전까지 Loding으로 표시되게
    if (!postInfo) {
        return <div>Loading...</div>;
    }

    // 게시글 수정 
    const handleEditClick = () => {

        if (userInfo?.username === "admin0515") {
            navigate(`/postUpdateForm`, { state: { postId: postInfo.id } });
        } else {
            if (userInfo?.username !== postInfo?.writer) {
                alert('수정 권한이 없습니다.');
                navigate(`/postInfo/${id}`)
            } else {
                navigate(`/postUpdateForm`, { state: { postId: postInfo.id } });
            }
        }
    };

    // 게시글 목록으로 이동하는 이벤트
    const handlePostClick = () => {
        navigate(`/post`)
    };

    return (
        <>
         <Header/>

         <div className='postInfo_container'>
            <div className='post-header'>
                <h1 className='post-title'>{postInfo.title}</h1>
                
                <div className='post-meta'>
                    <span className='post-author'>작성자: {postInfo.writer}</span>
                    <span className='post-count'>조회수: {postInfo.count}</span>
                </div>
        
                <div className='post-dates'>
                    <span>작성: {formatDate(postInfo.createAtPost)}</span>
                    <span>수정: {formatDate(postInfo.updateAtPost)}</span>
                </div>
            </div>

            <hr/>

            <div className='post-content'>
                <p>{postInfo.content}</p>
            </div>

            <hr/>

            <div className='post-buttons'>
                <button type='submit' className='btn--post' onClick={handleEditClick}>게시글 수정</button>
                <button type='button' className='btn--post' onClick={() => deletePost(postInfo.id)}>게시글 삭제</button>
                <button type='button' className='btn--post' onClick={handlePostClick}>게시글 목록</button>
            </div>

            <div className="comments-section">

                <form onSubmit={handleCommentSubmit} className="comment-form">

                    <textarea 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)} 
                        placeholder="댓글을 입력하세요" 
                        className="comment-textarea"
                        rows="2"
                    />

                    <button type="submit" className="btn--comment-submit">댓글 작성</button>
                </form>

                {/* 댓글 목록 */}
                <div className="comments-list">
                    {commentsList.map((comment, index) => (
                        <div key={index} className="comment">
                            <p>{comment.author} : {comment.comment}</p>
                            <p className="comment-date">{formatDate(comment.createAtComment)}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
        </>
    );
}

export default PostInfo;
