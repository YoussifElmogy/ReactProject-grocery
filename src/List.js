import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const List = ({ list, deleteHandler, editItem}) => {
  
  
  return <div className="grocery-list">
  {
    list.map((lst)=>{
      const{id,title}=lst
      return <article key={id} className="grocery-item">
        <p className="title">{title}</p>
        <div className="btn-container">
          <button onClick={() => editItem(id)}  className="edit-btn"><FaEdit></FaEdit></button>
          <button onClick={()=>deleteHandler(id)} className="delete-btn"  ><FaTrash></FaTrash></button>
        </div>
        
      </article>
      
    })
  }
  
  </div>
}

export default List
