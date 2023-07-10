import disneyMovies from '../helpers/movies.json'
import { useContext, useEffect, useState } from "react"
import { Button } from 'semantic-ui-react'
import Result from '../Cards.js/Result'
import disneyImage from '../images/disney.png'
import Nav from '../Nav'
import { UserContext } from '../UserContext'
import { update } from '../../api/services'
import '../styles/hangman.css'



const Hangman=()=>{
    const {user,setUser}=useContext(UserContext)
    const [computer, setComputer] = useState('')
    const [lines, setLines] = useState([])
    const [disabledLetters, setDisabledLetters] = useState([])
    const [selectedLetters, setSelectedLetters] = useState([])
    const [revealedLetters, setRevealedLetters] = useState([])
    const [correct,setCorrect]=useState([])
    const [incorrectLetters,setIncorrectLetters]=useState(0)
    const [isGamePlayed,setIsGamePlayed]=useState(true)
    const [result,setResult]=useState('')

    const movies=Object.values(disneyMovies)

  
    const keys1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
    const keys2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    const keys3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  
    const selectMovie = () => {
      const randomIndex = Math.floor(Math.random() * movies.length)
      const randomMovie = movies[randomIndex].toUpperCase()
      console.log(randomMovie)
      setComputer(randomMovie)
  
      const char = randomMovie.split('')
      const linesArray = char.map((character) =>
        character === ' ' ? ' / ' : ' _ '
      )
      setLines(linesArray)
  
      const uniqueLetters = [...new Set(char)]
      const revealed = uniqueLetters
            .filter((letter)=>letter !=' ')
            .map((letter) => {
        const positions = []
        char.forEach((char, index) => {
          if (char === letter) positions.push(index)
        });
        return { letter, positions }
      });
      setRevealedLetters(revealed)
    };
  
    const handleLetterClick = (letter) => {
  
      setSelectedLetters((prevSelectedLetters) => [
        ...prevSelectedLetters,
        letter,
      ])
      setDisabledLetters((prevDisabledLetters) => [
        ...prevDisabledLetters,
        letter,
      ])
      findLetter(letter)
      
    }

    const findLetter = async(letter) => {
        const chars = computer.split('')
        const newCorrect = [...correct]
        const positions = []
      
        if (chars.includes(letter)) {
          newCorrect.push(letter)
      
          chars.forEach((char, index) => {
            if (char === letter && char !== ' ') { 
              positions.push(index);
            }
          })
      
          const updatedLines = [...lines];
          positions.forEach((position) => {
            updatedLines[position] = letter;
          })
      
          setLines(updatedLines);
          if (newCorrect.length === revealedLetters.length) {
            const newPoints=user.points + 1
            const res= await update({userId:user._id,points:newPoints})
            setUser((prevUser)=>{
            return{
                ...prevUser,
                points:newPoints
            }
            })
        
            setResult('You win!')
            setIsGamePlayed(false)
          }
        } else {
          setIncorrectLetters(incorrectLetters + 1)
          if (incorrectLetters=== 6) {
            setResult('You lose. Try again.')
            setIsGamePlayed(false)
          }
        }
        setCorrect(newCorrect)
      }
  
    useEffect(() => {
      selectMovie()
    }, [isGamePlayed])

    const restart=()=>{
        setComputer('')
        setLines([])
        setDisabledLetters([])
        setSelectedLetters([])
        setRevealedLetters([])
        setCorrect([])
        setIncorrectLetters(0)
        setIsGamePlayed(true)
        setResult('')
    }
    return(
<>  
        <Nav/>
        {isGamePlayed? (
                <>
                <div className='image'>
                    <img className='disneyImage' src={disneyImage}/>
                </div>
        <div className='movies'>
        {lines.map((line,index)=>(
           <span className='letters' key={index}>{line}</span>
        ))}
        </div>
        <div className='keyboard'>
            <div className='keyboard1'>
            {keys1.map((key)=>(
                <Button
                basic 
                color='orange' 
                content={key} 
                value={key}
                key={key}
                onClick={()=>handleLetterClick(key)}
                disabled={disabledLetters.includes(key)}
                className='keyButtons'
                />
            ))}
            </div>
            <div className='keyboard2'>
            {keys2.map((key)=>(
                <Button
                basic 
                color='olive' 
                key={key}
                content={key} 
                value={key}
                onClick={()=>handleLetterClick(key)}
                disabled={disabledLetters.includes(key)}
                className='keyButtons'
                />
            ))}
            </div>
            <div className='keyboard3'>
            {keys3.map((key)=>(
                <Button
                basic 
                color='purple' 
                key={key}
                content={key} 
                value={key}
                onClick={()=>handleLetterClick(key)}
                disabled={disabledLetters.includes(key)}
                className='keyButtons'
                />
            ))}
            </div>
            </div>
            <div className='errorDiv'>
              <p className='error'> Error: {incorrectLetters} out of 7</p> 
            </div>
        </>
                
            ): (
                <Result result={result} restart={restart}/>
            )
        }
        </>
        
    )
}

export default Hangman