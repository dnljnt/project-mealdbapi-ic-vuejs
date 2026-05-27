import { computed, ref } from 'vue'

const BASE_URL =
  'https://www.themealdb.com/api/json/v1/1'

export function useMealDB() {
  const meals = ref([])
  const loading = ref(false)
  const error = ref(null)

  /*
  |--------------------------------------------------------------------------
  | Pagination
  |--------------------------------------------------------------------------
  */

  const currentPage = ref(1)

  const perPage = 12

  const paginatedMeals = computed(() => {
    const start =
      (currentPage.value - 1) * perPage

    return meals.value.slice(
      start,
      start + perPage,
    )
  })

  const totalPages = computed(() =>
    Math.ceil(
      meals.value.length / perPage,
    ),
  )

  /*
  |--------------------------------------------------------------------------
  | Fetch ALL Meals
  |--------------------------------------------------------------------------
  */

  const fetchAllMeals = async () => {
    try {
      loading.value = true
      error.value = null

      const alphabet =
        'abcdefghijklmnopqrstuvwxyz'

      const requests = alphabet
        .split('')
        .map((letter) =>
          fetch(
            `${BASE_URL}/search.php?f=${letter}`,
          ).then((res) => res.json()),
        )

      const results = await Promise.all(
        requests,
      )

      const merged = results.flatMap(
        (result) => result.meals || [],
      )

      meals.value = merged
    } catch (err) {
      console.error(err)

      error.value =
        'Failed to fetch recipes.'
    } finally {
      loading.value = false
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Search Meals
  |--------------------------------------------------------------------------
  */

  const searchMeals = async (query) => {
    if (!query) {
      await fetchAllMeals()
      return
    }

    try {
      loading.value = true

      const response = await fetch(
        `${BASE_URL}/search.php?s=${query}`,
      )

      const data = await response.json()

      meals.value = data.meals || []

      currentPage.value = 1
    } catch (err) {
      console.error(err)

      error.value =
        'Failed to search meals.'
    } finally {
      loading.value = false
    }
  }

  return {
    meals,
    loading,
    error,

    currentPage,
    totalPages,
    paginatedMeals,

    fetchAllMeals,
    searchMeals,
  }
}