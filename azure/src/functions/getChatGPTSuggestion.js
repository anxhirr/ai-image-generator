const { app } = require('@azure/functions')
const openai = require('../../lib/openai')

app.http('getChatGPTSuggestion', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt:
        'Write a random text prompt for Dall E  to generate a random image. This prompt will be shown to the user,include details such as the genre of the image, the type of objects in the image, and the mood of the image.You can also include a description of the image, such as "a picture of a cat in a hat". Do not wrap the answer in quotes',
      max_tokens: 100,
      temperature: 0.7,
    })

    context.log(`Http function processed request for url "${request.url}"`)

    const responseText = response.data.choices[0].text

    return { body: responseText }
  },
})
