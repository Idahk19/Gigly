import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../components/Hero'

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <section className="relative py-28 bg-gradient-to-br from-slate-50 via-indigo-50 to-white">
        <div>
          <p>Why choose Gigly</p>
        </div>
      </section>
       
      <Footer />
    </div>
  )
}

export default Home;
