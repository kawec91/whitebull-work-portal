import Link from 'next/link'
import React from 'react'

export default function AuthLoginForm() {
    const inputStyle = `w-full border border-black p-2 rounded-md`;
    const divStyle = `flex gap-2 w-full flex-col`
  return (
    <>
        <form className='flex flex-col items-center justify-center gap-4 p-8'>
            <div className={divStyle}>
                <label>E-mail:</label>
                <input type='email' required className={inputStyle}/>
            </div>
            <div className={divStyle}>
                <label>Hasło:</label>
                <input type='password' required className={inputStyle}/>
            </div>
            <button className='py-2 px-6 bg-red-700 uppercase text-white rounded-full font-bold'>Zaloguj</button>
            <p>Nie masz konta? <Link href={'/auth/register'} className='text-blue-700'>Zarejestruj się</Link>.</p>
        </form>
    </>
  )
}
