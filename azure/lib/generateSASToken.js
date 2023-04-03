const {
  BlobServiceClient,
  StorageSharedKeyCredential,
  BlobSASPermissions,
  generateBlobSASQueryParameters,
} = require('@azure/storage-blob')

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME

const sharedKeyCredential = new StorageSharedKeyCredential(
  accountName,
  accountKey
)

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`
)

async function generateSASToken() {
  const containerClient = blobServiceClient.getContainerClient(containerName)

  const permissions = new BlobSASPermissions()
  permissions.read = true
  permissions.write = true
  permissions.create = true

  const expiresOn = new Date()
  expiresOn.setMinutes(expiresOn.getMinutes() + 30)

  const sasToken = generateBlobSASQueryParameters(
    {
      containerName: containerClient.containerName,
      permissions,
      expiresOn,
    },
    sharedKeyCredential
  ).toString()

  return sasToken
}

module.exports = generateSASToken
