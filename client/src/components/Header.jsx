import {Link} from 'react-router-dom'

function Header() {
  return (
    <div className='flex mx-auto justify-between max-w-5xl mt-3'>
        <Link to={'/'} ><h1 className="font-bold text-3xl flex text-slate-600">Mern<p className='text-yellow-600'>Auth</p></h1></Link>
        <ul className='flex gap-2'>
            <Link to={'/'} ><li className='rounded-lg hover:bg-slate-500 hover:text-white hover:cursor-pointer p-2 '>Home</li></Link>
            <Link to={'/about'} ><li className='rounded-lg hover:bg-slate-500 hover:text-white hover:cursor-pointer p-2 '>About</li></Link>
            <Link to={'/profile'} ><li className='rounded-lg hover:bg-slate-500 hover:text-white hover:cursor-pointer p-2 '>Profile</li></Link>
            <Link to={'/sign-in'} ><li className='rounded-lg hover:bg-slate-500 hover:text-white hover:cursor-pointer p-2 '>SignIn</li></Link>
            <Link to={'/signup'} ><li className='rounded-lg hover:bg-slate-500 hover:text-white hover:cursor-pointer p-2 '>Signup</li></Link>
        </ul>
    </div>
  )
}

export default Header