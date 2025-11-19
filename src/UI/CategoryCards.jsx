import React from 'react'
import './CategoryCards.css'
import { useNavigate } from "react-router-dom";

function CategoryCards({ data }) {
    const navigate = useNavigate();
    // console.log(data)
    // console.log(data[0].images[0])
    // const handleClick = ()=>{ navigate(`/category/${item}`)}
    
    return (
        <>
        <div className="category-container">
             {data.map((item,index)=>{
              return  <div className="card1" onClick={()=>{ navigate(`/category/${item.category}`)}}  key={index}>
                <img src={item?.images[0]} className='img-res' alt={item?.category} />
                <div className="overlay"><span className="category-name">{item?.category}</span></div>
            </div>
            })}
        </div>
           
        </>
    )
}

export default CategoryCards