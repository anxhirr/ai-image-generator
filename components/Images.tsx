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

  return <div>Images</div>
}
export default Images
