const { app } = require('@azure/functions')
const generateSASToken = require('../../lib/generateSASToken')

app.http('generateSASToken', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async () => {
    sasToken = await generateSASToken()

    return { body: sasToken }
  },
})
