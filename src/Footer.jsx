import React from 'react'
import './Footer.css'
const Footer = () => {
    const d=new Date();
  return (
    <footer>
      <p>&copy;{d.getFullYear()} Squid Game Challenge | Built with ❤️</p>
    </footer>
  )
}

export default Footer
