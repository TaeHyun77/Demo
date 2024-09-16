import React, { useEffect, useState, useContext } from 'react';
import { LoginContext } from '../contexts/LoginContextProvider'; 
import Header from '../components/Header/Header';
import { UserForm } from '../components/Role/UserForm';
import * as auth from '../api/auth';
import { useNavigate } from 'react-router-dom';

const User = () => {

    const [userInfo, setUserInfo] = useState();
    
    const [userList, setUserList] = useState([]);

    const { DeleteLogout, isLogin, roles } = useContext(LoginContext);
    const navigate = useNavigate();

    const getUserList = async () => {
        try {
            const response = await auth.list();
            const data = response.data;
            console.log('Fetched userList:', data);
            setUserList(data);
        } catch (error) {
            console.error('Failed to fetch user list:', error);
        }
    };

    const getUserInfo = async () => {
        if (!isLogin) {
            navigate("/login");
            return;
        }

        try {
            const response = await auth.info();
            const data = response.data;
            console.log('Fetched userInfo:', data);
            setUserInfo(data);
        } catch (error) {
            console.error('Failed to fetch user info:', error);
        }
    };

    const updateUser = async (form) => {
        try {
            const response = await auth.update(form);
            if (response.status === 200) {
                alert('회원 정보 수정 성공 !!');
            } else {
                alert('회원 정보 수정 실패 !!');
            }
        } catch (error) {
            console.error('Failed to update user info:', error);
            alert('회원 정보 수정 중 에러 발생');
        }
    };

    const deleteUser = async (username) => {
        try {
            const check = window.confirm('탈퇴 하시겠습니까 ?');
            if (check) {
                const response = await auth.remove(username);
                if (response.status === 200) {
                    DeleteLogout();
                    alert('회원 정보 삭제 성공 !!');
                } else {
                    alert('회원 정보 삭제 실패 !!');
                }
            } else {
                navigate("/user");
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
            alert('회원 삭제 중 에러 발생');
        }
    };

    useEffect(() => {
        console.log("isLogin:", isLogin);
        console.log("roles:", roles);
        if (isLogin) {
            getUserInfo();
            getUserList();
        }
    }, [isLogin, roles]);
    

    return (
        <>
            <Header />
                <div className='container'>
                    <h1>User</h1>
                    <UserForm userInfo={userInfo} updateUser={updateUser} deleteUser={deleteUser} ></UserForm>
                </div>
        </>
    );
};

export default User;
