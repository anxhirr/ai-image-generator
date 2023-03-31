import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  return (
    <header className='flex justify-between sticky top-0 bg-white z-50 shadow-md'>
      {/* left  */}
      <div className='flex items-center space-x-2'>
        {/* <Image
          src='https://tinyurl.com/4wctmuwh'
          width={30}
          height={30}
          alt='logo'
        /> */}

        <div>
          <h1 className='font-bold'>
            The
            <span className='text-violet-500'>AI</span>
            Image Generator
          </h1>
          <h2>Powered by OpenAi, Dall E 2, and Microsoft Azure!</h2>
        </div>
      </div>
      {/* right  */}
      <div className='flex text-xs md:text-base text-gray-500 divide-x items-center'>
        <Link
          href='https://github.com/anxhirr/ai-image-generator'
          className='px-2 font-light'
        >
          Github Repo
        </Link>
      </div>
    </header>
  )
}
export default Header
