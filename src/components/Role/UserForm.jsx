import React, { useContext, useEffect } from 'react'

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
        <div className="form">
            <h2 className="join-title">[ {userInfo?.name} ]님의 정보</h2>

            <form className='join-form' onSubmit={(e) => onUpdate(e)}>
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
                    <label htmlFor='password'>비밀번호</label>

                    <input type="text"
                        id='password'
                        placeholder='password'
                        name='password'
                        autoComplete='password'
                        required
                        defaultValue={userInfo?.password}
                    />
                </div>

                <div>
                    <label htmlFor='role'>등급</label>

                    <input type="text"
                        id='role'
                        placeholder='role'
                        name='role'
                        autoComplete='role'
                        readOnly
                        required
                        defaultValue={userInfo?.role}
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

                <button type='submit' className='btn btn--form btn-join'>정보 수정</button>

                <button type='button' className='btn btn--form btn-join'
                onClick={ ()=>deleteUser(userInfo.username)}>회원 탈퇴</button> 

            </form>
        </div>
    )
}
