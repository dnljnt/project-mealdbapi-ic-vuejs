import { ref } from 'vue'

export function useGemini() {
  const loading = ref(false)
  const error = ref(null)
  const retryMessage = ref('')

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  const fetchGeminiJSON = async (promptText, retries = 3) => {
    if (!API_KEY) {
      throw new Error('Gemini API Key tidak ditemukan.')
    }

    const API_URL =
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        if (attempt === 1) {
          retryMessage.value = ''
        }

        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: promptText,
                  },
                ],
              },
            ],
            generationConfig: {
              response_mime_type: 'application/json',
            },
          }),
        })

        if (!response.ok) {
          // Rate limit / busy server
          if (
            (response.status === 429 || response.status === 503) &&
            attempt < retries
          ) {
            retryMessage.value =
              `AI kitchen is busy... retrying (${attempt}/${retries})`

            await sleep(2500)

            continue
          }

          throw new Error(`Gemini API Error (${response.status})`)
        }

        const data = await response.json()

        const rawText =
          data?.candidates?.[0]?.content?.parts?.[0]?.text

        if (!rawText) {
          throw new Error('Empty response from Gemini.')
        }

        const cleanedText = rawText
          .replace(/```json/gi, '')
          .replace(/```/g, '')
          .trim()

        retryMessage.value = ''

        return JSON.parse(cleanedText)
      } catch (err) {
        if (attempt >= retries) {
          throw err
        }

        retryMessage.value =
          `Retrying request... (${attempt}/${retries})`

        await sleep(2000)
      }
    }
  }

  /* Generate Recipe */
  const generateRecipe = async (ingredients) => {
    loading.value = true
    error.value = null

    try {
      const prompt = `
You are a creative professional chef.

A user has these ingredients:
${ingredients.join(', ')}

Create an original recipe using primarily these ingredients.

Respond ONLY in valid JSON with this exact structure:

{
  "name": "Recipe name",
  "description": "2-sentence flavor description",
  "difficulty": "Easy | Medium | Hard",
  "time_minutes": 30,
  "servings": 4,
  "ingredients": [
    {
      "amount": "2 tbsp",
      "name": "olive oil"
    }
  ],
  "steps": [
    "Step 1 instruction",
    "Step 2 instruction"
  ]
}
`

      return await fetchGeminiJSON(prompt)
    } catch (err) {
      error.value = err.message

      throw err
    } finally {
      loading.value = false
      retryMessage.value = ''
    }
  }

  /* Analyze Nutrition */
  const analyzeNutrition = async (
    recipeName,
    ingredientsData,
  ) => {
    loading.value = true
    error.value = null

    try {
      const ingredientsString = ingredientsData
        .map((item) => `${item.amount} ${item.name}`)
        .join(', ')

      const prompt = `
You are a certified nutritionist.

Analyze this recipe nutrition.

Recipe:
${recipeName}

Ingredients:
${ingredientsString}

Respond ONLY in valid JSON:

{
  "calories": 450,
  "protein_g": 28,
  "carbs_g": 55,
  "fat_g": 14,
  "health_note": "One sentence health insight."
}
`

      return await fetchGeminiJSON(prompt)
    } catch (err) {
      error.value = err.message

      throw err
    } finally {
      loading.value = false
      retryMessage.value = ''
    }
  }

  return {
    loading,
    error,
    retryMessage,
    generateRecipe,
    analyzeNutrition,
  }
}