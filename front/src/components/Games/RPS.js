import React, { useContext, useEffect, useState } from "react";
import { update } from "../../api/services";
import Result from "../Cards.js/Result";
import Nav from "../Nav";
import '../styles/rps.css'
import { UserContext } from "../UserContext";

const RPS = () => {
  const {user,setUser}=useContext(UserContext)
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGamePlayed,setIsGamePlayed]=useState(true)


const choices = ["Rock", "Paper", "Scissors"];


  const handlePlayerChoice = (choice) => {
    setPlayerChoice(choice)
    setIsGameStarted(true)
  };

  const handlePlayComputer =async () => {
    const computerChoice = getRandomChoice();
    const result = determineWinner(playerChoice, computerChoice)
    setComputerChoice(computerChoice)
    setResult(result)
    if (result === "You win!") {
      const newPoints=user.points + 1
      const res= await update({userId:user._id,points:newPoints})
      setUser((prevUser)=>{
      return{
        ...prevUser,
        points:newPoints
      }
      })
    }

    setTimeout(()=>{
      setIsGamePlayed(false)
    },1000)
  }

  const restart=()=>{
    setPlayerChoice('')
    setComputerChoice('')
    setResult('')
    setIsGameStarted(false)
    setIsGamePlayed(true)
  }
  const getRandomChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const determineWinner = (playerChoice, computerChoice) => {
    if (playerChoice === computerChoice) {
      return "It's a tie!";
    } else if (
      (playerChoice === "Rock" && computerChoice === "Scissors") ||
      (playerChoice === "Paper" && computerChoice === "Rock") ||
      (playerChoice === "Scissors" && computerChoice === "Paper")
    ) {
      return "You win!";
    } else {
      return "You lose. Try again.";
    }
  }



  return (
    <div>
      <Nav/>

         {isGamePlayed ? (
            <>
             <h1>Rock, Paper, Scissors Game</h1>
       <div>
         <p className="userChoice">Your choice:{playerChoice}</p>
         <div className="userOptions">
            <button onClick={() => handlePlayerChoice("Rock")} disabled={playerChoice!==''}>Rock</button>
             <button onClick={() => handlePlayerChoice("Paper")} disabled={playerChoice!==''}>Paper</button>
             <button onClick={() => handlePlayerChoice("Scissors")} disabled={playerChoice!==''}>
              Scissors
             </button>
          </div>
          <p className="userChoice">Computer's choice: {computerChoice}</p>
          <div className="pcChoice">
             <button  onClick={handlePlayComputer} disabled={playerChoice===""}>Play Computer</button>
            </div>
           </div>
            </>
        ):
         <Result result={result} restart={restart}/>}
      </div>

  );
};

export default RPS;

