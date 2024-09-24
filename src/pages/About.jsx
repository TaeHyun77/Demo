import React from 'react';
import LoginContextConsumer from '../contexts/LoginContextConsumer';
import Header from '../components/Header/Header';

const About = () => {

    return (
        <>
            <Header />
            <div className='container'>
                <h1>About, 소개 페이지 !</h1>
                <hr/>
                <p>회원가입 하여 게시판을 작성하고 여러 사용자와 소통해보아요</p>
            </div>
        </>
    )
}

export default About