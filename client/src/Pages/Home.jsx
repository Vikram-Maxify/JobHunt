import React from 'react'

import JobCategories from '../components/JobCategories'
import CarrierWork from '../components/CarrierWork'
import ChooseUs from '../components/ChooseUs'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'
import ImageSection from '../components/ImageSection'
import Banner from '../components/Banner'
import AbroadBanner from '../components/AbroadBanner'
import AbroadCareerBanner from '../components/AbroadCareerBanner'


const Home = () => {
  return (
    <div>
       
       
        <AbroadBanner />
        <JobCategories />
        <Banner />
        <CarrierWork />
        <ImageSection />
        <ChooseUs />
        {/* <AbroadCareerBanner /> */}
        <Testimonials />
        <Newsletter />
    </div>
  )
}

export default Home