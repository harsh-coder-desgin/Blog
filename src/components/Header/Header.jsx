import React from 'react'
import {Container,Logo,Logoutbtn} from "../index"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Header() {
  const authStatus = useSelector((state)=> state.auth.status)
  const navigate = useNavigate()

  const navItems=[
    {
      name:'Home',
      slug:"/",
      active:true
    },
    {
      name:'Login',
      slug:"/login",
      active:!authStatus,
    },
    {
      name:'Signup',
      slug:"/signup",
      active:!authStatus,
    },
    {
      name:'All Posts',
      slug:"/all-posts",
      active:authStatus,
    },
    {
      name:'Add Post',
      slug:"/add-post",
      active:authStatus,
    }
  ]
  return (
   <header className="py-4 shadow bg-gray-700 text-white">
  <Container>
    <nav className="flex items-center">
      {/* Logo Section */}
      <div className="mr-6">
        <Link to="/">
          <Logo width="70px" />
        </Link>
      </div>

      {/* Navigation Items */}
      <ul className="flex items-center ml-auto space-x-4">
        {navItems.map((item) =>
          item.active ? (
            <li key={item.name}>
              <button
                onClick={() => navigate(item.slug)}
                className="px-4 py-2 rounded-full hover:bg-white hover:text-gray-800 transition duration-200"
              >
                {item.name}
              </button>
            </li>
          ) : null
        )}

        {/* Logout Button */}
        {authStatus && (
          <li>
            <Logoutbtn />
          </li>
        )}
      </ul>
    </nav>
  </Container>
</header>

  )
}

export default Header
