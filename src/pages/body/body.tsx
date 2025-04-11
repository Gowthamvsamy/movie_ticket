import React from 'react'
import Carousel from '../../component/carousel'
import Cards from '../../component/card'
import { useNavigate } from 'react-router-dom';

function Body() {

  const navigate = useNavigate();

  const handleMovieClick = (id: number) => {
    navigate(`/details/${id}`);
  }

  return (
    <>
      <div>
        <div>
          <Carousel />
        </div>
        <div>
          <Cards setMovieData={handleMovieClick}/>
        </div>
      </div>
    </>
  )
}

export default Body