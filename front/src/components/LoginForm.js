import React, {  useContext, useState } from "react"
import { login, signUp } from "../api/services"
import { UserContext } from "./UserContext"
import '../components/styles/login.css'
import { useNavigate } from "react-router-dom"



const LoginForm = () => {
const {user,setUser}=useContext(UserContext)
const [username,setUsername]=useState('')
  const [password, setPassword] = useState("")
  const [isRegistered,setIsRegistered]=useState(true)
  const navigate=useNavigate()

  const formHandler=async (e)=>{
    e.preventDefault()
    if(username===''||password===""){
        alert('Username and password must be completed')
    }
    const res=await login({username,password})
   if(res==='<h1>Error</h1>'){
    alert('Failed login, are you sure you are signed up?')
   }else{
    setUser(res)
    navigate('/dashboard')
   }

  }

  const handleSingUp=()=>{
    setIsRegistered(!isRegistered)
  }

  const signUpForm=async (e)=>{
    if(username===''||password===""){
      alert('Username and password must be completed')
  }
  const res=await signUp({username,password})
  if(res==='<h1>Error</h1>'){
    alert('Failed login, are you sure you are signed up?')
   }else{
    setUser(res)
    navigate('/dashboard')
   }
  }

  return(
    <>
    <div className="title">
    <h1>Welcome!</h1>
    </div>

   {
    isRegistered ? (
      <>
      <h2>Login</h2>
    <form className="form" onSubmit={formHandler}>
    <label >Username:</label>
      <input 
      type="text" 
      className="infos" 
      id="nome"
      value={username}
      onChange={e => setUsername(e.target.value)} />
    <div className="mario"></div>
      <label >Password:</label>
      <input 
      type="password" 
      className="infos" 
      id="email"
      value={password}
      onChange={e=>setPassword(e.target.value)}
      />
      <div className="buttons">
      <button type="submit">Send</button>
      <button type="reset" id="limpar">Clear</button>
      </div>
      <div>
      <p className="signup-link">
          No account?
          <a onClick={handleSingUp}>Sign up</a>
        </p>
      </div>
  </form>
      </>
    ):(<>
      <h2>SignUp</h2>
      <form className="SignUpform" onSubmit={signUpForm}>
  <label className="SignUpLabel" >Username:</label>
    <input 
    type="text" 
    className="infos" 
    id="nome"
    value={username}
    onChange={e => setUsername(e.target.value)} />
  <div className="mario"></div>
    <label className="SignUpLabel" >Password:</label>
    <input 
    className="infos" 
    type="password" 
    id="email"
    value={password}
    onChange={e=>setPassword(e.target.value)}
    />
    <div className="buttons">
    <button type="submit" className="SignUpbuttons">Send</button>
    <button type="reset" id="limpar">Clear</button>
    </div>
    <div>
    <p className="signup">
        Already register?
        <a onClick={handleSingUp}>Login</a>
      </p>
    </div>
</form>
      </>
    )
   }

    </>
  )

  }

export default LoginForm

