<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-8">
    <PrimeCard class="max-w-6xl mx-auto bg-black/40 backdrop-blur-lg border border-blue-500/30">
      <template #title>
        <h1 class="text-4xl font-bold text-white text-center mb-2">
          🌙 Лунный калькулятор 🌙
        </h1>
        <p class="text-center text-blue-200">
          Математика по законам небесных тел!
        </p>
      </template>
      
      <template #content>
        <div class="space-y-8">
          
          <!-- Панель управления факторами -->
          <div class="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-6 border border-blue-500/20">
            <h3 class="text-2xl text-white mb-6 text-center">🎛️ Панель космических факторов</h3>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Левая панель - факторы -->
              <div class="space-y-6">
                
                <!-- Фаза луны -->
                <div class="bg-black/20 rounded-lg p-4">
                  <div class="flex items-center justify-between mb-3">
                    <h4 class="text-lg font-bold text-blue-300">🌙 Фаза луны</h4>
                    <PrimeButton 
                      @click="cycleMoonPhase" 
                      class="bg-blue-600 border-0 text-white text-sm px-3 py-1"
                    >
                      Сменить
                    </PrimeButton>
                  </div>
                  <div class="flex items-center space-x-4">
                    <div class="text-4xl">{{ currentMoonPhase.emoji }}</div>
                    <div>
                      <div class="text-white font-bold">{{ currentMoonPhase.name }}</div>
                      <div class="text-blue-200 text-sm">{{ currentMoonPhase.effect }}</div>
                      <div class="text-yellow-300 text-sm">Модификатор: ×{{ currentMoonPhase.multiplier }}</div>
                    </div>
                  </div>
                </div>

                <!-- Время суток -->
                <div class="bg-black/20 rounded-lg p-4">
                  <div class="flex items-center justify-between mb-3">
                    <h4 class="text-lg font-bold text-orange-300">⏰ Время суток</h4>
                    <PrimeButton 
                      @click="changeTimeOfDay" 
                      class="bg-orange-600 border-0 text-white text-sm px-3 py-1"
                    >
                      Изменить
                    </PrimeButton>
                  </div>
                  <div class="flex items-center space-x-4">
                    <div class="text-4xl">{{ getTimeEmoji() }}</div>
                    <div>
                      <div class="text-white font-bold">{{ currentTime }}</div>
                      <div class="text-orange-200 text-sm">{{ getTimePeriod() }}</div>
                      <div class="text-yellow-300 text-sm">{{ getTimeEffect() }}</div>
                    </div>
                  </div>
                </div>

                <!-- Магическая энергия -->
                <div class="bg-black/20 rounded-lg p-4">
                  <h4 class="text-lg font-bold text-purple-300 mb-3">✨ Магическая энергия</h4>
                  <div class="space-y-3">
                    <PrimeSlider 
                      v-model="magicalTime" 
                      :min="0" 
                      :max="100"
                      class="w-full"
                    />
                    <div class="flex justify-between text-sm">
                      <span class="text-purple-200">{{ magicalTime }}%</span>
                      <span :class="getMagicalLevelColor()">{{ getMagicalLevel() }}</span>
                    </div>
                  </div>
                </div>

                <!-- Знак зодиака -->
                <div class="bg-black/20 rounded-lg p-4">
                  <div class="flex items-center justify-between mb-3">
                    <h4 class="text-lg font-bold text-green-300">♈ Зодиак</h4>
                    <PrimeButton 
                      @click="changeZodiac" 
                      class="bg-green-600 border-0 text-white text-sm px-3 py-1"
                    >
                      Сменить
                    </PrimeButton>
                  </div>
                  <div class="flex items-center space-x-4">
                    <div class="text-4xl">{{ currentZodiac.emoji }}</div>
                    <div>
                      <div class="text-white font-bold">{{ currentZodiac.name }}</div>
                      <div class="text-green-200 text-sm">{{ currentZodiac.power }}</div>
                      <div class="text-yellow-300 text-sm">{{ currentZodiac.effect }}</div>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Правая панель - активные ограничения -->
              <div>
                <h4 class="text-lg font-bold text-red-300 mb-4">🚫 Активные ограничения</h4>
                <div class="space-y-3 max-h-96 overflow-y-auto">
                  <div 
                    v-for="restriction in activeRestrictions" 
                    :key="restriction.id"
                    class="bg-red-900/20 border border-red-500/30 rounded-lg p-3"
                  >
                    <div class="flex items-center space-x-3">
                      <div class="text-2xl">{{ restriction.emoji }}</div>
                      <div class="flex-1">
                        <div class="text-white font-bold text-sm">{{ restriction.title }}</div>
                        <div class="text-red-200 text-xs">{{ restriction.description }}</div>
                        <div class="text-red-300 text-xs mt-1">Блокирует: {{ restriction.blocks }}</div>
                      </div>
                      <div :class="['text-xs px-2 py-1 rounded-full', restriction.severity === 'high' ? 'bg-red-600' : restriction.severity === 'medium' ? 'bg-yellow-600' : 'bg-gray-600']">
                        {{ restriction.severity === 'high' ? 'КРИТИЧНО' : restriction.severity === 'medium' ? 'СРЕДНЕ' : 'СЛАБО' }}
                      </div>
                    </div>
                  </div>
                  
                  <div v-if="activeRestrictions.length === 0" class="text-center py-8">
                    <div class="text-4xl mb-2">✅</div>
                    <div class="text-green-300">Все кнопки доступны!</div>
                    <div class="text-green-200 text-sm">Космические силы благоволят</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Основной калькулятор -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <!-- Дисплей калькулятора -->
            <div>
              <div class="bg-black/50 rounded-lg p-6 border border-blue-500/30">
                <h3 class="text-xl text-white mb-4 text-center">🔢 Космический дисплей</h3>
                
                <!-- История вычислений -->
                <div class="mb-4 max-h-24 overflow-y-auto">
                  <div 
                    v-for="(calc, index) in calculationHistory" 
                    :key="index"
                    class="text-sm text-blue-300 mb-1"
                  >
                    {{ calc }}
                  </div>
                </div>
                
                <!-- Текущее выражение -->
                <div class="bg-black/60 rounded-lg p-4 mb-4 border border-blue-400/30">
                  <div class="text-blue-200 text-sm mb-1">Выражение:</div>
                  <div class="text-2xl text-white font-mono">{{ currentExpression || '0' }}</div>
                </div>
                
                <!-- Результат -->
                <div class="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-4 border border-purple-400/30">
                  <div class="text-purple-200 text-sm mb-1">Результат:</div>
                  <div class="text-4xl text-white font-bold">{{ displayResult }}</div>
                  <div v-if="moonModifier !== 1" class="text-yellow-300 text-sm mt-1">
                    Лунный модификатор: ×{{ moonModifier }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Кнопки калькулятора -->
            <div>
              <div class="bg-black/30 rounded-lg p-6">
                <h3 class="text-xl text-white mb-4 text-center">🎯 Небесные кнопки</h3>
                
                <!-- Сетка кнопок -->
                <div class="grid grid-cols-4 gap-3">
                  
                  <!-- Первая строка -->
                  <button 
                    @click="clearAll"
                    class="p-4 rounded-lg font-bold text-white transition-all duration-300 bg-red-600 hover:bg-red-700 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl"
                  >
                    AC
                  </button>
                  <button 
                    @click="clearEntry"
                    :disabled="!isOperationAvailable('CE')"
                    :class="[
                      'p-4 rounded-lg font-bold text-white transition-all duration-300 relative group',
                      isOperationAvailable('CE') 
                        ? 'bg-orange-600 hover:bg-orange-700 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl' 
                        : 'bg-gray-600 cursor-not-allowed opacity-50'
                    ]"
                  >
                    CE
                  </button>
                  <button 
                    @click="addToExpression('/')"
                    :disabled="!isOperationAvailable('/')"
                    :class="[
                      'p-4 rounded-lg font-bold text-white transition-all duration-300 relative group',
                      isOperationAvailable('/') 
                        ? 'bg-blue-600 hover:bg-blue-700 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl' 
                        : 'bg-gray-600 cursor-not-allowed opacity-50'
                    ]"
                    :title="!isOperationAvailable('/') ? getOperationInfo('/') : ''"
                  >
                    ÷
                  </button>
                  <button 
                    @click="addToExpression('*')"
                    :disabled="!isOperationAvailable('*')"
                    :class="[
                      'p-4 rounded-lg font-bold text-white transition-all duration-300 relative group',
                      isOperationAvailable('*') 
                        ? 'bg-blue-600 hover:bg-blue-700 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl' 
                        : 'bg-gray-600 cursor-not-allowed opacity-50'
                    ]"
                    :title="!isOperationAvailable('*') ? getOperationInfo('*') : ''"
                  >
                    ×
                  </button>
                  
                  <!-- Цифры и операции -->
                  <button 
                    v-for="num in [7, 8, 9]" 
                    :key="num"
                    @click="addToExpression(num.toString())"
                    :disabled="!isNumberAvailable(num)"
                    :class="[
                      'p-4 rounded-lg font-bold text-white transition-all duration-300 relative group',
                      isNumberAvailable(num) 
                        ? 'bg-blue-600 hover:bg-blue-700 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl' 
                        : 'bg-gray-600 cursor-not-allowed opacity-50'
                    ]"
                    :title="!isNumberAvailable(num) ? getNumberInfo(num) : ''"
                  >
                    {{ num }}
                  </button>
                  <button 
                    @click="addToExpression('-')"
                    :disabled="!isOperationAvailable('-')"
                    :class="[
                      'p-4 rounded-lg font-bold text-white transition-all duration-300 relative group',
                      isOperationAvailable('-') 
                        ? 'bg-blue-600 hover:bg-blue-700 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl' 
                        : 'bg-gray-600 cursor-not-allowed opacity-50'
                    ]"
                    :title="!isOperationAvailable('-') ? getOperationInfo('-') : ''"
                  >
                    −
                  </button>
                  
                  <button 
                    v-for="num in [4, 5, 6]" 
                    :key="num"
                    @click="addToExpression(num.toString())"
                    :disabled="!isNumberAvailable(num)"
                    :class="[
                      'p-4 rounded-lg font-bold text-white transition-all duration-300 relative group',
                      isNumberAvailable(num) 
                        ? 'bg-blue-600 hover:bg-blue-700 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl' 
                        : 'bg-gray-600 cursor-not-allowed opacity-50'
                    ]"
                    :title="!isNumberAvailable(num) ? getNumberInfo(num) : ''"
                  >
                    {{ num }}
                  </button>
                  <button 
                    @click="addToExpression('+')"
                    :disabled="!isOperationAvailable('+')"
                    :class="[
                      'p-4 rounded-lg font-bold text-white transition-all duration-300 relative group row-span-2',
                      isOperationAvailable('+') 
                        ? 'bg-blue-600 hover:bg-blue-700 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl' 
                        : 'bg-gray-600 cursor-not-allowed opacity-50'
                    ]"
                    :title="!isOperationAvailable('+') ? getOperationInfo('+') : ''"
                  >
                    +
                  </button>
                  
                  <button 
                    v-for="num in [1, 2, 3]" 
                    :key="num"
                    @click="addToExpression(num.toString())"
                    :disabled="!isNumberAvailable(num)"
                    :class="[
                      'p-4 rounded-lg font-bold text-white transition-all duration-300 relative group',
                      isNumberAvailable(num) 
                        ? 'bg-blue-600 hover:bg-blue-700 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl' 
                        : 'bg-gray-600 cursor-not-allowed opacity-50'
                    ]"
                    :title="!isNumberAvailable(num) ? getNumberInfo(num) : ''"
                  >
                    {{ num }}
                  </button>
                  
                  <button 
                    @click="addToExpression('0')"
                    :disabled="!isNumberAvailable(0)"
                    :class="[
                      'p-4 rounded-lg font-bold text-white transition-all duration-300 relative group col-span-2',
                      isNumberAvailable(0) 
                        ? 'bg-blue-600 hover:bg-blue-700 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl' 
                        : 'bg-gray-600 cursor-not-allowed opacity-50'
                    ]"
                    :title="!isNumberAvailable(0) ? getNumberInfo(0) : ''"
                  >
                    0
                  </button>
                  <button 
                    @click="addToExpression('.')"
                    :disabled="!isOperationAvailable('.')"
                    :class="[
                      'p-4 rounded-lg font-bold text-white transition-all duration-300 relative group',
                      isOperationAvailable('.') 
                        ? 'bg-blue-600 hover:bg-blue-700 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl' 
                        : 'bg-gray-600 cursor-not-allowed opacity-50'
                    ]"
                    :title="!isOperationAvailable('.') ? getOperationInfo('.') : ''"
                  >
                    .
                  </button>
                  <button 
                    @click="calculate"
                    :disabled="currentExpression.length === 0"
                    :class="[
                      'p-4 rounded-lg font-bold text-white transition-all duration-300',
                      currentExpression.length > 0
                        ? 'bg-green-600 hover:bg-green-700 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl' 
                        : 'bg-gray-600 cursor-not-allowed opacity-50'
                    ]"
                  >
                    =
                  </button>
                  
                </div>
              </div>
            </div>
          </div>

          <!-- Объяснение лунной логики -->
          <div class="bg-gradient-to-r from-indigo-900/30 to-blue-900/30 rounded-lg p-6">
            <h3 class="text-2xl text-white mb-6 text-center">📚 Космические правила</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 class="text-lg text-blue-300 mb-4">🌙 Быстрая справка:</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex items-center">
                    <span class="text-2xl mr-2">🌑</span>
                    <span class="text-blue-200">Новолуние блокирует нечётные числа</span>
                  </div>
                  <div class="flex items-center">
                    <span class="text-2xl mr-2">🌙</span>
                    <span class="text-blue-200">Ночью доступны только числа 0-5</span>
                  </div>
                  <div class="flex items-center">
                    <span class="text-2xl mr-2">🌀</span>
                    <span class="text-blue-200">Низкая магия блокирует деление</span>
                  </div>
                  <div class="flex items-center">
                    <span class="text-2xl mr-2">💀</span>
                    <span class="text-blue-200">Критическая магия блокирует ноль</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 class="text-lg text-purple-300 mb-4">⭐ Числовая нумерология:</h4>
                <div class="grid grid-cols-2 gap-2 text-sm">
                  <div v-for="num in [0,1,2,3,4,5,6,7,8,9]" :key="num" class="flex items-center">
                    <span class="text-xl mr-2">{{ num }}</span>
                    <span :class="isNumberAvailable(num) ? 'text-green-300' : 'text-red-300'">
                      {{ getNumerologyMeaning(num) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Астрологический прогноз для математики -->
          <div class="bg-black/20 rounded-lg p-6 border border-purple-500/20">
            <h3 class="text-2xl text-white mb-6 text-center">🔮 Математический гороскоп</h3>
            
            <div class="text-center">
              <div class="text-6xl mb-4">{{ mathHoroscope.emoji }}</div>
              <h4 class="text-xl font-bold text-purple-300 mb-2">{{ mathHoroscope.title }}</h4>
              <p class="text-purple-200 max-w-2xl mx-auto">{{ mathHoroscope.prediction }}</p>
              
              <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-purple-900/20 rounded-lg p-4">
                  <div class="text-2xl mb-2">🎯</div>
                  <div class="text-purple-300 font-bold">Точность</div>
                  <div class="text-white">{{ mathHoroscope.accuracy }}%</div>
                </div>
                <div class="bg-blue-900/20 rounded-lg p-4">
                  <div class="text-2xl mb-2">⚡</div>
                  <div class="text-blue-300 font-bold">Скорость</div>
                  <div class="text-white">{{ mathHoroscope.speed }}%</div>
                </div>
                <div class="bg-indigo-900/20 rounded-lg p-4">
                  <div class="text-2xl mb-2">🌟</div>
                  <div class="text-indigo-300 font-bold">Удача</div>
                  <div class="text-white">{{ mathHoroscope.luck }}%</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </template>
    </PrimeCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Состояние калькулятора
const currentExpression = ref('')
const calculationHistory = ref<string[]>([])
const currentTime = ref('')

// Астрономические данные
const moonPhases = [
  { name: 'Новолуние', emoji: '🌑', effect: 'Новые начинания', multiplier: 0.5 },
  { name: 'Растущая', emoji: '🌒', effect: 'Рост и увеличение', multiplier: 1.2 },
  { name: 'Первая четверть', emoji: '🌓', effect: 'Принятие решений', multiplier: 1.0 },
  { name: 'Прибывающая', emoji: '🌔', effect: 'Накопление энергии', multiplier: 1.5 },
  { name: 'Полнолуние', emoji: '🌕', effect: 'Максимальная сила', multiplier: 2.0 },
  { name: 'Убывающая', emoji: '🌖', effect: 'Освобождение', multiplier: 0.8 },
  { name: 'Последняя четверть', emoji: '🌗', effect: 'Завершение', multiplier: 0.7 },
  { name: 'Убывающий серп', emoji: '🌘', effect: 'Очищение', multiplier: 0.6 }
]

const zodiacSigns = [
  { name: 'Овен', emoji: '♈', power: 'Быстрые операции', effect: 'Ускоряет вычисления' },
  { name: 'Телец', emoji: '♉', power: 'Точные расчёты', effect: 'Повышает точность' },
  { name: 'Близнецы', emoji: '♊', power: 'Сложные выражения', effect: 'Разрешает сложные формулы' },
  { name: 'Рак', emoji: '♋', power: 'Эмоциональная математика', effect: 'Влияет на настроение чисел' },
  { name: 'Лев', emoji: '♌', power: 'Большие числа', effect: 'Увеличивает результаты' },
  { name: 'Дева', emoji: '♍', power: 'Идеальная точность', effect: 'Требует совершенства' }
]

// Текущие астрономические условия
const currentMoonPhase = ref(moonPhases[0])
const currentZodiac = ref(zodiacSigns[0])
const magicalTime = ref(50)

// Вычисляемые свойства
const moonModifier = computed(() => currentMoonPhase.value.multiplier)

const displayResult = computed(() => {
  if (!currentExpression.value) return '0'
  
  try {
    // Простая оценка выражения (только для отображения)
    const result = evaluateExpression(currentExpression.value)
    return (result * moonModifier.value).toFixed(2)
  } catch {
    return 'ERROR'
  }
})



const mathHoroscope = computed(() => {
  const hour = new Date().getHours()
  const predictions = [
    {
      emoji: '🌟', title: 'Математическая удача',
      prediction: 'Сегодня звёзды благоволят точным вычислениям. Остерегайтесь деления на ноль в полночь.',
      accuracy: 85, speed: 70, luck: 95
    },
    {
      emoji: '⚡', title: 'Быстрые расчёты',
      prediction: 'Меркурий в соединении с Юпитером ускоряет все математические операции.',
      accuracy: 75, speed: 95, luck: 60
    },
    {
      emoji: '🔮', title: 'Мистические числа',
      prediction: 'Загадочные силы влияют на результаты. Доверьтесь интуиции при выборе операций.',
      accuracy: 60, speed: 80, luck: 90
    }
  ]
  
  return predictions[hour % predictions.length]
})

// Активные ограничения
const activeRestrictions = computed(() => {
  const restrictions = []
  const phase = currentMoonPhase.value
  const hour = new Date().getHours()
  
  // Лунные ограничения
  if (phase.name === 'Новолуние') {
    restrictions.push({
      id: 'newmoon-odd',
      emoji: '🌑',
      title: 'Новолуние блокирует нечётные',
      description: 'Лунная энергия ослаблена, нечётные числа недоступны',
      blocks: '1, 3, 5, 7, 9',
      severity: 'high'
    })
  }
  
  // Временные ограничения
  if (hour >= 0 && hour < 6) {
    restrictions.push({
      id: 'night-numbers',
      emoji: '🌙',
      title: 'Ночные ограничения',
      description: 'В тёмное время доступны только малые числа',
      blocks: '6, 7, 8, 9',
      severity: 'medium'
    })
  }
  
  // Магические ограничения
  if (magicalTime.value < 30) {
    restrictions.push({
      id: 'low-magic-division',
      emoji: '🌀',
      title: 'Слабая магическая энергия',
      description: 'При низком уровне магии деление недоступно',
      blocks: 'Деление (÷)',
      severity: 'medium'
    })
  }
  
  if (magicalTime.value < 10) {
    restrictions.push({
      id: 'critical-magic',
      emoji: '💀',
      title: 'Критически низкая магия',
      description: 'Магическая энергия на исходе, ноль заблокирован',
      blocks: '0',
      severity: 'high'
    })
  }
  
  // Зодиакальные ограничения
  if (currentZodiac.value.name === 'Дева') {
    restrictions.push({
      id: 'virgo-perfection',
      emoji: '♍',
      title: 'Перфекционизм Девы',
      description: 'Дева требует точности, случайные операции заблокированы',
      blocks: 'Случайные вычисления',
      severity: 'low'
    })
  }
  
  return restrictions
})

// Функции проверки доступности
const isNumberAvailable = (num: number): boolean => {
  // Проверяем лунные ограничения
  if (currentMoonPhase.value.name === 'Новолуние' && num % 2 === 1) {
    return false // Нечётные числа заблокированы в новолуние
  }
  
  // Проверяем время
  const hour = parseInt(currentTime.value.split(':')[0])
  if (hour >= 0 && hour < 6 && num > 5) {
    return false // Ночью только числа 0-5
  }
  
  // Проверяем магическое время
  if (magicalTime.value < 10 && num === 0) {
    return false // При критически низкой магии ноль заблокирован
  }
  
  return true
}

const isOperationAvailable = (op: string): boolean => {
  // Проверяем магическое время для деления
  if (magicalTime.value < 30 && op === '/') {
    return false
  }
  
  // Проверяем ночные ограничения
  const hour = parseInt(currentTime.value.split(':')[0])
  if (hour >= 0 && hour < 6 && ['+', '-'].includes(op)) {
    return Math.random() > 0.3 // 70% вероятность блокировки ночью
  }
  
  return true
}

// Информационные функции
const getNumberInfo = (num: number): string => {
  if (isNumberAvailable(num)) return ''
  
  const meanings = {
    0: 'Пустота космоса',
    1: 'Единство запрещено',
    2: 'Двойственность',
    3: 'Треугольник силы',
    4: 'Стабильность',
    5: 'Пентаграмма',
    6: 'Гармония',
    7: 'Мистическое число',
    8: 'Бесконечность',
    9: 'Завершение цикла'
  }
  
  return meanings[num as keyof typeof meanings] || 'Заблокировано'
}

const getOperationInfo = (op: string): string => {
  if (isOperationAvailable(op)) return ''
  
  const meanings = {
    '+': 'Луна не благоволит сложению',
    '-': 'Вычитание под запретом',
    '*': 'Умножение заблокировано',
    '/': 'Деление опасно',
    '.': 'Десятичные под вопросом'
  }
  
  return meanings[op as keyof typeof meanings] || 'Недоступно'
}

const getNumerologyMeaning = (num: number): string => {
  const meanings = [
    'Пустота', 'Единство', 'Дуальность', 'Троица',
    'Стабильность', 'Свобода', 'Гармония', 'Мистика',
    'Бесконечность', 'Завершение'
  ]
  return meanings[num] || 'Неизвестно'
}

// Основные функции калькулятора
const addToExpression = (value: string) => {
  // Проверяем доступность числа или операции
  if (value.match(/[0-9]/)) {
    const num = parseInt(value)
    if (!isNumberAvailable(num)) {
      return // Число недоступно
    }
  } else if (value.match(/[+\-*/.]/) && !isOperationAvailable(value)) {
    return // Операция недоступна
  }
  
  currentExpression.value += value
}

const clearAll = () => {
  currentExpression.value = ''
  calculationHistory.value = []
}

const clearEntry = () => {
  currentExpression.value = currentExpression.value.slice(0, -1)
}

const calculate = () => {
  if (!currentExpression.value) return
  
  try {
    const result = evaluateExpression(currentExpression.value)
    const finalResult = result * moonModifier.value
    
    const historyEntry = `${currentExpression.value} = ${finalResult.toFixed(2)} (🌙×${moonModifier.value})`
    calculationHistory.value.unshift(historyEntry)
    
    if (calculationHistory.value.length > 5) {
      calculationHistory.value.pop()
    }
    
    currentExpression.value = finalResult.toString()
  } catch (error) {
    currentExpression.value = 'ERROR'
  }
}

const evaluateExpression = (expr: string): number => {
  // Простая функция оценки выражений (только базовые операции)
  try {
    // Заменяем символы на стандартные операторы
    const sanitized = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-')
    
    // Проверяем на безопасность
    if (!/^[0-9+\-*/.() ]+$/.test(sanitized)) {
      throw new Error('Invalid expression')
    }
    
    return Function(`"use strict"; return (${sanitized})`)()
  } catch {
    throw new Error('Calculation error')
  }
}

// Функции времени и астрономии
const updateAstronomicalData = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('ru-RU')
  
  // Обновляем фазу луны (симуляция)
  const dayOfMonth = now.getDate()
  const phaseIndex = Math.floor((dayOfMonth / 30) * moonPhases.length) % moonPhases.length
  currentMoonPhase.value = moonPhases[phaseIndex]
  
  // Обновляем знак зодиака
  const month = now.getMonth()
  const zodiacIndex = month % zodiacSigns.length
  currentZodiac.value = zodiacSigns[zodiacIndex]
  
  // Обновляем магическое время
  const hour = now.getHours()
  const minute = now.getMinutes()
  magicalTime.value = Math.round(((Math.sin((hour * 60 + minute) / 60) + 1) / 2) * 100)
}

// Интерактивные функции для управления факторами
const cycleMoonPhase = () => {
  const currentIndex = moonPhases.findIndex(phase => phase.name === currentMoonPhase.value.name)
  const nextIndex = (currentIndex + 1) % moonPhases.length
  currentMoonPhase.value = moonPhases[nextIndex]
}

const changeTimeOfDay = () => {
  // Симулируем разное время суток
  const times = ['06:00:00', '12:00:00', '18:00:00', '00:00:00']
  const randomTime = times[Math.floor(Math.random() * times.length)]
  currentTime.value = randomTime
}

const changeZodiac = () => {
  const currentIndex = zodiacSigns.findIndex(sign => sign.name === currentZodiac.value.name)
  const nextIndex = (currentIndex + 1) % zodiacSigns.length
  currentZodiac.value = zodiacSigns[nextIndex]
}

// Функции для отображения времени
const getTimeEmoji = () => {
  const hour = parseInt(currentTime.value.split(':')[0])
  if (hour >= 6 && hour < 12) return '🌅'
  if (hour >= 12 && hour < 18) return '☀️'
  if (hour >= 18 && hour < 22) return '🌆'
  return '🌙'
}

const getTimePeriod = () => {
  const hour = parseInt(currentTime.value.split(':')[0])
  if (hour >= 6 && hour < 12) return 'Утро'
  if (hour >= 12 && hour < 18) return 'День'
  if (hour >= 18 && hour < 22) return 'Вечер'
  return 'Ночь'
}

const getTimeEffect = () => {
  const hour = parseInt(currentTime.value.split(':')[0])
  if (hour >= 0 && hour < 6) return 'Блокирует большие числа'
  if (hour >= 6 && hour < 12) return 'Усиливает сложение'
  if (hour >= 12 && hour < 18) return 'Идеально для всех операций'
  return 'Подходит для умножения'
}

// Функции для магической энергии
const getMagicalLevel = () => {
  if (magicalTime.value >= 80) return 'МАКСИМУМ'
  if (magicalTime.value >= 60) return 'Высокий'
  if (magicalTime.value >= 40) return 'Средний'
  if (magicalTime.value >= 20) return 'Низкий'
  return 'КРИТИЧНО'
}

const getMagicalLevelColor = () => {
  if (magicalTime.value >= 80) return 'text-green-300'
  if (magicalTime.value >= 60) return 'text-blue-300'
  if (magicalTime.value >= 40) return 'text-yellow-300'
  if (magicalTime.value >= 20) return 'text-orange-300'
  return 'text-red-300'
}

// Жизненный цикл
let timeInterval: ReturnType<typeof setInterval>

onMounted(() => {
  updateAstronomicalData()
  timeInterval = setInterval(updateAstronomicalData, 10000) // Обновляем каждые 10 секунд
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})
</script>

<style scoped>
/* Кастомные стили для лунного калькулятора */
.row-span-2 {
  grid-row: span 2;
}

.col-span-2 {
  grid-column: span 2;
}

/* Анимации для кнопок */
@keyframes moon-glow {
  0%, 100% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.3); }
  50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.6); }
}

.available-button {
  animation: moon-glow 2s ease-in-out infinite;
}

/* Стили для отключённых кнопок */
.disabled-button {
  background: linear-gradient(45deg, #4B5563, #6B7280);
  position: relative;
}

.disabled-button::before {
  content: '🌙';
  position: absolute;
  top: -8px;
  right: -8px;
  font-size: 12px;
  opacity: 0.7;
}
</style> 