import { useContext } from "react"
import Games from "./Cards.js/Games"
import { UserContext } from "./UserContext"
import './styles/dashboard.css'
import Nav from "./Nav"



const Dashboard=()=>{
    const {user}=useContext(UserContext)
    return(
        <>
        <Nav/>
        <h1>Welcome</h1>
        <h2>{user.email}</h2>
        <p className="totalPoints">You have <span>{user.points}</span> points</p>

        <h1>Play Games</h1>
        <div className="gameCards">
        <Games/>
        </div>

        </>
    )
}

export default Dashboard