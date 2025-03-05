import React from 'react';

import Header from '../Components/Header/Header'
import Banner from '../Components/Banner/Banner'
import Posts from '../Components/Posts/Posts'
import Footer from '../Components/Footer/Footer'



const Home = () => {
    return (
        <div>
            <Header/>
            <Banner/>
           
            <Posts/>
            <Footer/>
          

        </div>
    );
}

export default Home;
