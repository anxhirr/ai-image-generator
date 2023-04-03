const { app } = require('@azure/functions')
const { BlobServiceClient } = require('@azure/storage-blob')

const openai = require('../../lib/openai')
const axios = require('axios')
const generateSASToken = require('../../lib/generateSASToken')

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME

app.http('generateImage', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: async (request) => {
    const { prompt } = await request.json()

    console.log('prompt', prompt)

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
    })

    image_url = response.data.data[0].url
    console.log('image_url', image_url)

    // download image from url and upload to blob storage
    const res = await axios.get(image_url, { responseType: 'arraybuffer' })

    // arraybuffer is the image data
    const arrayBuffer = res.data

    sasToken = await generateSASToken()

    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net?${sasToken}`
    )

    const containerClient = blobServiceClient.getContainerClient(containerName)

    const timestamp = new Date().getTime()
    const file_name = `${prompt}_${timestamp}.png`

    const blockBlobClient = containerClient.getBlockBlobClient(file_name)

    try {
      await blockBlobClient.uploadData(arrayBuffer)
      console.log('upload successful')
    } catch (error) {
      console.log('upload failed', error.message)
    }
  },
})
