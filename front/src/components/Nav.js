import React, { Component, useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { UserContext } from './UserContext'
import './styles/navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { logOut } from '../api/services'


const Nav=()=> { 
    const {user}=useContext(UserContext)
    const navigate=useNavigate()

    const letters=user.email.split('')
    const firstLetter=letters[0].toUpperCase()


    const logout=async()=>{
      await logOut()
      alert('goodbye')
      navigate('/')
    }

    return (
      <Menu>
     <Link to='/dashboard'>
        <Menu.Item
        icon='home'
        />
     </Link> 
         <Menu.Item className='points'
         >
          Points: {user.points}
         </Menu.Item>


        <Menu.Menu position='right'>
          <Menu.Item
            name='logout'
            onClick={logout}
          >
            {firstLetter}
          </Menu.Item>

        </Menu.Menu>
      </Menu>
    )
  }

export default Nav