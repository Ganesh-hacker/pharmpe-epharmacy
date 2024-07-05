import React from 'react'
import { Link } from 'react-router-dom'
export default function Helpcenterdiv(props) {
  console.log(props)
  return (
    <div>
    <Link to={`/helpcenterdescription?id=${props.id}`}> <p style={{fontSize:'22px',fontWeight:'bolder', textDecoration:'underline' ,color:'black'}}>{props.question}</p></Link>
     <p style={{fontSize:'1.7rem',color:'#595959',letterSpacing:'normal',cursor:'pointer'}}>{props.answer}</p>
    </div>
  )
}
