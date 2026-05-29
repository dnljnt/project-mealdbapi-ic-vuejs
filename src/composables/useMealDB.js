import { computed, ref } from 'vue'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

export function useMealDB() {
  const meals = ref([])
  const loading = ref(false)
  const error = ref(null)

  /*
  |--------------------------------------------------------------------------
  | Pagination State
  |--------------------------------------------------------------------------
  */
  const currentPage = ref(1)
  const perPage = 12 // Jumlah resep per halaman sesuai spesifikasi

  // Mengambil potongan resep sesuai halaman aktif
  const paginatedMeals = computed(() => {
    const start = (currentPage.value - 1) * perPage
    return meals.value.slice(start, start + perPage)
  })

  // Menghitung total halaman pembulatan ke atas
  const totalPages = computed(() =>
    Math.ceil(meals.value.length / perPage)
  )

  /*
  |--------------------------------------------------------------------------
  | Fetch Random Meals (Untuk Initial Load & Clear Search)
  |--------------------------------------------------------------------------
  */
  const fetchRandomMeals = async (count = 12) => {
    try {
      loading.value = true
      error.value = null

      // Membuat 12 request random secara paralel untuk mengisi halaman pertama secara acak
      const requests = Array.from({ length: count }, () =>
        fetch(`${BASE_URL}/random.php`).then((res) => res.json())
      )

      const results = await Promise.all(requests)

      // Gabungkan semua resep acak
      const allMeals = results.flatMap((result) => result.meals || [])

      // Filter duplikat (jika ada idMeal yang kebetulan sama dari API)
      const uniqueMeals = Array.from(
        new Map(allMeals.map((meal) => [meal.idMeal, meal])).values()
      )

      meals.value = uniqueMeals
      currentPage.value = 1
    } catch (err) {
      console.error(err)
      error.value = 'Gagal memuat resep acak kuliner.'
      meals.value = []
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
    // JIKA KOSONG (Saat load awal / klik tombol X), panggil 12 resep acak
    if (!query || query.trim() === '') {
      await fetchRandomMeals(12)
      return
    }

    try {
      loading.value = true
      error.value = null

      const response = await fetch(`${BASE_URL}/search.php?s=${query.trim()}`)
      const data = await response.json()

      meals.value = data.meals || []
      currentPage.value = 1 // Reset ke halaman 1 setiap kali mencari kata kunci baru
    } catch (err) {
      console.error(err)
      error.value = 'Gagal melakukan pencarian resep.'
      meals.value = []
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
    searchMeals,
  }
}