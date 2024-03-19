import React, { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(charAllowed) str += "!@#$%^&*()_+=[]{}/?<~>";
    if(numAllowed) str += "0123456789";

    for(let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str[char];
    }

    setPassword(pass);

  }, [length, numAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numAllowed, setPassword])

  let copyRef = useRef(null)

  const copyPassword = useCallback(() => {
    copyRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }, [password])

  return (
    <>
    <div className='h-[450px] w-[320px] bg-slate-500 flex flex-col items-center rounded-xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-4'>
      <h1 className='text-center text-xl mt-4 uppercase font-bold'>Password Generator</h1>
      <input className='text-center outline-none mt-14 rounded-3xl border-none px-2 h-10 min-w-48 ' 
      type="text" 
      placeholder='Password'
      defaultValue={password}
      readOnly
      ref={copyRef}
      />
      <button className='px-6 font-bold py-2 mt-3 bg-orange-600 rounded-3xl'
      onClick={copyPassword}
      >COPY</button>

      <input className='w-48 mt-12' type="range" id='range' defaultChecked={length} min={6} max={20} onChange={(e) => {
        setLength(e.target.value)
      }} />
      <label htmlFor="range">Length ({length})</label>
      <div className='mt-8 flex gap-4 items-center justify-center'>
      <input className='w-7 h-7 ' type="checkbox" 
      defaultChecked={numAllowed} 
      id='num'
      onChange={() => {
        setNumAllowed((prev) => !prev)
      }}
      />
      <label className='font-medium' htmlFor="num">Numbers</label>
      </div>

      <div className='mt-6 flex gap-4 items-center ml-3'>
      <input className='w-7 h-7 ' 
      type="checkbox" 
      defaultChecked={charAllowed} 
      id='char'
      onChange={() => {
        setCharAllowed((prev) => !prev)
      }}
      />
      <label className='font-medium' htmlFor="char">Characters</label>
      </div>

    </div>
    </>
  )
}

export default App