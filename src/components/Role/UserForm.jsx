import React, { useContext, useEffect } from 'react'
import './UserForm.css'

export const UserForm = ({userInfo, updateUser, deleteUser}) => {

    const onUpdate = (e) => {
        e.preventDefault()

        const form = e.target
        const username = form.username.value
        const password = form.password.value
        const role = form.role.value
        const name = form.name.value
        const email = form.email.value
        
        updateUser({ username, role, name, email })
    }

    return (
        <div className="userInfoform">
            <h2 className="userInfo-title">[ {userInfo?.name} ]님의 정보</h2>

            <form className='userInfo-form' onSubmit={(e) => onUpdate(e)}>
                <div>
                    <label htmlFor='username'>username</label>

                    <input type="text"
                        id='username'
                        placeholder='username'
                        name='username'
                        autoComplete='username'
                        required
                        readOnly
                        defaultValue={userInfo?.username}
                    />
                </div>

                <div>
                    <label htmlFor='name'>name</label>

                    <input type="text"
                        id='name'
                        placeholder='name'
                        name='name'
                        autoComplete='name'
                        required
                        defaultValue={userInfo?.name}
                    />
                </div>

                <div>
                    <label htmlFor='email'>email</label>

                    <input type="email"
                        id='email'
                        placeholder='email'
                        name='email'
                        autoComplete='email'
                        required
                        defaultValue={userInfo?.email}
                    />
                </div>

                <div>
                <label htmlFor='role' style={{ marginTop: '20px' }}>
                        등급 : {userInfo?.role === 'ROLE_USER' ? '일반 사용자' : '관리자'}
                    </label>
                </div>

                <button type='submit' className='userInfoBtn userInfoBtn--form btn-userInfo'>정보 수정</button>

                <button type='button' className='userInfoBtn userInfoBtn--form btn-userInfo'
                onClick={ ()=>deleteUser(userInfo.username)}>회원 탈퇴</button> 

            </form>
        </div>
    )
}
