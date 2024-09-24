import React from 'react';
import LoginContextConsumer from '../contexts/LoginContextConsumer';
import Header from '../components/Header/Header';
import plane from '../plane.jpg';


const Home = () => {

    return (
        <>
            <Header />
            <div className='container'>
                <h1>Home 페이지</h1>
                <hr/>

            </div>
        </>
    )
}

export default Home