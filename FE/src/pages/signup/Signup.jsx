import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckBox';
import { Link } from 'react-router-dom';
import {useSignup} from '../../hooks/useSignup.js'

const SignUp = () => {
	const [inputs, setInputs] = useState({
	
		userName: "",
		password: "",
	
		gender: "",
	});

	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		
		setInputs({ ...inputs, gender });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
	console.log(inputs)
	await signup(inputs.userName,inputs.password,inputs.gender);
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit}>
				
					<div>
						<label className='label p-2 '>
							<span className='text-base label-text'>userName</span>
						</label>
						<input
							type='text'
							placeholder='johndoe'
							className='w-full input input-bordered h-10'
							value={inputs.userName}
							onChange={(e) => setInputs({ ...inputs, userName: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>


					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

					<Link
						to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
						href='#'
					>
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700' type='submit' >
						<span>SignUP</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;
