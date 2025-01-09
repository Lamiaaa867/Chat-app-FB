import React from 'react'

function Login() {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
    <div class="  p-6 h-full w-full bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 border border-gray-100">
    <h1 className='text-3xl font-semibold text-center text-gray-300'>
				<p>Login</p>
					<span className='text-blue-500'> ChatApp </span>
				</h1>
     
       <form>
        <div>
          <label className='label p-2'>
            <span className='text-base label-text '>username</span>
          </label>
          <input type='text' placeholder='enter username' className='w-full input input-bordered h-10 '/>
        </div>
        <div>
          <label className='label p-2'>
            <span className='text-base label-text '>password</span>
          </label>
          <input type='password' placeholder='enter your password' className='w-full input input-bordered h-10 '/>
        </div>
     
        <a href='#' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
						{"Don't"} have an account?
					</a>
					<div>
						<button className='btn btn-block btn-sm mt-2' >
				     login
						</button>
					</div>
       </form>
      </div>
      
    </div>
  )
}

export default Login