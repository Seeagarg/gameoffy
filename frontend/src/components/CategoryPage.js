import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from "../../src/assets/images/logo.png";
import {Link} from 'react-router-dom'
import { IoArrowBackOutline } from "react-icons/io5";
import { fetchGames } from './store/Slice';
import Spinner from './Spinner';
import { arr } from '../Data';

function CategoryPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryName } = useParams(); 
  const games = useSelector((state) =>
    state.game.data.games.filter((game) => game.category === categoryName)
  );

  let lang = useSelector((state)=>state.langSlice)
  lang = lang.langSlice.lang;

  const changeLang=(key)=>{
    console.log(key,lang)
    if(lang == 0){
      return key.slice(0,13);
    }
    if(lang == 1){
      console.log("====",lang,key)
     const data = arr.findIndex((item)=>item.key == key);
     console.log(data)
     if(data>=0){
      return arr[data].value.slice(0,13);
     }
     return key.slice(0,13);
    }
  }

  useEffect(() => {
    // Fetch games when the component mounts
    dispatch(fetchGames());
  }, [dispatch]);

  if (!games || games.length === 0) {
    // return <p>No games found for this category</p>;
    return(
      <Spinner/>
    )
  }
  
  return (
    <div className='bg-black min-h-screen p-2'>
      <div className=' flex justify-between bg-gradient-to-r from-emerald-500 to-amber-500 p-2 text-white font-serif text-2xl rounded-lg'>
        <IoArrowBackOutline onClick={() => navigate('/')}/>
        <h2>{changeLang(categoryName)} {lang==0?'Games':'Michezo'}</h2>
        <Link to='/'> 
          <img className="h-[40px] p-1 ml-6" src={logo} alt="logo" />
        </Link>
      </div>
      <div className=" lg:mx-6 grid lg:grid-cols-4 sm:grid-cols-3 md:grid-cols-4 grid-cols-2 gap-6 lg:gap-8 p-6 lg:p-10 bg-black h-full">
        {games.map((game) => (
          // <Link to={`/games/${game.gameid}`} key={game.gameid}>
            <div className={`relative ${game.category} group`}>
        <div className='transition-transform duration-300 transform scale-100 group-hover:scale-105'>
           <img 
              className="rounded-lg object-fit lg:h-[280px] lg:w-[280px] shadow-lg shadow-white md:h-[300px] sm:h-[200px] h-[150px] w-[200px] border border-white overflow-hidden "
                src={game.imgurlnew}
                alt={game.gamename} 
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button className="bg-amber-400 text-white lg:px-2 lg:py-2 px-2 py-1 rounded-lg font-semibold">
                <Link to={`/games/${game.gameid}`} key={game.gameid}>
                  {lang==0?'Play Now':'Cheza sasa'}
                  </Link>
                  </button>
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-amber-300 uppercase rounded-b lg:px-4 lg:py-4 px-1 py-1 text-black text-center font-semibold">
                      {changeLang(game.gamename)}
                    </div>
                    </div>
              {/* <h2 className="text-center text-white font-serif lg:mt-2">{game.gamename}</h2> */}
              {/* <h3 className="text-center text-white font-serif">{game.category}</h3> */}
            </div>
          // </Link> 
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
