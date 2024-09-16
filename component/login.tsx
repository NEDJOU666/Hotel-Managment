import react from  'react'
import './login.css'
import { FaUser, FaLock} from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";

const Login = () => {
    return (
      
      <div className="Page">
        <div>
          <div className='form'>
        <form action=''>
          <h1 className='h1'>Login form </h1>
          <div className='input-box'>
            <input type ='text' placeholder ='Admin Name' required/>
            <FaUser className='icon' />
          </div>
          <div className='input-box'>
            <input type='number' placeholder='Tel Number'/>
            <BsFillTelephoneFill className='icon'/>
          </div>
          <div className='input-box'>
            <input type='password' placeholder="Password" required/>
            <FaLock className='icon'/>
          </div>
          <div className="remember-forgot">
            <label><input type="checkbox"/>Remember me </label>
            <button className='submit' type='submit'>login</button>
          </div>
          </form>
      </div>
      </div>
        <div className="pic">c</div>
      </div>
    )
  }
  
  export default Login;