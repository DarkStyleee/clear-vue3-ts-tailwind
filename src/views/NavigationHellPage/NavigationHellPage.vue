<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black p-8 overflow-hidden relative">
    <!-- Фоновые помехи -->
    <div 
      v-for="i in 50" 
      :key="i"
      class="absolute w-1 h-1 bg-red-500 animate-pulse"
      :style="{ 
        left: Math.random() * 100 + '%', 
        top: Math.random() * 100 + '%',
        animationDelay: Math.random() * 2 + 's'
      }"
    ></div>
    
    <PrimeCard class="max-w-7xl mx-auto bg-black/50 backdrop-blur-lg border border-red-500/30 relative">
      <template #title>
        <h1 class="text-4xl font-bold text-red-500 text-center mb-2 animate-bounce">
          🔥 НАВИГАЦИОННЫЙ АД 🔥
        </h1>
        <p class="text-center text-red-300 animate-pulse">
          Попробуйте найти то, что ищете... если сможете!
        </p>
      </template>
      
      <template #content>
        <div class="space-y-12">
          
          <!-- Убегающие кнопки -->
          <div class="bg-red-900/20 rounded-lg p-6 relative" style="height: 300px;">
            <h3 class="text-2xl text-white mb-6 text-center">🏃 Кнопки-беглецы</h3>
            
            <PrimeButton
              v-for="(button, index) in runawayButtons"
              :key="index"
              @click="catchButton(index)"
              @mouseenter="moveButton(index)"
              :style="{ 
                position: 'absolute',
                left: button.x + 'px',
                top: button.y + 'px',
                transform: `rotate(${button.rotation}deg)`
              }"
              :class="[
                'transition-all duration-300 border-0 text-white font-bold',
                button.caught ? 'bg-green-500' : 'bg-red-500 hover:scale-110'
              ]"
            >
              {{ button.caught ? '✅' : button.label }}
            </PrimeButton>
          </div>

          <!-- Невидимые элементы -->
          <div class="bg-black/40 rounded-lg p-6 relative">
            <h3 class="text-2xl text-white mb-6 text-center">👻 Игра в прятки</h3>
            <p class="text-gray-300 text-center mb-6">Найдите все скрытые кнопки (наведите мышь):</p>
            
            <div class="grid grid-cols-8 gap-2 relative" style="height: 300px;">
              <div
                v-for="(cell, index) in hiddenGrid"
                :key="index"
                @mouseenter="revealCell(index)"
                @mouseleave="hideCell(index)"
                @click="clickHiddenButton(index)"
                class="relative cursor-crosshair transition-all duration-200"
                :class="[
                  cell.revealed 
                    ? cell.hasButton 
                      ? 'bg-yellow-500/80 scale-110' 
                      : 'bg-gray-700/50'
                    : 'bg-transparent hover:bg-gray-800/30'
                ]"
              >
                <div 
                  v-if="cell.revealed && cell.hasButton"
                  class="absolute inset-0 flex items-center justify-center text-white font-bold text-xs"
                >
                  {{ cell.clicked ? '✓' : '?' }}
                </div>
              </div>
            </div>
            
            <div class="mt-4 text-center">
              <p class="text-yellow-400">Найдено: {{ foundHiddenButtons }}/{{ totalHiddenButtons }}</p>
            </div>
          </div>

          <!-- Обманчивые ссылки -->
          <div class="bg-purple-900/20 rounded-lg p-6">
            <h3 class="text-2xl text-white mb-6 text-center">🎭 Ложные ссылки</h3>
            <p class="text-purple-200 text-center mb-6">Только одна из этих ссылок настоящая!</p>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <PrimeButton
                v-for="(link, index) in fakeLinks"
                :key="index"
                @click="clickFakeLink(index)"
                :class="[
                  'border-0 text-white font-bold transition-all duration-300',
                  link.isReal 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : link.clicked
                      ? 'bg-red-600' 
                      : 'bg-purple-600 hover:bg-purple-700'
                ]"
                :disabled="link.clicked && !link.isReal"
              >
                {{ link.clicked 
                   ? (link.isReal ? '✅ Настоящая!' : '❌ Подделка') 
                   : link.label 
                }}
              </PrimeButton>
            </div>
          </div>

          <!-- Хаотичное меню -->
          <div class="bg-blue-900/20 rounded-lg p-6">
            <h3 class="text-2xl text-white mb-6 text-center">🌪️ Хаотичное меню</h3>
            <p class="text-blue-200 text-center mb-6">Пункты меню меняются местами каждые несколько секунд!</p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <PrimeButton
                v-for="(item, index) in chaoticMenu"
                :key="item.id"
                @click="selectMenuItem(item)"
                :class="[
                  'border-0 text-white font-bold transition-all duration-500 transform',
                  item.selected ? 'bg-green-600 scale-105' : 'bg-blue-600 hover:bg-blue-700',
                  isMenuShuffling ? 'animate-spin' : ''
                ]"
              >
                {{ item.label }}
              </PrimeButton>
            </div>
            
            <div class="mt-4 text-center">
              <p class="text-blue-300">Выбрано: {{ selectedMenuItems.join(', ') || 'Ничего' }}</p>
            </div>
          </div>

          <!-- Портал в другие измерения -->
          <div class="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-6 relative overflow-hidden">
            <h3 class="text-2xl text-white mb-6 text-center">🌀 Портал навигации</h3>
            <p class="text-purple-200 text-center mb-6">Кликните в портал, чтобы телепортироваться!</p>
            
            <div 
              @click="teleport"
              class="relative mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-full cursor-pointer transform hover:scale-105 transition-all duration-300"
              style="width: 200px; height: 200px;"
            >
              <!-- Анимированные кольца портала -->
              <div 
                v-for="i in 5" 
                :key="i"
                class="absolute border-2 border-white/30 rounded-full animate-ping"
                :style="{ 
                  width: (i * 40) + 'px', 
                  height: (i * 40) + 'px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  animationDelay: (i * 0.2) + 's'
                }"
              ></div>
              
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-4xl animate-bounce">🌀</div>
              </div>
            </div>
            
            <div class="mt-6 text-center">
              <p class="text-purple-300">Телепортаций: {{ teleportCount }}</p>
              <div v-if="lastTeleportLocation" class="mt-2">
                <p class="text-pink-300">Последняя локация: {{ lastTeleportLocation }}</p>
              </div>
            </div>
          </div>

          <!-- Статистика безумия -->
          <div class="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-lg p-6">
            <h3 class="text-2xl text-white mb-6 text-center">📊 Статистика навигационного безумия</h3>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-black/30 rounded-lg p-4 text-center">
                <div class="text-3xl font-bold text-red-400">{{ caughtButtons }}</div>
                <div class="text-red-200 text-sm">Поймано кнопок</div>
              </div>
              
              <div class="bg-black/30 rounded-lg p-4 text-center">
                <div class="text-3xl font-bold text-yellow-400">{{ foundHiddenButtons }}</div>
                <div class="text-yellow-200 text-sm">Найдено скрытых</div>
              </div>
              
              <div class="bg-black/30 rounded-lg p-4 text-center">
                <div class="text-3xl font-bold text-purple-400">{{ clickedFakeLinks }}</div>
                <div class="text-purple-200 text-sm">Кликов по подделкам</div>
              </div>
              
              <div class="bg-black/30 rounded-lg p-4 text-center">
                <div class="text-3xl font-bold text-pink-400">{{ teleportCount }}</div>
                <div class="text-pink-200 text-sm">Телепортаций</div>
              </div>
            </div>
            
            <div class="mt-6 text-center">
              <div class="text-lg text-white mb-2">Уровень безумия:</div>
              <PrimeProgressBar 
                :value="madnessLevel" 
                :show-value="true"
                class="h-6"
                :class="[
                  madnessLevel < 30 ? 'text-green-500' : 
                  madnessLevel < 70 ? 'text-yellow-500' : 'text-red-500'
                ]"
              />
              <p class="text-center text-white mt-2">
                {{ madnessLevel < 30 ? '😊 Нормально' : 
                   madnessLevel < 70 ? '😵 Слегка безумно' : '🤯 ПОЛНОЕ БЕЗУМИЕ!' }}
              </p>
            </div>
          </div>

          <!-- Кнопка побега -->
          <div class="text-center">
            <PrimeButton 
              @click="escape"
              class="bg-green-600 border-0 text-white text-xl px-8 py-4 font-bold"
            >
              🚪 ВЫБРАТЬСЯ ИЗ АДА
            </PrimeButton>
          </div>

        </div>
      </template>
    </PrimeCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Убегающие кнопки
const runawayButtons = ref(Array.from({ length: 4 }, (_, i) => ({
  x: Math.random() * 200,
  y: Math.random() * 150,
  label: ['🎯', '💎', '⚡', '🎪'][i],
  rotation: 0,
  caught: false
})))

// Скрытые элементы
const hiddenGrid = ref(Array.from({ length: 64 }, (_, i) => ({
  hasButton: Math.random() < 0.15,
  revealed: false,
  clicked: false
})))

// Ложные ссылки
const fakeLinks = ref([
  { label: 'Главная', isReal: false, clicked: false },
  { label: 'О нас', isReal: false, clicked: false },
  { label: 'Контакты', isReal: true, clicked: false },
  { label: 'Услуги', isReal: false, clicked: false },
  { label: 'Портфолио', isReal: false, clicked: false },
  { label: 'Блог', isReal: false, clicked: false },
  { label: 'FAQ', isReal: false, clicked: false },
  { label: 'Поддержка', isReal: false, clicked: false }
])

// Хаотичное меню
const chaoticMenu = ref([
  { id: 1, label: '🏠 Домой', selected: false },
  { id: 2, label: '📊 Дашборд', selected: false },
  { id: 3, label: '⚙️ Настройки', selected: false },
  { id: 4, label: '👤 Профиль', selected: false },
  { id: 5, label: '📝 Документы', selected: false },
  { id: 6, label: '💬 Чат', selected: false }
])

// Состояние
const teleportCount = ref(0)
const lastTeleportLocation = ref('')
const isMenuShuffling = ref(false)

// Вычисляемые свойства
const caughtButtons = computed(() => runawayButtons.value.filter(b => b.caught).length)
const foundHiddenButtons = computed(() => hiddenGrid.value.filter(c => c.hasButton && c.clicked).length)
const totalHiddenButtons = computed(() => hiddenGrid.value.filter(c => c.hasButton).length)
const clickedFakeLinks = computed(() => fakeLinks.value.filter(l => l.clicked && !l.isReal).length)
const selectedMenuItems = computed(() => chaoticMenu.value.filter(m => m.selected).map(m => m.label))

const madnessLevel = computed(() => {
  const total = caughtButtons.value * 10 + foundHiddenButtons.value * 15 + clickedFakeLinks.value * 5 + teleportCount.value * 8
  return Math.min(100, total)
})

// Функции для убегающих кнопок
const moveButton = (index: number) => {
  const button = runawayButtons.value[index]
  if (button.caught) return
  
  button.x = Math.max(0, Math.min(200, button.x + (Math.random() - 0.5) * 80))
  button.y = Math.max(0, Math.min(150, button.y + (Math.random() - 0.5) * 80))
  button.rotation = Math.random() * 360
}

const catchButton = (index: number) => {
  runawayButtons.value[index].caught = true
}

// Функции для скрытых элементов
const revealCell = (index: number) => {
  hiddenGrid.value[index].revealed = true
}

const hideCell = (index: number) => {
  if (!hiddenGrid.value[index].clicked) {
    hiddenGrid.value[index].revealed = false
  }
}

const clickHiddenButton = (index: number) => {
  const cell = hiddenGrid.value[index]
  if (cell.hasButton && !cell.clicked) {
    cell.clicked = true
    cell.revealed = true
  }
}

// Функции для ложных ссылок
const clickFakeLink = (index: number) => {
  const link = fakeLinks.value[index]
  if (!link.clicked) {
    link.clicked = true
    if (link.isReal) {
      setTimeout(() => {
        alert('🎉 Поздравляем! Вы нашли настоящую ссылку!')
      }, 100)
    }
  }
}

// Функции для хаотичного меню
const selectMenuItem = (item: any) => {
  item.selected = !item.selected
}

const shuffleMenu = () => {
  isMenuShuffling.value = true
  setTimeout(() => {
    chaoticMenu.value = [...chaoticMenu.value].sort(() => Math.random() - 0.5)
    isMenuShuffling.value = false
  }, 1000)
}

// Функция телепортации
const teleport = () => {
  teleportCount.value++
  
  const locations = [
    '🌙 Лунная база', '🏔️ Гора безумия', '🌊 Океан хаоса', 
    '🏜️ Пустыня кода', '🌋 Вулкан багов', '❄️ Ледник фичей',
    '🌴 Остров костылей', '🏰 Замок архитектуры'
  ]
  
  lastTeleportLocation.value = locations[Math.floor(Math.random() * locations.length)]
  
  // Эффект телепортации
  document.body.style.filter = 'hue-rotate(' + Math.random() * 360 + 'deg)'
  setTimeout(() => {
    document.body.style.filter = 'none'
  }, 500)
}

// Функция побега
const escape = () => {
  const confirmEscape = confirm(
    `🚪 Вы уверены, что хотите покинуть навигационный ад?\n\n` +
    `📊 Ваши достижения:\n` +
    `🎯 Поймано кнопок: ${caughtButtons.value}/${runawayButtons.value.length}\n` +
    `👻 Найдено скрытых: ${foundHiddenButtons.value}/${totalHiddenButtons.value}\n` +
    `🎭 Кликов по подделкам: ${clickedFakeLinks.value}\n` +
    `🌀 Телепортаций: ${teleportCount.value}\n` +
    `🤯 Уровень безумия: ${madnessLevel.value}%`
  )
  
  if (confirmEscape) {
    router.push('/')
  }
}

// Интервалы для хаоса
let menuShuffleInterval: ReturnType<typeof setInterval>
let chaosInterval: ReturnType<typeof setInterval>

onMounted(() => {
  // Перемешивание меню каждые 5 секунд
  menuShuffleInterval = setInterval(shuffleMenu, 5000)
  
  // Случайные эффекты
  chaosInterval = setInterval(() => {
    // Случайное движение непойманных кнопок
    runawayButtons.value.forEach((button, index) => {
      if (!button.caught && Math.random() < 0.3) {
        moveButton(index)
      }
    })
    
    // Случайное мерцание
    if (Math.random() < 0.1) {
      document.body.style.filter = 'brightness(' + (0.8 + Math.random() * 0.4) + ')'
      setTimeout(() => {
        document.body.style.filter = 'none'
      }, 100)
    }
  }, 2000)
})

onUnmounted(() => {
  if (menuShuffleInterval) clearInterval(menuShuffleInterval)
  if (chaosInterval) clearInterval(chaosInterval)
  document.body.style.filter = 'none'
})
</script>

<style scoped>
/* Кастомные анимации */
@keyframes float {
  0%, 100% { transform: translateY(0px) }
  50% { transform: translateY(-10px) }
}

.float {
  animation: float 3s ease-in-out infinite;
}

/* Эффект сбоя */
@keyframes glitch {
  0% { 
    text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
                 0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
  }
  15% { 
    text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
                 0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
  }
  16% { 
    text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                 0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  49% { 
    text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                 0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  50% { 
    text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                 0.05em 0 0 rgba(0, 255, 0, 0.75),
                 0 -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  99% { 
    text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                 0.05em 0 0 rgba(0, 255, 0, 0.75),
                 0 -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  100% { 
    text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75),
                -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
                -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
  }
}

h1 {
  animation: glitch 2s infinite;
}

/* Переопределение стилей PrimeVue для тёмной темы */
:deep(.p-progressbar .p-progressbar-value) {
  background: linear-gradient(45deg, #ef4444, #f97316) !important;
}
</style> 