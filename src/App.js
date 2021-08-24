import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocal=()=>{
  const lst = localStorage.getItem("list");
  if(lst){
  return JSON.parse( localStorage.getItem("list"))
  }
  return [];
}

function App() {
  const [text,setText]=useState('');
  const [list,setList]=useState(getLocal());
  const [alert,setAlert]=useState({show:false,msg:'',type:''});
  const [editId,setEditID]=useState(null);
  const [isedit,setIsEdit]=useState(false);

  
  const submitHandler=(e)=>{
    e.preventDefault();
    if (!text){
      setAlert({show:true,msg:'please enter a value', type:'danger'});
    }
    else if(text && isedit){
      const newItem = list.map((item)=>{
        if(item.id===editId){
          return{...item,title:text}
        }
        return item
      });

      setList(newItem);
      setAlert({ show: true, msg: 'item changed', type: 'success' });
      setIsEdit(false);
      setText('') 


      
    }
    else {
      const newItem = {id:new Date().getTime().toString(),
      title:text}
      setList([...list,newItem]);
      setText('');
      setAlert({ show: true, msg: 'Item added', type: 'success' });
      console.log(list);}
 
  }

  const deleteHandler = (id) => {
    const newList = list.filter((lst) => lst.id !== id);
    setList(newList);
    setAlert({ show: true, msg: 'item deleted', type: 'danger' });
  }

  const clearItems=(e)=>{
    e.preventDefault();
    setList([]);
    setAlert({ show: true, msg: 'empty list', type: 'danger' });

  }
  const editItem=(id)=>{

    const newItem = list.find((item)=>item.id===id);
    setIsEdit(true);
    setText(newItem.title);
    setEditID(id);


  }
  useEffect(()=>{

    localStorage.setItem("list",JSON.stringify(list));

  },[list])


  return <section className="section-center">
    {alert && <Alert setAlert={setAlert} {...alert} ></Alert>}
    <form onSubmit={submitHandler} className="grocery-form">
      <h3>grocery bud</h3>
      <div className="form-control">
        <input placeholder="e.g. eggs" type="text" className="grocery" value={text} onChange={(e)=>setText(e.target.value)} />
        <button className="submit-btn" >{isedit ? 'edit':'submit'}</button>
      </div>
    </form>

   <div className="grocery-container">
      <List editItem={editItem} deleteHandler={deleteHandler} list={list} ></List>
     <button className="clear-btn" onClick={clearItems}>clear items</button>
   </div>

  </section>
}

export default App
