import React, { useEffect, useContext } from 'react';
import Header from '../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContextProvider';

export const Admin = ({userList}) => {
    console.log(userList)
    
    const { isLogin, roles } = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        }

        if (!roles.isAdmin) {
            alert("권한이 없습니다.");
            navigate("/");
            return;
        }
    }, [isLogin, roles]);

    return (
        <>
            {isLogin && roles.isAdmin && (
                <>
                    <Header />
                    <div className='container' style={{ width: "1600px" }}>
                        <h1>Admin, 관리자 페이지</h1>
                        <hr />
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th align='100'>id</th>
                                        <th align='100'>아이디</th>
                                        <th align='100'>비밀번호</th>
                                        <th align='100'>이름</th>
                                        <th align='100'>이메일</th>
                                        <th align='100'>생성기간</th>
                                        <th align='100'>삭제</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* 사용자 목록 데이터 추가 */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Admin;
