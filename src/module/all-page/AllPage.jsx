import React from 'react'
import { useParams } from 'react-router-dom'

const AllPage = () => {
    const {id} = useParams()
    console.log(id);
    
  return (
    <div>
      Helll All
    </div>
  )
}

export default AllPage
