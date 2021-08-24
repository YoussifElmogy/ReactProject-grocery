import React, { useEffect } from 'react'

const Alert = ({setAlert,alert,msg,type}) => {

  useEffect(()=>{
   const timeout= setTimeout(()=>{
      setAlert(false);

    },2000)
    return ()=>clearTimeout(timeout)

  },[alert])
  return <h2 className={`alert alert-${type}`}>{msg}</h2>
}

export default Alert
