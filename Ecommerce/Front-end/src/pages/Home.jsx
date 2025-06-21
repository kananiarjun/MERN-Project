import React from 'react'
import Banner from '../components/Banner'
import Features from '../components/Features'
import BannerCarousel from '../components/BannerCarousel'

const Home = () => {
  return (
    <>
        <BannerCarousel/>
        <Banner />
        <Features />
    </>
  )
}

export default Home