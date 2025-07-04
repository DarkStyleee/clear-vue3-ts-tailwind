<template>
  <div class="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-cyan-900 p-8">
    <PrimeCard class="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20">
      <template #title>
        <h1 class="text-4xl font-bold text-white text-center mb-2">
          🎨 Креативные формы ввода
        </h1>
        <p class="text-center text-teal-200">
          Забудьте про обычные поля ввода!
        </p>
      </template>
      
      <template #content>
        <div class="space-y-10">
          
          <!-- Ввод цвета через рисование -->
          <div class="bg-white/5 rounded-lg p-6">
            <h3 class="text-2xl text-white mb-6">🎨 Выбор цвета через рисование</h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 class="text-lg text-teal-200 mb-4">Нарисуйте свой цвет:</h4>
                <canvas 
                  ref="colorCanvas"
                  @mousedown="startDrawing"
                  @mousemove="draw"
                  @mouseup="stopDrawing"
                  @mouseleave="stopDrawing"
                  class="border-2 border-teal-500 rounded-lg cursor-crosshair bg-white"
                  width="300"
                  height="200"
                ></canvas>
                <div class="mt-4 space-y-2">
                  <PrimeButton 
                    @click="clearCanvas"
                    class="bg-red-500 border-0 text-white mr-2"
                  >
                    🗑️ Очистить
                  </PrimeButton>
                  <PrimeButton 
                    @click="analyzeDrawing"
                    class="bg-blue-500 border-0 text-white"
                  >
                    🔍 Определить цвет
                  </PrimeButton>
                </div>
              </div>
              <div>
                <h4 class="text-lg text-teal-200 mb-4">Результат:</h4>
                <div 
                  class="w-full h-32 rounded-lg border-2 border-teal-500 mb-4"
                  :style="{ backgroundColor: selectedColor }"
                ></div>
                <p class="text-white text-center">{{ selectedColor }}</p>
                <p class="text-teal-300 text-sm text-center mt-2">{{ colorDescription }}</p>
              </div>
            </div>
          </div>

          <!-- Ввод текста через пазлы -->
          <div class="bg-white/5 rounded-lg p-6">
            <h3 class="text-2xl text-white mb-6">🧩 Ввод текста через пазл</h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 class="text-lg text-teal-200 mb-4">Соберите слово из букв:</h4>
                <div class="mb-4">
                  <PrimeInputText 
                    v-model="targetWord"
                    placeholder="Введите слово для сборки"
                    class="w-full mb-2"
                  />
                  <PrimeButton 
                    @click="scrambleWord"
                    class="bg-purple-500 border-0 text-white"
                  >
                    🔄 Перемешать буквы
                  </PrimeButton>
                </div>
                <div class="grid grid-cols-6 gap-2 mb-4">
                  <div 
                    v-for="(letter, index) in scrambledLetters" 
                    :key="`scrambled-${index}`"
                    @click="moveLetter(index, 'toSorted')"
                    class="h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xl cursor-pointer hover:scale-110 transition-transform"
                  >
                    {{ letter }}
                  </div>
                </div>
              </div>
              <div>
                <h4 class="text-lg text-teal-200 mb-4">Результат сборки:</h4>
                <div class="grid grid-cols-6 gap-2 mb-4 min-h-[3rem]">
                  <div 
                    v-for="(letter, index) in sortedLetters" 
                    :key="`sorted-${index}`"
                    @click="moveLetter(index, 'toScrambled')"
                    class="h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-xl cursor-pointer hover:scale-110 transition-transform"
                  >
                    {{ letter }}
                  </div>
                </div>
                <p class="text-white text-center text-2xl font-bold">{{ assembledWord }}</p>
                <div v-if="isWordCorrect" class="text-center mt-4">
                  <span class="text-green-400 text-lg">✅ Правильно собрано!</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Ввод числа через танец -->
          <div class="bg-white/5 rounded-lg p-6">
            <h3 class="text-2xl text-white mb-6">💃 Ввод числа через "танец" мыши</h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 class="text-lg text-teal-200 mb-4">Нарисуйте число движением мыши:</h4>
                <div 
                  ref="danceArea"
                  @mousemove="trackMouseDance"
                  @mouseenter="startDance"
                  @mouseleave="endDance"
                  class="h-64 bg-black/30 rounded-lg border-2 border-cyan-500 relative cursor-pointer flex items-center justify-center"
                >
                  <canvas 
                    ref="danceCanvas"
                    width="400"
                    height="256"
                    class="absolute inset-0 rounded-lg"
                  ></canvas>
                  <div v-if="!isDancing" class="text-cyan-300 text-center">
                    <div class="text-4xl mb-2">🕺</div>
                    <p>Наведите мышь и двигайте ею!</p>
                  </div>
                </div>
                <div class="mt-4 flex space-x-2">
                  <PrimeButton 
                    @click="clearDance"
                    class="bg-red-500 border-0 text-white"
                  >
                    🗑️ Очистить
                  </PrimeButton>
                  <PrimeButton 
                    @click="interpretDance"
                    class="bg-green-500 border-0 text-white"
                  >
                    🔮 Угадать число
                  </PrimeButton>
                </div>
              </div>
              <div>
                <h4 class="text-lg text-teal-200 mb-4">Интерпретация танца:</h4>
                <div class="space-y-4">
                  <div class="bg-black/20 rounded-lg p-4">
                    <p class="text-white text-3xl font-bold text-center">{{ interpretedNumber }}</p>
                    <p class="text-cyan-300 text-center mt-2">{{ danceDescription }}</p>
                  </div>
                  <div class="bg-black/20 rounded-lg p-4">
                    <h5 class="text-white font-bold mb-2">Статистика танца:</h5>
                    <p class="text-cyan-200">Интенсивность: {{ Math.round(danceIntensity) }}%</p>
                    <p class="text-cyan-200">Скорость: {{ Math.round(danceSpeed) }}%</p>
                    <p class="text-cyan-200">Сложность: {{ Math.round(danceComplexity) }}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Ввод даты через астрологию -->
          <div class="bg-white/5 rounded-lg p-6">
            <h3 class="text-2xl text-white mb-6">🌟 Выбор даты через астрологию</h3>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div class="space-y-4">
                <h4 class="text-lg text-teal-200">Выберите созвездие:</h4>
                <div class="grid grid-cols-2 gap-2">
                  <PrimeButton 
                    v-for="constellation in constellations"
                    :key="constellation.name"
                    @click="selectConstellation(constellation)"
                    :class="[
                      'border-0 text-white transition-all',
                      selectedConstellation?.name === constellation.name 
                        ? 'bg-yellow-500 scale-105' 
                        : 'bg-blue-500/50 hover:bg-blue-500'
                    ]"
                  >
                    {{ constellation.emoji }} {{ constellation.name }}
                  </PrimeButton>
                </div>
              </div>
              <div class="space-y-4">
                <h4 class="text-lg text-teal-200">Фаза луны:</h4>
                <div class="grid grid-cols-2 gap-2">
                  <PrimeButton 
                    v-for="phase in moonPhases"
                    :key="phase.name"
                    @click="selectMoonPhase(phase)"
                    :class="[
                      'border-0 text-white transition-all',
                      selectedMoonPhase?.name === phase.name 
                        ? 'bg-gray-300 text-black scale-105' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    ]"
                  >
                    {{ phase.emoji }} {{ phase.name }}
                  </PrimeButton>
                </div>
              </div>
              <div>
                <h4 class="text-lg text-teal-200 mb-4">Предсказанная дата:</h4>
                <div class="bg-black/30 rounded-lg p-4 text-center">
                  <div class="text-3xl font-bold text-white mb-2">{{ predictedDate }}</div>
                  <p class="text-teal-300">{{ astrologicalReading }}</p>
                </div>
                <PrimeButton 
                  @click="generateAstrologicalDate"
                  class="w-full mt-4 bg-purple-600 border-0 text-white"
                >
                  🔮 Новое предсказание
                </PrimeButton>
              </div>
            </div>
          </div>

          <!-- Итоговая форма -->
          <div class="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-6 border border-purple-500/50">
            <h3 class="text-2xl text-white mb-6 text-center">📋 Итоговая форма</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <label class="block text-teal-200 mb-2">Выбранный цвет:</label>
                  <div class="h-12 rounded border-2 border-teal-500" :style="{ backgroundColor: selectedColor }"></div>
                </div>
                <div>
                  <label class="block text-teal-200 mb-2">Собранное слово:</label>
                  <div class="h-12 bg-black/20 rounded border-2 border-teal-500 flex items-center px-4 text-white font-bold">
                    {{ assembledWord || 'Не собрано' }}
                  </div>
                </div>
              </div>
              <div class="space-y-4">
                <div>
                  <label class="block text-teal-200 mb-2">Число из танца:</label>
                  <div class="h-12 bg-black/20 rounded border-2 border-teal-500 flex items-center px-4 text-white font-bold">
                    {{ interpretedNumber || 'Не определено' }}
                  </div>
                </div>
                <div>
                  <label class="block text-teal-200 mb-2">Астрологическая дата:</label>
                  <div class="h-12 bg-black/20 rounded border-2 border-teal-500 flex items-center px-4 text-white font-bold">
                    {{ predictedDate || 'Не предсказано' }}
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center mt-6">
              <PrimeButton 
                @click="submitCreativeForm"
                class="bg-gradient-to-r from-green-500 to-emerald-500 border-0 text-white text-xl px-8 py-4 rounded-full font-bold"
              >
                🚀 Отправить креативную форму
              </PrimeButton>
            </div>
          </div>

        </div>
      </template>
    </PrimeCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'

// Refs для canvas элементов
const colorCanvas = ref<HTMLCanvasElement>()
const danceCanvas = ref<HTMLCanvasElement>()
const danceArea = ref<HTMLElement>()

// Состояние рисования цвета
const isDrawing = ref(false)
const selectedColor = ref('#3B82F6')
const colorDescription = ref('Нарисуйте что-нибудь!')

// Состояние пазла с текстом
const targetWord = ref('HACKATHON')
const scrambledLetters = ref<string[]>([])
const sortedLetters = ref<string[]>([])

// Состояние танца с числом
const isDancing = ref(false)
const dancePath = ref<{x: number, y: number}[]>([])
const interpretedNumber = ref<number | null>(null)
const danceDescription = ref('Станцуйте число!')
const danceIntensity = ref(0)
const danceSpeed = ref(0)
const danceComplexity = ref(0)

// Состояние астрологии
const selectedConstellation = ref<any>(null)
const selectedMoonPhase = ref<any>(null)
const predictedDate = ref<string>('')
const astrologicalReading = ref('')

// Данные для астрологии
const constellations = [
  { name: 'Овен', emoji: '♈', dateRange: [3, 4] },
  { name: 'Телец', emoji: '♉', dateRange: [4, 5] },
  { name: 'Близнецы', emoji: '♊', dateRange: [5, 6] },
  { name: 'Рак', emoji: '♋', dateRange: [6, 7] },
  { name: 'Лев', emoji: '♌', dateRange: [7, 8] },
  { name: 'Дева', emoji: '♍', dateRange: [8, 9] }
]

const moonPhases = [
  { name: 'Новолуние', emoji: '🌑', offset: 0 },
  { name: 'Растущая', emoji: '🌒', offset: 7 },
  { name: 'Полнолуние', emoji: '🌕', offset: 14 },
  { name: 'Убывающая', emoji: '🌘', offset: 21 }
]

// Вычисляемые свойства
const assembledWord = computed(() => sortedLetters.value.join(''))
const isWordCorrect = computed(() => assembledWord.value === targetWord.value)

// Функции для рисования цвета
const startDrawing = (e: MouseEvent) => {
  isDrawing.value = true
  draw(e)
}

const draw = (e: MouseEvent) => {
  if (!isDrawing.value || !colorCanvas.value) return
  
  const ctx = colorCanvas.value.getContext('2d')
  if (!ctx) return
  
  const rect = colorCanvas.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  ctx.fillStyle = `hsl(${x % 360}, ${Math.min(100, y * 2)}%, 50%)`
  ctx.fillRect(x - 5, y - 5, 10, 10)
}

const stopDrawing = () => {
  isDrawing.value = false
}

const clearCanvas = () => {
  if (!colorCanvas.value) return
  const ctx = colorCanvas.value.getContext('2d')
  if (ctx) {
    ctx.clearRect(0, 0, colorCanvas.value.width, colorCanvas.value.height)
  }
}

const analyzeDrawing = () => {
  if (!colorCanvas.value) return
  
  const ctx = colorCanvas.value.getContext('2d')
  if (!ctx) return
  
  const imageData = ctx.getImageData(0, 0, colorCanvas.value.width, colorCanvas.value.height)
  const data = imageData.data
  
  let r = 0, g = 0, b = 0, count = 0
  
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] > 0) { // Если пиксель не прозрачный
      r += data[i]
      g += data[i + 1]
      b += data[i + 2]
      count++
    }
  }
  
  if (count > 0) {
    r = Math.round(r / count)
    g = Math.round(g / count)
    b = Math.round(b / count)
    
    selectedColor.value = `rgb(${r}, ${g}, ${b})`
    
    const descriptions = [
      'Энергичный и страстный!', 'Спокойный и умиротворяющий', 
      'Яркий и жизнерадостный', 'Таинственный и глубокий',
      'Нежный и романтичный', 'Динамичный и современный'
    ]
    colorDescription.value = descriptions[Math.floor(Math.random() * descriptions.length)]
  }
}

// Функции для пазла
const scrambleWord = () => {
  if (!targetWord.value) return
  
  const letters = targetWord.value.toUpperCase().split('')
  scrambledLetters.value = [...letters].sort(() => Math.random() - 0.5)
  sortedLetters.value = []
}

const moveLetter = (index: number, direction: 'toSorted' | 'toScrambled') => {
  if (direction === 'toSorted') {
    const letter = scrambledLetters.value.splice(index, 1)[0]
    sortedLetters.value.push(letter)
  } else {
    const letter = sortedLetters.value.splice(index, 1)[0]
    scrambledLetters.value.push(letter)
  }
}

// Функции для танца
const startDance = () => {
  isDancing.value = true
  dancePath.value = []
}

const endDance = () => {
  isDancing.value = false
}

const trackMouseDance = (e: MouseEvent) => {
  if (!isDancing.value || !danceArea.value) return
  
  const rect = danceArea.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  dancePath.value.push({ x, y })
  
  // Рисуем след
  if (danceCanvas.value) {
    const ctx = danceCanvas.value.getContext('2d')
    if (ctx && dancePath.value.length > 1) {
      const prev = dancePath.value[dancePath.value.length - 2]
      const curr = dancePath.value[dancePath.value.length - 1]
      
      ctx.strokeStyle = `hsl(${Date.now() % 360}, 70%, 50%)`
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(prev.x, prev.y)
      ctx.lineTo(curr.x, curr.y)
      ctx.stroke()
    }
  }
}

const clearDance = () => {
  dancePath.value = []
  if (danceCanvas.value) {
    const ctx = danceCanvas.value.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, danceCanvas.value.width, danceCanvas.value.height)
    }
  }
}

const interpretDance = () => {
  if (dancePath.value.length === 0) return
  
  // Анализируем путь танца
  let totalDistance = 0
  let totalSpeed = 0
  let directionChanges = 0
  
  for (let i = 1; i < dancePath.value.length; i++) {
    const prev = dancePath.value[i - 1]
    const curr = dancePath.value[i]
    const distance = Math.sqrt((curr.x - prev.x) ** 2 + (curr.y - prev.y) ** 2)
    totalDistance += distance
    totalSpeed += distance
    
    if (i > 1) {
      const prevPrev = dancePath.value[i - 2]
      const angle1 = Math.atan2(prev.y - prevPrev.y, prev.x - prevPrev.x)
      const angle2 = Math.atan2(curr.y - prev.y, curr.x - prev.x)
      if (Math.abs(angle2 - angle1) > 0.5) directionChanges++
    }
  }
  
  danceIntensity.value = Math.min(100, (totalDistance / 10))
  danceSpeed.value = Math.min(100, (totalSpeed / dancePath.value.length))
  danceComplexity.value = Math.min(100, (directionChanges * 5))
  
  // "Интерпретируем" число
  const interpretedNum = Math.round((danceIntensity.value + danceSpeed.value + danceComplexity.value) / 30)
  interpretedNumber.value = Math.max(0, Math.min(9, interpretedNum))
  
  const descriptions = [
    'Медленный и размеренный танец',
    'Быстрые резкие движения', 
    'Плавные изящные линии',
    'Хаотичные энергичные жесты',
    'Ритмичные повторяющиеся движения'
  ]
  danceDescription.value = descriptions[Math.floor(Math.random() * descriptions.length)]
}

// Функции для астрологии
const selectConstellation = (constellation: any) => {
  selectedConstellation.value = constellation
  generateAstrologicalDate()
}

const selectMoonPhase = (phase: any) => {
  selectedMoonPhase.value = phase
  generateAstrologicalDate()
}

const generateAstrologicalDate = () => {
  if (!selectedConstellation.value || !selectedMoonPhase.value) return
  
  const year = new Date().getFullYear()
  const month = selectedConstellation.value.dateRange[Math.floor(Math.random() * 2)]
  const day = Math.floor(Math.random() * 28) + 1 + selectedMoonPhase.value.offset
  
  const date = new Date(year, month - 1, Math.min(day, 28))
  predictedDate.value = date.toLocaleDateString('ru-RU')
  
  const readings = [
    'Звёзды благоволят этой дате',
    'Энергия космоса особенно сильна',
    'Идеальное время для начинаний',
    'Мистические силы в вашу пользу',
    'Планеты выстроились удачно'
  ]
  astrologicalReading.value = readings[Math.floor(Math.random() * readings.length)]
}

// Отправка формы
const submitCreativeForm = () => {
  const formData = {
    color: selectedColor.value,
    word: assembledWord.value,
    number: interpretedNumber.value,
    date: predictedDate.value
  }
  
  alert(`🎉 Креативная форма отправлена!\n\n` +
        `🎨 Цвет: ${selectedColor.value}\n` +
        `🧩 Слово: ${assembledWord.value}\n` +
        `💃 Число: ${interpretedNumber.value}\n` +
        `🌟 Дата: ${predictedDate.value}`)
}

// Инициализация
onMounted(() => {
  scrambleWord()
  nextTick(() => {
    // Инициализация canvas элементов
    if (colorCanvas.value) {
      const ctx = colorCanvas.value.getContext('2d')
      if (ctx) {
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, colorCanvas.value.width, colorCanvas.value.height)
      }
    }
  })
})
</script>

<style scoped>
/* Анимации для интерактивных элементов */
.cursor-crosshair {
  cursor: crosshair;
}

/* Стили для canvas */
canvas {
  border-radius: 0.5rem;
}

/* Hover эффекты */
.transition-transform {
  transition: transform 0.2s ease;
}

.hover\:scale-110:hover {
  transform: scale(1.1);
}

.scale-105 {
  transform: scale(1.05);
}
</style> 