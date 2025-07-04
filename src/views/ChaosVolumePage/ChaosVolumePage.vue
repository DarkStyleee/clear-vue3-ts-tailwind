<template>
  <div class="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 p-8">
    <PrimeCard class="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20">
      <template #title>
        <h1 class="text-4xl font-bold text-white text-center mb-2">
          🎵 Хаотичный контроль громкости
        </h1>
        <p class="text-center text-orange-200">
          Каждое действие - это лотерея!
        </p>
      </template>
      
      <template #content>
        <div class="space-y-8">
          <!-- Видео-плеер (заглушка) -->
          <div class="bg-black rounded-lg overflow-hidden">
            <div class="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
              <div class="text-center text-white">
                <div class="text-6xl mb-4">🎬</div>
                <h3 class="text-2xl font-bold mb-2">Демо Видео</h3>
                <p class="text-gray-300">Громкость: {{ Math.round(actualVolume) }}%</p>
                
                <!-- Визуализация звука -->
                <div class="flex justify-center mt-4 space-x-1">
                  <div 
                    v-for="i in 20" 
                    :key="i"
                    class="w-2 bg-green-500 rounded-full transition-all duration-300"
                    :style="{ 
                      height: `${Math.max(4, (actualVolume / 100) * 40 + Math.sin(Date.now() / 100 + i) * 10)}px`,
                      opacity: actualVolume > 0 ? 1 : 0.3 
                    }"
                  ></div>
                </div>
              </div>
              
              <!-- Случайные эффекты на экране -->
              <div 
                v-if="isGlitching"
                class="absolute inset-0 bg-red-500 opacity-20 animate-pulse"
              ></div>
            </div>
          </div>

          <!-- Хаотичные контролы громкости -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <!-- "Обычный" слайдер (но он лжёт) -->
            <div class="bg-white/5 rounded-lg p-6">
              <h3 class="text-xl text-white mb-4">🎚️ "Обычный" слайдер</h3>
              <PrimeSlider 
                v-model="fakeVolume" 
                :min="0" 
                :max="100"
                @input="handleFakeSlider"
                class="w-full mb-4"
              />
              <p class="text-orange-200 text-sm">
                Показывает: {{ fakeVolume }}% 
                <br>
                <span class="text-red-300">Реально: {{ Math.round(actualVolume) }}%</span>
              </p>
            </div>

            <!-- Обратный слайдер -->
            <div class="bg-white/5 rounded-lg p-6">
              <h3 class="text-xl text-white mb-4">🔄 Обратный слайдер</h3>
              <PrimeSlider 
                v-model="reverseVolume" 
                :min="0" 
                :max="100"
                @input="handleReverseSlider"
                class="w-full mb-4"
              />
              <p class="text-orange-200 text-sm">
                Работает наоборот!
              </p>
            </div>

            <!-- Рулетка громкости -->
            <div class="bg-white/5 rounded-lg p-6">
              <h3 class="text-xl text-white mb-4">🎰 Рулетка</h3>
              <PrimeButton 
                @click="volumeRoulette"
                :disabled="isSpinning"
                class="w-full bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white font-bold py-3"
              >
                {{ isSpinning ? '🎲 Крутится...' : '🎲 Крутить рулетку' }}
              </PrimeButton>
              <p class="text-orange-200 text-sm mt-2 text-center">
                Случайная громкость!
              </p>
            </div>

            <!-- Кнопки с подвохом -->
            <div class="bg-white/5 rounded-lg p-6">
              <h3 class="text-xl text-white mb-4">🎭 Кнопки-обманщики</h3>
              <div class="grid grid-cols-2 gap-2">
                <PrimeButton 
                  @click="trickButton('up')"
                  class="bg-green-500 border-0 text-white font-bold"
                >
                  ⬆️ Громче
                </PrimeButton>
                <PrimeButton 
                  @click="trickButton('down')"
                  class="bg-blue-500 border-0 text-white font-bold"
                >
                  ⬇️ Тише
                </PrimeButton>
                <PrimeButton 
                  @click="trickButton('mute')"
                  class="bg-red-500 border-0 text-white font-bold"
                >
                  🔇 Выкл
                </PrimeButton>
                <PrimeButton 
                  @click="trickButton('max')"
                  class="bg-orange-500 border-0 text-white font-bold"
                >
                  🔊 Макс
                </PrimeButton>
              </div>
              <p class="text-orange-200 text-xs mt-2">
                Делают что хотят!
              </p>
            </div>

            <!-- Эмоциональный контроль -->
            <div class="bg-white/5 rounded-lg p-6">
              <h3 class="text-xl text-white mb-4">😊 По настроению</h3>
              <PrimeRating 
                v-model="mood" 
                :stars="5"
                @change="handleMoodChange"
                class="flex justify-center mb-4"
              />
              <p class="text-orange-200 text-sm text-center">
                Настроение: {{ moodNames[mood - 1] || 'Не выбрано' }}
              </p>
            </div>

            <!-- Круговой хаос -->
            <div class="bg-white/5 rounded-lg p-6">
              <h3 class="text-xl text-white mb-4">🌀 Хаос-крутилка</h3>
              <div class="flex justify-center">
                <PrimeKnob 
                  v-model="chaosKnob" 
                  :min="0" 
                  :max="100"
                  :size="120"
                  @input="handleChaosKnob"
                  value-color="red"
                  range-color="orange"
                />
              </div>
              <p class="text-orange-200 text-sm text-center mt-2">
                Непредсказуемо!
              </p>
            </div>
          </div>

          <!-- Лог безумия -->
          <div class="bg-black/30 rounded-lg p-6">
            <h3 class="text-xl text-white mb-4">📝 Лог безумия</h3>
            <div class="max-h-40 overflow-y-auto space-y-2">
              <div 
                v-for="(log, index) in chaosLog" 
                :key="index"
                class="text-sm p-2 rounded bg-white/5 text-orange-200"
              >
                <span class="text-gray-400">{{ log.time }}</span> - {{ log.message }}
              </div>
            </div>
          </div>

          <!-- Прогресс хаоса -->
          <div class="bg-white/5 rounded-lg p-6">
            <h3 class="text-xl text-white mb-4">📊 Уровень хаоса</h3>
            <PrimeProgressBar 
              :value="chaosLevel" 
              :show-value="true"
              class="h-6"
              :class="[
                chaosLevel < 30 ? 'text-green-500' : 
                chaosLevel < 70 ? 'text-yellow-500' : 'text-red-500'
              ]"
            />
            <p class="text-center text-white mt-2">
              {{ chaosLevel < 30 ? '😊 Спокойно' : 
                 chaosLevel < 70 ? '😵 Хаотично' : '🔥 ПОЛНЫЙ ХАОС!' }}
            </p>
          </div>
        </div>
      </template>
    </PrimeCard>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Реактивные данные
const fakeVolume = ref(50)
const actualVolume = ref(50)
const reverseVolume = ref(50)
const mood = ref(3)
const chaosKnob = ref(50)
const isSpinning = ref(false)
const isGlitching = ref(false)
const chaosLevel = ref(0)
const chaosLog = ref<{ time: string, message: string }[]>([])

const moodNames = ['😢 Грустно', '😐 Скучно', '😊 Норм', '😄 Весело', '🤩 Офигенно']

// Функции хаоса
const addToLog = (message: string) => {
  const time = new Date().toLocaleTimeString()
  chaosLog.value.unshift({ time, message })
  if (chaosLog.value.length > 10) {
    chaosLog.value.pop()
  }
  
  // Увеличиваем уровень хаоса
  chaosLevel.value = Math.min(100, chaosLevel.value + Math.random() * 15)
}

const glitchEffect = () => {
  isGlitching.value = true
  setTimeout(() => {
    isGlitching.value = false
  }, 200)
}

// Обработчики контролов
const handleFakeSlider = () => {
  // Слайдер показывает одно, а делает другое
  const randomFactor = Math.random() * 0.8 + 0.6 // 0.6 - 1.4
  actualVolume.value = Math.max(0, Math.min(100, fakeVolume.value * randomFactor))
  
  addToLog(`Обычный слайдер: показал ${fakeVolume.value}%, сделал ${Math.round(actualVolume.value)}%`)
  
  if (Math.random() < 0.2) {
    glitchEffect()
  }
}

const handleReverseSlider = () => {
  // Работает наоборот
  actualVolume.value = 100 - reverseVolume.value
  addToLog(`Обратный слайдер: ${reverseVolume.value}% → ${Math.round(actualVolume.value)}%`)
}

const volumeRoulette = () => {
  isSpinning.value = true
  
  let spins = 0
  const maxSpins = 10
  
  const spin = () => {
    actualVolume.value = Math.random() * 100
    spins++
    
    if (spins < maxSpins) {
      setTimeout(spin, 100)
    } else {
      isSpinning.value = false
      const finalVolume = Math.round(actualVolume.value)
      addToLog(`Рулетка остановилась на ${finalVolume}%!`)
      
      if (finalVolume > 90) {
        addToLog('🎉 ДЖЕКПОТ! Максимальная громкость!')
        glitchEffect()
      }
    }
  }
  
  spin()
}

const trickButton = (action: string) => {
  const actions = ['up', 'down', 'mute', 'max']
  const randomAction = actions[Math.floor(Math.random() * actions.length)]
  
  // Кнопка может сделать что угодно
  switch (randomAction) {
    case 'up':
      actualVolume.value = Math.min(100, actualVolume.value + Math.random() * 30)
      break
    case 'down':
      actualVolume.value = Math.max(0, actualVolume.value - Math.random() * 30)
      break
    case 'mute':
      actualVolume.value = 0
      break
    case 'max':
      actualVolume.value = 100
      break
  }
  
  addToLog(`Нажали "${action}", а получили "${randomAction}" (${Math.round(actualVolume.value)}%)`)
  
  if (randomAction !== action) {
    glitchEffect()
  }
}

const handleMoodChange = () => {
  // Громкость зависит от настроения, но странно
  const moodVolumes = [10, 25, 50, 85, 100]
  const baseVolume = moodVolumes[mood.value - 1] || 50
  
  // Добавляем случайность
  actualVolume.value = Math.max(0, Math.min(100, baseVolume + (Math.random() - 0.5) * 40))
  
  addToLog(`Настроение: ${moodNames[mood.value - 1]} → ${Math.round(actualVolume.value)}%`)
}

const handleChaosKnob = () => {
  // Этот контрол полностью непредсказуем
  const chaosActions = [
    () => { actualVolume.value = Math.random() * 100 },
    () => { actualVolume.value = 100 - chaosKnob.value },
    () => { actualVolume.value = chaosKnob.value },
    () => { actualVolume.value = Math.sin(chaosKnob.value / 10) * 50 + 50 },
    () => { actualVolume.value = chaosKnob.value > 50 ? 0 : 100 }
  ]
  
  const randomAction = chaosActions[Math.floor(Math.random() * chaosActions.length)]
  randomAction()
  
  addToLog(`Хаос-крутилка: ${chaosKnob.value} → ${Math.round(actualVolume.value)}% (непонятно как)`)
  
  if (Math.random() < 0.3) {
    glitchEffect()
  }
}

// Случайные сбои
onMounted(() => {
  setInterval(() => {
    if (Math.random() < 0.05 && chaosLevel.value > 50) {
      actualVolume.value = Math.random() * 100
      addToLog('💥 Случайный сбой системы!')
      glitchEffect()
    }
    
    // Постепенно снижаем уровень хаоса
    if (chaosLevel.value > 0) {
      chaosLevel.value = Math.max(0, chaosLevel.value - 0.5)
    }
  }, 2000)
})
</script>

<style scoped>
/* Анимации для хаоса */
@keyframes glitch {
  0% { transform: translate(0) }
  20% { transform: translate(-2px, 2px) }
  40% { transform: translate(-2px, -2px) }
  60% { transform: translate(2px, 2px) }
  80% { transform: translate(2px, -2px) }
  100% { transform: translate(0) }
}

.animate-glitch {
  animation: glitch 0.3s infinite;
}

/* Кастомные стили для контролов */
:deep(.p-slider .p-slider-range) {
  background: linear-gradient(45deg, #ff4757, #ff6348) !important;
}

:deep(.p-slider .p-slider-handle) {
  background: white !important;
  border: 3px solid #ff4757 !important;
  box-shadow: 0 4px 15px rgba(255, 71, 87, 0.4) !important;
}

:deep(.p-rating .p-rating-icon) {
  color: #ffa502 !important;
}

:deep(.p-progressbar .p-progressbar-value) {
  background: linear-gradient(45deg, #ff4757, #ff6348) !important;
}
</style> 