"use client"

import { useState } from "react"
import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection"
import SearchFilters from "./components/SearchFilters"
import PropertyGrid from "./components/PropertyGrid"
import FeaturedDestinations from "./components/FeaturedDestinations"
import HostSection from "./components/HostSection"
import Footer from "./components/Footer"

export default function HomePage() {
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    checkIn: null,
    checkOut: null,
    guests: 1,
    priceRange: [0, 1000],
    propertyType: "all",
    amenities: [],
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection />
      <SearchFilters filters={searchFilters} setFilters={setSearchFilters} />
      <PropertyGrid filters={searchFilters} />
      <FeaturedDestinations />
      <HostSection />
      <Footer />
    </div>
  )
}
