import { useState } from 'react'

function SignUp() {

  const [formData, setFormData] = useState({})
  const [error, setError] = useState({
    isError: false,
    error: null
  })
  const [isLoading, setIsLoading] = useState(false)

  const onchangeHandler = (e) => {
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value
    })

    console.log(formData)
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError({
      isError: false,
      error: null
    })
    const bodyData = {
      username: formData.name,
      email: formData.email,
      password: formData.password
    }
    try {
      const response = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData)
      })
  
      console.log(response)
  
      if (response.status === 201) {
        alert(`${bodyData.username} created successfully`)
      } else {
        const data = await response.json()
        setError({
          isError: true,
          error: data.message
        })
        setTimeout(() => {setError({
          isError: false,
          error: null
        })}, 2000)
        console.log(error)
      }
    } catch (error) {
      console.log(`error occurred while signin pu ${error}`)
    }

    // const data = await response.json()
    // console.log(data)
    setFormData({ 
      name: "",
      email: "",
      password: ""})
    setIsLoading(false)
  }

  return (
    <div className='max-w-3xl mx-auto text-center mt-10' onSubmit={onSubmitHandler}>
      <h1 className="text-4xl font-semibold text-slate-800 ">Sign Up</h1>
      <form className='mt-5 flex flex-col gap-2'>
        <input type="text" name="name" id="name" placeholder='Enter your name' className=' bg-slate-300 rounded-lg p-2'  onChange={onchangeHandler} value={formData.name}/>
        <input type="email" name="email" id="email" placeholder='Enter your email' className=' bg-slate-300 rounded-lg p-2' onChange={onchangeHandler} value={formData.email}/>
        <input type="password" name="password" id="password" placeholder='Enter your password' className=' bg-slate-300 rounded-lg p-2' onChange={onchangeHandler} value={formData.password}/>
        <input type="submit" disabled={isLoading} value={ isLoading ? "...loading" : "Submit"} className={isLoading ? 'bg-slate-600 rounded-lg text-white p-2 px-10 mx-auto' : 'bg-slate-800 rounded-lg text-white p-2 px-10 mx-auto'} />
      </form>
      <p className="text-xl text-red-500">{error.isError ? error.error : "" }</p>
    </div>
  )
}

export default SignUp