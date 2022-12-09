import React, { useEffect } from 'react'
import Search from '../components/Search'

const Home = () => {
  useEffect(() => {
    sessionStorage.clear();
  }, [])
  return (
    <div className="home">
      <Search />
    </div>
  )
}

export default Home