import React from 'react'
import Hero from '../components/Hero'
import JobCategories from '../components/JobCategories'
import CarrierWork from '../components/CarrierWork'
import ChooseUs from '../components/ChooseUs'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'
import ImageSection from '../components/ImageSection'
import Banner from '../components/Banner'


const Home = () => {
  return (
    <div>
        <Hero />
        <JobCategories />
        <Banner />
        <CarrierWork />
        <ImageSection />
        <ChooseUs />
        <Testimonials />
        <Newsletter />
    </div>
  )
}

export default Home