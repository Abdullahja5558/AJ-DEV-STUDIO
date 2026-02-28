
import ExperienceTimeline from '@/components/CinematicTimeline'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'

import Navbar from '@/components/Navbar'
import ProjectsShowcase from '@/components/ProjectsShowcase'
import  ReviewsInfinite from '@/components/ReviewsInfinite'

import { TechnicalEcosystem } from '@/components/TechnicalEcosystem'

import React from 'react'

const page = () => {
  return (
    <>
    <Navbar />
    <Hero />
    <TechnicalEcosystem />
    <ExperienceTimeline/>
    <ProjectsShowcase/>
    <ReviewsInfinite/>
    <ContactSection/>
    <Footer/>
  
    
    </>
  )
}

export default page