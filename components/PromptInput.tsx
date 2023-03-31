'use client'

import { useState } from 'react'

const PromptInput = () => {
  const [prompt, setPrompt] = useState('')

  return (
    <div className='m-10'>
      <form className='flex flex-col rounded-md border shadow-md shadow-slate-400/10 lg:flex-row lg:divide-x'>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='Enter a prompt...'
          className='flex-1 rounded-md p-4 outline-none'
        />
        <button
          className={`p4 font-bold ${
            prompt
              ? 'bg-violet-500 text-white transition-colors duration-200'
              : 'text-gray-300 cursor-not-allowed '
          }`}
          type='submit'
          disabled={!prompt}
        >
          Generate
        </button>
        <button className='bg-violet-400 p-4 font-bold text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-300'>
          Use Suggestion
        </button>
        <button className='bg-white p-4 font-bold text-violet-500 transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-300'>
          New Suggestion
        </button>
      </form>
    </div>
  )
}
export default PromptInput
