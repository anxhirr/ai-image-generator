'use client'

import fetchSuggestionFromChatGPT from '@/lib/fetchSuggestionFromChatGPT'
import { FormEvent, useState } from 'react'
import useSwr from 'swr'

const PromptInput = () => {
  const [prompt, setPrompt] = useState('')

  const {
    data: suggestion,
    isLoading,
    mutate,
    isValidating,
  } = useSwr('/api/suggestions', fetchSuggestionFromChatGPT, {
    revalidateOnFocus: false,
  })

  const loading = isLoading || isValidating

  const submitPrompt = async (useSuggestion?: boolean) => {
    const inputPrompt = useSuggestion ? suggestion : prompt
    setPrompt('')

    console.log('Submitting prompt:', inputPrompt)

    const res = await fetch('/api/generateImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: inputPrompt }),
    })

    const data = await res.json()
    console.log(data)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await submitPrompt()
  }

  return (
    <div className='m-10'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col rounded-md border shadow-md shadow-slate-400/10 lg:flex-row lg:divide-x'
      >
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={
            (loading && 'ChatGPT is thinking of a suggestion...') ||
            suggestion ||
            'Enter a prompt...'
          }
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
        <button
          onClick={() => submitPrompt(true)}
          className='bg-violet-400 p-4 font-bold text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-300'
        >
          Use Suggestion
        </button>
        <button
          type='button'
          onClick={mutate}
          className='bg-white p-4 font-bold text-violet-500 transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-300'
        >
          New Suggestion
        </button>
      </form>
      {prompt && (
        <p className='mt-4 italic font-light'>
          Suggestion:{' '}
          <span className='text-violet-500'>
            {loading ? 'ChatGPT is thinking...' : suggestion}
          </span>
        </p>
      )}
    </div>
  )
}
export default PromptInput
