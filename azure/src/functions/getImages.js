const { app } = require('@azure/functions')
const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require('@azure/storage-blob')
const generateSASToken = require('../../lib/generateSASToken')

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME

const sharedKeyCredential = new StorageSharedKeyCredential(
  accountName,
  accountKey
)

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  sharedKeyCredential
)

app.http('getImages', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    const containerClient = blobServiceClient.getContainerClient(containerName)

    const imageUrls = []
    const sasToken = await generateSASToken()

    for await (const blob of containerClient.listBlobsFlat()) {
      const imageUrl = `${blob.name}?${sasToken}`
      const url = `https://${accountName}.blob.core.windows.net/${containerName}/${imageUrl}`
      imageUrls.push({
        name: blob.name,
        url,
      })
    }

    const sortedImageUrls = imageUrls.sort((a, b) => {
      // draw-a-cat_1626120000000.png
      const aName = a.name.split('_').pop().toString().split('.').shift()
      const bName = b.name.split('_').pop().toString().split('.').shift()
      return bName - aName
    })

    context.log(
      `Http function processed a request for this url: ${request.url}`
    )

    return {
      jsonBody: {
        imageUrls: sortedImageUrls,
      },
    }
  },
})
