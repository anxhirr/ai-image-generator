'use client'

import Image from 'next/image'
import useSWR from 'swr'
import fetchImages from '../lib/fetchImages'

type Image = {
  name: string
  url: string
}

const Images = () => {
  const {
    data: images,
    mutate: refreshImages,
    error,
    isLoading,
  } = useSWR('/api/getImages', fetchImages, {
    revalidateOnFocus: false,
  })

  console.log('images', images)

  return (
    <div>
      <div>
        {images?.imageUrls?.map((image: Image) => (
          <div key={image.name}>
            <Image
              src={image.url}
              alt={image.name}
              width={800}
              height={800}
              className='w-full shadow-2xl rounded-sm drop-shadow-lg -z-10'
            />
          </div>
        ))}
      </div>
    </div>
  )
}
export default Images
