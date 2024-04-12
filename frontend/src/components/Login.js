import React,{useState} from 'react'
import logo from '../assets/images/gamelogo.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {useSelector} from 'react-redux'
import { toast } from "react-toastify";

const Login = () => {

    let lang = useSelector((state)=>state.langSlice)
    lang = lang.langSlice.lang

    const [msisdn, setMsisdn] = useState('');
    const navigate=useNavigate()

    const handleMsisdnChange = (e) => {
        setMsisdn(e.target.value);
    };

    const handleSubmit = (e) => {
        console.log('clicked');
        e.preventDefault(); 

        if(msisdn == "" || msisdn==undefined){
            toast.warn("Please Enter Your Number..");
            return;
        }
        console.log(msisdn)
        
        const data={
            msisdn:msisdn
        }
        axios.get(`http://gamelover.gameofyy.com/checkuser`,data)
            .then(response => {
            console.log("response data", response.data)
                if (response.data.statusId == '1') {
                    localStorage.setItem('number',msisdn)
                    navigate(`/`); 
                    
                } else {
                    setMsisdn('')
                    toast.error('Not Subscribed')
                    navigate('/login'); 
                }
            })
            .catch(error => {
                console.error('Error checking user:', error);
                toast.error(error.message)
                // navigate('/');
            });
    };



    return (
        <div className='bg-[#623193] h-screen'>

            <div className='container mx-auto flex flex-col justify-center py-[90px]'>
                <div className=' mx-auto'>
                    <img class="rounded-t-lg h-10" src={logo} alt="" />
                </div>
                <div className='flex justify-center py-3'>
                    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                        <div class="p-5 shadow-xl shadow-purple-600 ">


                            <div class="w-full max-w-sm p-2  bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                                <form class="space-y-4" action="#" onSubmit={handleSubmit}>
                                    <h5 class="text-2xl  text-[#6B57EF] font-bold text-center capitalize dark:text-white">{lang == 0 ?'SIGN IN TO ENJOY !':'INGIA ILI KUFURAHIA !'}</h5>
                                    <div>
                                        <label for="number" class="block mb-2 text-sm font-medium text-gray-700 dark:text-grey-700">{lang==0?"Enter Number":"Weka Nambari"}</label>
                                        <input type="number" name="number" id="number" value={msisdn} onChange={handleMsisdnChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="*********" required />
                                    </div>



                                    <button type="button" class="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleSubmit}>{lang==0?'Login':'Ingia'}</button>



                                </form>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Login
