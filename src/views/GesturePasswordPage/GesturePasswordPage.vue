<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
    <PrimeCard class="max-w-5xl mx-auto bg-black/40 backdrop-blur-lg border border-purple-500/30">
      <template #title>
        <h1 class="text-4xl font-bold text-white text-center mb-2">
          🔮 Секретные жесты пароля 🔮
        </h1>
        <p class="text-center text-purple-200">
          Нарисуйте секретную фигуру мышью для разблокировки!
        </p>
      </template>
      
      <template #content>
        <div class="space-y-8">
          
          <!-- Область для рисования жестов -->
          <div class="bg-black/30 rounded-lg p-6 border border-purple-500/20">
            <h3 class="text-2xl text-white mb-6 text-center">✨ Область магических жестов</h3>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Холст для рисования -->
              <div>
                <div class="mb-4">
                  <label class="block text-purple-200 mb-2">Нарисуйте секретный жест:</label>
                  <div 
                    ref="gestureArea"
                    @mousedown="startGesture"
                    @mousemove="drawGesture"
                    @mouseup="endGesture"
                    @mouseleave="endGesture"
                    class="relative border-2 border-purple-500 rounded-lg bg-black/50 cursor-crosshair"
                    style="height: 300px;"
                  >
                    <canvas 
                      ref="gestureCanvas"
                      width="400"
                      height="300"
                      class="absolute inset-0 rounded-lg"
                    ></canvas>
                    
                    <!-- Подсказки -->
                    <div v-if="!isDrawing && gesturePath.length === 0" class="absolute inset-0 flex items-center justify-center text-purple-300">
                      <div class="text-center">
                        <div class="text-4xl mb-2">🖱️</div>
                        <p>Зажмите и нарисуйте жест</p>
                      </div>
                    </div>
                    
                    <!-- Магические частицы -->
                    <div 
                      v-for="particle in magicParticles" 
                      :key="particle.id"
                      class="absolute w-2 h-2 bg-purple-400 rounded-full animate-ping"
                      :style="{ left: particle.x + 'px', top: particle.y + 'px' }"
                    ></div>
                  </div>
                </div>
                
                <div class="flex space-x-2">
                  <PrimeButton 
                    @click="clearGesture"
                    class="bg-red-500 border-0 text-white"
                  >
                    🗑️ Очистить
                  </PrimeButton>
                  <PrimeButton 
                    @click="analyzeGesture"
                    :disabled="gesturePath.length === 0"
                    class="bg-purple-600 border-0 text-white"
                  >
                    🔍 Анализировать
                  </PrimeButton>
                </div>
              </div>
              
              <!-- Результаты анализа -->
              <div>
                <h4 class="text-lg text-purple-200 mb-4">🧙‍♂️ Анализ жеста:</h4>
                <div class="space-y-4">
                  <div class="bg-purple-900/20 rounded-lg p-4">
                    <h5 class="text-white font-bold mb-2">Распознанный символ:</h5>
                    <div class="text-4xl text-center text-purple-300">{{ recognizedSymbol || '?' }}</div>
                  </div>
                  
                  <div class="bg-purple-900/20 rounded-lg p-4">
                    <h5 class="text-white font-bold mb-2">Магические свойства:</h5>
                    <div class="space-y-2">
                      <div class="flex justify-between">
                        <span class="text-purple-200">Сложность:</span>
                        <span class="text-white">{{ gestureComplexity }}%</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-purple-200">Скорость:</span>
                        <span class="text-white">{{ gestureSpeed }}%</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-purple-200">Точность:</span>
                        <span class="text-white">{{ gesturePrecision }}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="bg-purple-900/20 rounded-lg p-4">
                    <h5 class="text-white font-bold mb-2">Энергетика:</h5>
                    <PrimeProgressBar 
                      :value="magicalPower" 
                      :show-value="false"
                      class="h-4 mb-2"
                    />
                    <p class="text-center text-purple-300">{{ magicalPower }}% магической силы</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Система паролей -->
          <div class="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-lg p-6">
            <h3 class="text-2xl text-white mb-6 text-center">🔐 Система секретных паролей</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Сохранение нового пароля -->
              <div>
                <h4 class="text-lg text-indigo-200 mb-4">Создать новый жест-пароль:</h4>
                <div class="space-y-4">
                  <div>
                    <PrimeInputText 
                      v-model="newPasswordName"
                      placeholder="Название пароля"
                      class="w-full"
                    />
                  </div>
                  <PrimeButton 
                    @click="saveGesturePassword"
                    :disabled="!recognizedSymbol || !newPasswordName"
                    class="w-full bg-green-600 border-0 text-white"
                  >
                    💾 Сохранить жест как пароль
                  </PrimeButton>
                </div>
              </div>
              
              <!-- Проверка пароля -->
              <div>
                <h4 class="text-lg text-indigo-200 mb-4">Проверить пароль:</h4>
                <div class="space-y-4">
                  <select 
                    v-model="selectedPassword"
                    class="w-full p-2 rounded bg-black/30 border border-purple-500/30 text-white"
                  >
                    <option value="">Выберите пароль для проверки</option>
                    <option 
                      v-for="password in savedPasswords" 
                      :key="password.name"
                      :value="password.name"
                    >
                      {{ password.name }} ({{ password.symbol }})
                    </option>
                  </select>
                  <PrimeButton 
                    @click="checkPassword"
                    :disabled="!selectedPassword || !recognizedSymbol"
                    class="w-full bg-blue-600 border-0 text-white"
                  >
                    🔓 Проверить доступ
                  </PrimeButton>
                </div>
              </div>
            </div>
          </div>

          <!-- Галерея сохранённых жестов -->
          <div class="bg-black/20 rounded-lg p-6">
            <h3 class="text-2xl text-white mb-6 text-center">📚 Библиотека магических жестов</h3>
            
            <div v-if="savedPasswords.length === 0" class="text-center text-purple-300 py-8">
              <div class="text-4xl mb-4">📜</div>
              <p>Библиотека пуста. Создайте первый жест-пароль!</p>
            </div>
            
            <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div 
                v-for="password in savedPasswords" 
                :key="password.name"
                class="bg-purple-900/20 rounded-lg p-4 text-center hover:bg-purple-900/40 transition-colors cursor-pointer"
                @click="loadGesturePattern(password)"
              >
                <div class="text-3xl mb-2">{{ password.symbol }}</div>
                <h5 class="text-white font-bold mb-1">{{ password.name }}</h5>
                <p class="text-purple-300 text-sm">Сила: {{ password.power }}%</p>
                <p class="text-purple-400 text-xs">{{ password.timestamp }}</p>
              </div>
            </div>
          </div>

          <!-- Результаты проверки -->
          <div v-if="lastCheckResult" class="text-center">
            <PrimeCard 
              :class="[
                'max-w-md mx-auto',
                lastCheckResult.success 
                  ? 'bg-green-900/30 border-green-500/50' 
                  : 'bg-red-900/30 border-red-500/50'
              ]"
            >
              <template #content>
                <div class="p-6 text-center">
                  <div class="text-6xl mb-4">
                    {{ lastCheckResult.success ? '🎉' : '❌' }}
                  </div>
                  <h3 class="text-2xl font-bold text-white mb-2">
                    {{ lastCheckResult.success ? 'Доступ разрешён!' : 'Доступ запрещён!' }}
                  </h3>
                  <p class="text-gray-300 mb-4">{{ lastCheckResult.message }}</p>
                  <div v-if="lastCheckResult.success" class="text-green-400">
                    ✨ Магия сработала! Точность: {{ lastCheckResult.accuracy }}%
                  </div>
                </div>
              </template>
            </PrimeCard>
          </div>

        </div>
      </template>
    </PrimeCard>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Refs для элементов
const gestureArea = ref<HTMLElement>()
const gestureCanvas = ref<HTMLCanvasElement>()

// Состояние рисования
const isDrawing = ref(false)
const gesturePath = ref<{x: number, y: number, timestamp: number}[]>([])
const magicParticles = ref<{id: number, x: number, y: number}[]>([])

// Анализ жеста
const recognizedSymbol = ref('')
const gestureComplexity = ref(0)
const gestureSpeed = ref(0)
const gesturePrecision = ref(0)
const magicalPower = ref(0)

// Система паролей
const newPasswordName = ref('')
const selectedPassword = ref('')
const savedPasswords = ref<any[]>([])
const lastCheckResult = ref<any>(null)

// Словарь символов для распознавания
const symbolPatterns = {
  '🌟': { type: 'star', description: 'Пятиконечная звезда' },
  '⭕': { type: 'circle', description: 'Совершенный круг' },
  '💫': { type: 'spiral', description: 'Спираль энергии' },
  '🔥': { type: 'flame', description: 'Пламя страсти' },
  '⚡': { type: 'lightning', description: 'Молния силы' },
  '🌙': { type: 'moon', description: 'Лунный серп' },
  '♦️': { type: 'diamond', description: 'Алмазная форма' },
  '❤️': { type: 'heart', description: 'Сердце любви' },
  '🔮': { type: 'mystery', description: 'Мистический знак' }
}

// Функции рисования
const startGesture = (e: MouseEvent) => {
  if (!gestureArea.value) return
  
  isDrawing.value = true
  gesturePath.value = []
  lastCheckResult.value = null
  
  const rect = gestureArea.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  gesturePath.value.push({ x, y, timestamp: Date.now() })
  
  // Добавляем магическую частицу
  addMagicParticle(x, y)
}

const drawGesture = (e: MouseEvent) => {
  if (!isDrawing.value || !gestureArea.value || !gestureCanvas.value) return
  
  const rect = gestureArea.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  gesturePath.value.push({ x, y, timestamp: Date.now() })
  
  // Рисуем линию
  const ctx = gestureCanvas.value.getContext('2d')
  if (ctx && gesturePath.value.length > 1) {
    const prev = gesturePath.value[gesturePath.value.length - 2]
    const curr = gesturePath.value[gesturePath.value.length - 1]
    
    ctx.strokeStyle = `hsl(${270 + (Date.now() % 60)}, 80%, 60%)`
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.shadowColor = '#8B5CF6'
    ctx.shadowBlur = 10
    
    ctx.beginPath()
    ctx.moveTo(prev.x, prev.y)
    ctx.lineTo(curr.x, curr.y)
    ctx.stroke()
  }
  
  // Добавляем магические частицы
  if (Math.random() < 0.3) {
    addMagicParticle(x, y)
  }
}

const endGesture = () => {
  isDrawing.value = false
  if (gesturePath.value.length > 10) {
    analyzeGesture()
  }
}

const addMagicParticle = (x: number, y: number) => {
  const id = Date.now() + Math.random()
  magicParticles.value.push({ id, x: x - 4, y: y - 4 })
  
  // Удаляем частицу через секунду
  setTimeout(() => {
    const index = magicParticles.value.findIndex(p => p.id === id)
    if (index >= 0) {
      magicParticles.value.splice(index, 1)
    }
  }, 1000)
}

const clearGesture = () => {
  gesturePath.value = []
  recognizedSymbol.value = ''
  magicParticles.value = []
  lastCheckResult.value = null
  
  if (gestureCanvas.value) {
    const ctx = gestureCanvas.value.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, gestureCanvas.value.width, gestureCanvas.value.height)
    }
  }
}

const analyzeGesture = () => {
  if (gesturePath.value.length === 0) return
  
  // Анализируем геометрию жеста
  const bounds = getBounds(gesturePath.value)
  const totalDistance = getTotalDistance(gesturePath.value)
  const turns = countTurns(gesturePath.value)
  const avgSpeed = getAverageSpeed(gesturePath.value)
  
  // Определяем сложность
  gestureComplexity.value = Math.min(100, turns * 10 + (totalDistance / 10))
  gestureSpeed.value = Math.min(100, avgSpeed / 5)
  gesturePrecision.value = Math.max(20, 100 - (turns * 5))
  
  // Магическая сила зависит от всех параметров
  magicalPower.value = Math.round((gestureComplexity.value + gestureSpeed.value + gesturePrecision.value) / 3)
  
  // Распознаём символ
  recognizedSymbol.value = recognizeSymbol(gesturePath.value, bounds, turns)
}

const getBounds = (path: any[]) => {
  const xs = path.map(p => p.x)
  const ys = path.map(p => p.y)
  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys),
    width: Math.max(...xs) - Math.min(...xs),
    height: Math.max(...ys) - Math.min(...ys)
  }
}

const getTotalDistance = (path: any[]) => {
  let distance = 0
  for (let i = 1; i < path.length; i++) {
    const dx = path[i].x - path[i-1].x
    const dy = path[i].y - path[i-1].y
    distance += Math.sqrt(dx * dx + dy * dy)
  }
  return distance
}

const countTurns = (path: any[]) => {
  let turns = 0
  for (let i = 2; i < path.length; i++) {
    const angle1 = Math.atan2(path[i-1].y - path[i-2].y, path[i-1].x - path[i-2].x)
    const angle2 = Math.atan2(path[i].y - path[i-1].y, path[i].x - path[i-1].x)
    const diff = Math.abs(angle2 - angle1)
    if (diff > 0.5) turns++
  }
  return turns
}

const getAverageSpeed = (path: any[]) => {
  if (path.length < 2) return 0
  const totalTime = path[path.length - 1].timestamp - path[0].timestamp
  const totalDistance = getTotalDistance(path)
  return totalDistance / (totalTime || 1)
}

const recognizeSymbol = (path: any[], bounds: any, turns: number) => {
  const symbols = Object.keys(symbolPatterns)
  
  // Простая эвристика для распознавания
  if (isCircular(path, bounds)) return '⭕'
  if (isSpiral(path)) return '💫'
  if (turns > 8) return '🌟'
  if (bounds.height > bounds.width * 1.5) return '⚡'
  if (bounds.width > bounds.height * 1.5) return '🌙'
  if (isHeartShape(path, bounds)) return '❤️'
  if (turns < 3) return '🔥'
  
  // Случайный выбор для остальных
  return symbols[Math.floor(Math.random() * symbols.length)]
}

const isCircular = (path: any[], bounds: any) => {
  const aspectRatio = bounds.width / bounds.height
  return aspectRatio > 0.8 && aspectRatio < 1.2 && path.length > 20
}

const isSpiral = (path: any[]) => {
  return path.length > 30 && getTotalDistance(path) > 200
}

const isHeartShape = (path: any[], bounds: any) => {
  const centerX = bounds.minX + bounds.width / 2
  const startNearTop = path[0].y < bounds.minY + bounds.height * 0.3
  const endNearBottom = path[path.length - 1].y > bounds.minY + bounds.height * 0.7
  return startNearTop && endNearBottom && path.length > 15
}

// Функции для системы паролей
const saveGesturePassword = () => {
  if (!newPasswordName.value || !recognizedSymbol.value) return
  
  const password = {
    name: newPasswordName.value,
    symbol: recognizedSymbol.value,
    power: magicalPower.value,
    path: [...gesturePath.value],
    complexity: gestureComplexity.value,
    speed: gestureSpeed.value,
    precision: gesturePrecision.value,
    timestamp: new Date().toLocaleString('ru-RU')
  }
  
  savedPasswords.value.push(password)
  
  alert(`🎉 Жест-пароль "${newPasswordName.value}" сохранён!\nСимвол: ${recognizedSymbol.value}\nМагическая сила: ${magicalPower.value}%`)
  
  newPasswordName.value = ''
}

const checkPassword = () => {
  const selectedPass = savedPasswords.value.find(p => p.name === selectedPassword.value)
  if (!selectedPass || !recognizedSymbol.value) return
  
  const isCorrectSymbol = selectedPass.symbol === recognizedSymbol.value
  const powerMatch = Math.abs(selectedPass.power - magicalPower.value) < 30
  const accuracy = isCorrectSymbol ? (powerMatch ? 95 : 70) : 25
  
  lastCheckResult.value = {
    success: isCorrectSymbol && accuracy > 60,
    accuracy,
    message: isCorrectSymbol 
      ? (powerMatch ? 'Жест идеально распознан!' : 'Символ верный, но энергия отличается')
      : 'Неверный символ для этого пароля'
  }
}

const loadGesturePattern = (password: any) => {
  alert(`🔮 Жест-пароль: ${password.name}\n\n` +
        `Символ: ${password.symbol}\n` +
        `Магическая сила: ${password.power}%\n` +
        `Сложность: ${password.complexity}%\n` +
        `Создан: ${password.timestamp}\n\n` +
        `Нарисуйте такой же символ для разблокировки!`)
}

// Инициализация
onMounted(() => {
  // Загружаем сохранённые пароли из localStorage
  const saved = localStorage.getItem('gesturePasswords')
  if (saved) {
    try {
      savedPasswords.value = JSON.parse(saved)
    } catch (e) {
      console.error('Ошибка загрузки паролей:', e)
    }
  }
  
  // Сохраняем пароли при изменении
  const saveToStorage = () => {
    localStorage.setItem('gesturePasswords', JSON.stringify(savedPasswords.value))
  }
  
  // Следим за изменениями
  setInterval(() => {
    if (savedPasswords.value.length > 0) {
      saveToStorage()
    }
  }, 5000)
})
</script>

<style scoped>
/* Кастомные стили */
.cursor-crosshair {
  cursor: crosshair;
}

/* Анимации для магических эффектов */
@keyframes sparkle {
  0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
  50% { opacity: 1; transform: scale(1) rotate(180deg); }
}

.animate-sparkle {
  animation: sparkle 1s ease-in-out infinite;
}

/* Стили для canvas */
canvas {
  border-radius: 0.5rem;
}

/* Переопределение стилей PrimeVue */
:deep(.p-progressbar .p-progressbar-value) {
  background: linear-gradient(45deg, #8B5CF6, #A855F7, #C084FC) !important;
}

:deep(.p-inputtext) {
  background: rgba(0, 0, 0, 0.3) !important;
  border: 1px solid rgba(139, 92, 246, 0.3) !important;
  color: white !important;
}

:deep(.p-inputtext:focus) {
  border-color: #8B5CF6 !important;
  box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2) !important;
}
</style> 