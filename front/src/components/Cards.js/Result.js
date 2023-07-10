import Nav from "../Nav";
import { Button, Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import '../styles/results.css'
import { useEffect, useState } from "react";

const Result=({result,restart}) =>{
   const [resultIcon,setResultIcon]=useState()

   useEffect(()=>{
      if(result==="You win!"){
         setResultIcon('winner')
      }else if(result===`It's a tie!`){
         setResultIcon('game')
      }else if(result==='You lose. Try again.'){
         setResultIcon('close')
      }
   },[])

 return(
   <>
    <h1>{result}</h1>
    <div className="resultIcon">
    {resultIcon && <Icon name={resultIcon} size="huge" />}
    </div>
    <div className="buttonsResult">
   <Link to='/dashboard'><Button className="backButton" content='Go back to dashboard' /></Link> 
   <Button className="againButton" onClick={restart}  content='Play Again' />
   </div>
    </>
 )
}

export default Result;