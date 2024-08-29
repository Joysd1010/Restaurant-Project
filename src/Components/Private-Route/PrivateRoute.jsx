import React,{useContext} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { Bars } from 'react-loader-spinner'
import DashBoard from '../../Pages/adminDashBoard/DashBoard';


const PrivateRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location=useLocation()
    

    if(loading){
        return <div className='flex py-60 justify-around'><Bars
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      /></div>
    }

    if(user){
        return <DashBoard/>;
       }
       return <Navigate to="/login" state={{from: location}}   replace></Navigate>
    };

export default PrivateRoute;