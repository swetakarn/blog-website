import Link from 'next/link'
import {auth} from '../firebase'
import styles from "../styles/Home.module.css"
export default function NavBar({user}) {
    
    return (
        <nav>
        <div className="nav-wrapper #fb8c00 orange darken-1" >
          <Link href="/">Blogger</Link>
          <ul id="nav-mobile" className="right">
            {user?
            <>
              <li><Link href="/createblog">Create Blog</Link></li>
              <li> <button  className="btn red" onClick={() => auth.signOut()}>Logout</button></li>
            </>
            
            :
                <>
                <li><Link href="/signup">Signup</Link></li>
                <li><Link href="/login">Login</Link></li>
                </>
            }
            
          </ul>
        </div>
      </nav>
    )
}
