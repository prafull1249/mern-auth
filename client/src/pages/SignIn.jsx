import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SignIn() {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const { email, password } = formData
    if (!email || !password) {
      setError({
        isError: true,
        error: "Required field is blank"
      })
      setTimeout(() => setError({}), 2000)
    } 
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })

    const data = await response.json()
    console.log(data)
    if (response.status > 299) { 
      console.log("not successful request")
      setError({
        isError: true,
        error: data.message
      })
      setTimeout(() => setError({}), 4000)
    } else {
      console.log("navigating to home")
      navigate('/');
    }

    setIsLoading(false)
  }

  const onChangeHandler = (e) => {
    setFormData({
      ...formData, 
      [e.target.id] : e.target.value
    })
    console.log(formData)
  }

  return (
    <div className='flex flex-col gap-4 max-w-4xl mx-auto'>
      <p className='text-3xl text-center mt-10'>Sign In</p>
      <form onSubmit={onSubmitHandler} className='flex flex-col gap-3'>
        <input className='mx-auto rounded-lg bg-slate-100 text-black px-10 py-2' type="email" name="email" id="email"  placeholder='Enter email' onChange={onChangeHandler}/>
        <input className='mx-auto rounded-lg bg-slate-100 text-black px-10 py-2' type="password" name="password" id="password" placeholder='Enter password'  onChange={onChangeHandler}/>
        <input className='mx-auto rounded-lg bg-slate-900 text-white px-10 py-2' type="submit" value="Sign In" id="submit" />
      </form>
      <p className='text-2xl text-red-500 text-center'> {error.isError ? error.error : ''} </p>
    </div>
  )
}

export default SignIn