<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
    <PrimeCard class="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20">
      <template #title>
        <h1 class="text-4xl font-bold text-white text-center mb-2">
          📱 Введите номер телефона
        </h1>
        <p class="text-center text-purple-200">
          Используйте слайдеры для каждой цифры!
        </p>
      </template>
      
      <template #content>
        <div class="space-y-8">
          <!-- Отображение текущего номера -->
          <div class="text-center">
            <div class="text-6xl font-mono font-bold text-white bg-black/20 rounded-lg p-6 inline-block">
              +{{ countryCode }}-{{ phoneDigits.join('') }}
            </div>
          </div>

          <!-- Слайдер для кода страны -->
          <div class="bg-white/5 rounded-lg p-6">
            <h3 class="text-xl text-white mb-4">🌍 Код страны</h3>
            <div class="space-y-4">
              <PrimeSlider 
                v-model="countryCode" 
                :min="1" 
                :max="999"
                class="w-full"
              />
              <div class="text-center text-white">+{{ countryCode }}</div>
            </div>
          </div>

          <!-- Слайдеры для каждой цифры номера -->
          <div class="bg-white/5 rounded-lg p-6">
            <h3 class="text-xl text-white mb-6">📞 Цифры номера</h3>
            <div class="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
              <div 
                v-for="(digit, index) in phoneDigits" 
                :key="index"
                class="bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg p-4 text-center"
              >
                <div class="text-3xl font-bold text-white mb-2">{{ digit }}</div>
                <PrimeSlider 
                  v-model="phoneDigits[index]" 
                  :min="0" 
                  :max="9"
                  orientation="vertical"
                  class="h-24 mx-auto"
                />
                <div class="text-xs text-purple-200 mt-2">Позиция {{ index + 1 }}</div>
              </div>
            </div>
          </div>

          <!-- Дополнительные безумные элементы -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Настройка "скорости набора" -->
            <div class="bg-white/5 rounded-lg p-6">
              <h4 class="text-lg text-white mb-4">⚡ Скорость набора</h4>
              <PrimeKnob 
                v-model="dialSpeed" 
                :min="1" 
                :max="100"
                :size="100"
                value-color="SlateGray"
                range-color="MediumSlateBlue"
              />
              <p class="text-center text-purple-200 mt-2">{{ dialSpeed }}%</p>
            </div>

            <!-- "Уверенность" в номере -->
            <div class="bg-white/5 rounded-lg p-6">
              <h4 class="text-lg text-white mb-4">🎯 Уверенность в номере</h4>
              <PrimeRating 
                v-model="confidence" 
                :stars="10"
                :cancel="false"
                class="flex justify-center"
              />
              <p class="text-center text-purple-200 mt-2">{{ confidence }}/10</p>
            </div>
          </div>

          <!-- Кнопка "набрать" -->
          <div class="text-center">
            <PrimeButton 
              @click="dialNumber"
              :disabled="!isValidNumber"
              :class="[
                'text-xl px-8 py-4 rounded-full font-bold transition-all duration-300',
                isValidNumber 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white' 
                  : 'bg-gray-500 text-gray-300 cursor-not-allowed'
              ]"
            >
              {{ isDialing ? '📞 Набираем...' : '☎️ Набрать номер' }}
            </PrimeButton>
          </div>

          <!-- Прогресс набора -->
          <div v-if="isDialing" class="space-y-4">
            <h4 class="text-white text-center">Процесс набора...</h4>
            <PrimeProgressBar 
              :value="dialProgress" 
              :show-value="true"
              class="h-4"
            />
          </div>
        </div>
      </template>
    </PrimeCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// Реактивные данные
const countryCode = ref(7) // По умолчанию Россия
const phoneDigits = ref([9, 0, 0, 1, 2, 3, 4, 5, 6, 7])
const dialSpeed = ref(50)
const confidence = ref(5)
const isDialing = ref(false)
const dialProgress = ref(0)

// Вычисляемые свойства
const isValidNumber = computed(() => {
  return phoneDigits.value.length === 10 && confidence.value >= 7
})

// Функция набора номера
const dialNumber = async () => {
  if (!isValidNumber.value) return
  
  isDialing.value = true
  dialProgress.value = 0
  
  // Имитация процесса набора
  const interval = setInterval(() => {
    dialProgress.value += 10
    if (dialProgress.value >= 100) {
      clearInterval(interval)
      setTimeout(() => {
        isDialing.value = false
        dialProgress.value = 0
        alert(`Набираем номер: +${countryCode.value}-${phoneDigits.value.join('')}!\n🎉 Скорость: ${dialSpeed.value}%\n⭐ Уверенность: ${confidence.value}/10`)
      }, 500)
    }
  }, 100)
}

// Забавный эффект - при изменении скорости, цифры "дрожат"
watch(dialSpeed, (newSpeed) => {
  if (newSpeed > 80) {
    // Случайное "дрожание" цифр при высокой скорости
    const originalDigits = [...phoneDigits.value]
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        phoneDigits.value = phoneDigits.value.map(() => Math.floor(Math.random() * 10))
      }, i * 100)
    }
    setTimeout(() => {
      phoneDigits.value = originalDigits
    }, 300)
  }
})
</script>

<style scoped>
/* Кастомные стили для слайдеров */
:deep(.p-slider) {
  background: rgba(255, 255, 255, 0.2) !important;
}

:deep(.p-slider .p-slider-range) {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4) !important;
}

:deep(.p-slider .p-slider-handle) {
  background: white !important;
  border: 3px solid #667eea !important;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4) !important;
}

:deep(.p-knob-range) {
  stroke: #667eea !important;
}

:deep(.p-rating .p-rating-icon) {
  color: #ffd700 !important;
}
</style> 