
import { Link } from 'react-router-dom'
import {Card, Image,Button } from 'semantic-ui-react'
import games from '../helpers/games.json'
import '../styles/dashboard.css'

const Games=()=>{

    return(
        <>
        {
           Object.keys(games).map((key)=>{
            const entry=games[key]
            return(
                <Card key={entry.name}>
                <Image src={entry.image} />
                <Card.Content>
                  <Card.Header>{entry.name}</Card.Header>
                 <Link to={entry.ref}>
                 <Button className='playButton'>
                    Play!
                  </Button>
                 </Link> 
                </Card.Content>
              </Card>
            )
           })
        }
        </>

    )
}

export default Games