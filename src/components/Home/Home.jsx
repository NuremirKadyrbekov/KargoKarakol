import React from 'react'
import { Link, redirect } from 'react-router-dom'



function Home() {
  return (
    <div>
      HomePage
      <Link to={'auth'}/>
      
    </div>
  )
}

export default Home
