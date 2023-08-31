import React ,{ useState,useEffect}from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { useNavigate , useLocation } from 'react-router-dom';
function   Spinner({path="login"}) {
    const[count,setCount]=useState(3);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((prevValue)=> --prevValue);
        },1000);
        count === 0 && navigate(`/${path}`,{
            state:location.pathname,
        }); 
        return () => clearInterval(interval);
    },[count,navigate,location,path]);

  return (
    <div style={{ width: '100px', margin: 'auto', display: 'block'}}>
        <div className='text-center text-[#fff]'>redirecting you in {count} seconds</div>
      <ClipLoader color="#52bfd9" size={100}/>
    </div>
  );
};

export default Spinner;