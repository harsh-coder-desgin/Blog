import React from 'react'
import { Link } from "react-router-dom"
import Logo from '../Logo'

function Footer() {
  return (
     <footer className="bg-gray-100 border-t border-gray-300 mt-auto">
  {/* Main Footer Section */}
  <section className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
    {/* Logo */}
    <div>
      <Logo width="100px" />
    </div>

    {/* Navigation Links */}
    <nav className="flex flex-wrap justify-center gap-4 text-sm text-blue-600">
      <Link to="/privacy-policy" className="hover:underline transition">Privacy Policy</Link>
      <Link to="/terms" className="hover:underline transition">Terms of Service</Link>
      <Link to="/about" className="hover:underline transition">About</Link>
      <Link to="/contact" className="hover:underline transition">Contact</Link>
    </nav>
  </section>

  {/* Bottom Copyright */}
  <div className="text-center text-gray-500 text-sm pb-4">
    © {new Date().getFullYear()} MyApp. All rights reserved.
  </div>
</footer>

  )
}

export default Footer
