import React, { useState } from "react";
import Link from 'next/link'
import {auth} from "../firebase"
import { useRouter } from "next/navigation";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    const router = useRouter()
    e.preventDefault();
         try{
          const result = await auth.signInWithEmailAndPassword(email,password)
          M.toast({html: `welcome ${result.user.displayName}`,classes:"green"})  
          router.push("/")
        }catch(err){
          M.toast({html: err.message,classes:"red"})    
        }
  };
  return (
    <div className="container center">
    <h3>Plase Login!!</h3>
     <form onSubmit={(e) => handleLogin(e)}>
         <div className="input-field">
             <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
             <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
         </div>
         <button type="submit" className="btn #fb8c00 orange darken-1">Login</button>
        <Link href="/signup"><h5>Dont Have a account</h5>signup</Link>
     </form>
    
</div>
  );
};

export default Login;
