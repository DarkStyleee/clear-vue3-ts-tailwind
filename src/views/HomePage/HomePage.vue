<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8">
    <div class="max-w-7xl mx-auto">
      
      <!-- Заголовок -->
      <div class="text-center mb-16">
        <h1 class="text-6xl font-bold text-white mb-6 animate-pulse">
          🎪 ХАКАТОН КРЕАТИВНОСТИ 🎪
        </h1>
        <p class="text-2xl text-purple-200 mb-4">
          Добро пожаловать в мир неявных интерфейсов!
        </p>
        <p class="text-lg text-purple-300 max-w-3xl mx-auto">
          Здесь привычные элементы управления работают совершенно по-другому. 
          Приготовьтесь к путешествию в альтернативную реальность UX/UI!
        </p>
      </div>

      <!-- Сетка демо -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        
        <!-- Демо 1: Слайдер-телефон -->
        <PrimeCard class="bg-white/10 backdrop-blur-lg border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 cursor-pointer group">
          <template #content>
            <router-link :to="{ name: RouteName.PHONE_SLIDER }" class="block p-6 text-center">
              <div class="text-6xl mb-4 group-hover:animate-bounce">📱</div>
              <h3 class="text-2xl font-bold text-white mb-3">Ввод номера телефона</h3>
              <p class="text-purple-200 mb-4">
                Забудьте про обычную клавиатуру! Каждая цифра номера вводится отдельным слайдером.
              </p>
              <div class="flex flex-wrap gap-2 justify-center mb-4">
                <span class="px-3 py-1 bg-purple-500/30 rounded-full text-sm text-purple-200">Слайдеры</span>
                <span class="px-3 py-1 bg-blue-500/30 rounded-full text-sm text-blue-200">Рейтинги</span>
                <span class="px-3 py-1 bg-green-500/30 rounded-full text-sm text-green-200">Анимации</span>
              </div>
              <div class="text-purple-300 group-hover:text-white transition-colors">
                Нажмите для демо →
              </div>
            </router-link>
          </template>
        </PrimeCard>

        <!-- Демо 2: Хаотичная громкость -->
        <PrimeCard class="bg-white/10 backdrop-blur-lg border border-red-500/30 hover:border-red-400/50 transition-all duration-300 hover:scale-105 cursor-pointer group">
          <template #content>
            <router-link :to="{ name: RouteName.CHAOS_VOLUME }" class="block p-6 text-center">
              <div class="text-6xl mb-4 group-hover:animate-spin">🎵</div>
              <h3 class="text-2xl font-bold text-white mb-3">Хаотичный контроль громкости</h3>
              <p class="text-red-200 mb-4">
                Каждый контрол громкости работает непредсказуемо. Один показывает не то, другой работает наоборот!
              </p>
              <div class="flex flex-wrap gap-2 justify-center mb-4">
                <span class="px-3 py-1 bg-red-500/30 rounded-full text-sm text-red-200">Рандомизация</span>
                <span class="px-3 py-1 bg-orange-500/30 rounded-full text-sm text-orange-200">Обман</span>
                <span class="px-3 py-1 bg-yellow-500/30 rounded-full text-sm text-yellow-200">Хаос</span>
              </div>
              <div class="text-red-300 group-hover:text-white transition-colors">
                Испытай удачу →
              </div>
            </router-link>
          </template>
        </PrimeCard>

        <!-- Демо 3: Креативные формы -->
        <PrimeCard class="bg-white/10 backdrop-blur-lg border border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105 cursor-pointer group">
          <template #content>
            <router-link :to="{ name: RouteName.CREATIVE_FORMS }" class="block p-6 text-center">
              <div class="text-6xl mb-4 group-hover:animate-pulse">🎨</div>
              <h3 class="text-2xl font-bold text-white mb-3">Креативные формы ввода</h3>
              <p class="text-green-200 mb-4">
                Рисуйте цвета, собирайте слова из пазлов, вводите числа танцем мыши и выбирайте даты по звёздам!
              </p>
              <div class="flex flex-wrap gap-2 justify-center mb-4">
                <span class="px-3 py-1 bg-green-500/30 rounded-full text-sm text-green-200">Canvas</span>
                <span class="px-3 py-1 bg-teal-500/30 rounded-full text-sm text-teal-200">Пазлы</span>
                <span class="px-3 py-1 bg-cyan-500/30 rounded-full text-sm text-cyan-200">Астрология</span>
              </div>
              <div class="text-green-300 group-hover:text-white transition-colors">
                Открой творчество →
              </div>
            </router-link>
          </template>
        </PrimeCard>

        <!-- Демо 4: Навигационный ад -->
        <PrimeCard class="bg-white/10 backdrop-blur-lg border border-red-600/30 hover:border-red-500/50 transition-all duration-300 hover:scale-105 cursor-pointer group">
          <template #content>
            <router-link :to="{ name: RouteName.NAVIGATION_HELL }" class="block p-6 text-center">
              <div class="text-6xl mb-4 group-hover:animate-bounce">🔥</div>
              <h3 class="text-2xl font-bold text-white mb-3">Навигационный ад</h3>
              <p class="text-red-200 mb-4">
                Кнопки убегают от курсора, ссылки лгут, элементы прячутся. Настоящий кошмар для пользователя!
              </p>
              <div class="flex flex-wrap gap-2 justify-center mb-4">
                <span class="px-3 py-1 bg-red-600/30 rounded-full text-sm text-red-200">Убегающие кнопки</span>
                <span class="px-3 py-1 bg-orange-600/30 rounded-full text-sm text-orange-200">Обман</span>
                <span class="px-3 py-1 bg-gray-600/30 rounded-full text-sm text-gray-200">Хаос</span>
              </div>
              <div class="text-red-300 group-hover:text-white transition-colors">
                Войти в ад →
              </div>
            </router-link>
          </template>
        </PrimeCard>

      </div>

      <!-- Дополнительная информация -->
      <div class="text-center">
        <PrimeCard class="bg-black/30 backdrop-blur-lg border border-white/20 max-w-4xl mx-auto">
          <template #content>
            <div class="p-8">
              <h3 class="text-3xl font-bold text-white mb-6">🎯 Цель проекта</h3>
              <p class="text-lg text-gray-300 mb-6">
                Этот проект демонстрирует как можно радикально переосмыслить привычные элементы интерфейса. 
                Каждое демо показывает альтернативный подход к взаимодействию с пользователем.
              </p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div class="text-center">
                  <div class="text-4xl mb-3">⚡</div>
                  <h4 class="text-xl font-bold text-purple-300 mb-2">Неожиданность</h4>
                  <p class="text-gray-400">Каждый элемент работает не так, как ожидается</p>
                </div>
                <div class="text-center">
                  <div class="text-4xl mb-3">🎨</div>
                  <h4 class="text-xl font-bold text-blue-300 mb-2">Креативность</h4>
                  <p class="text-gray-400">Нестандартные подходы к решению обычных задач</p>
                </div>
                <div class="text-center">
                  <div class="text-4xl mb-3">🧠</div>
                  <h4 class="text-xl font-bold text-green-300 mb-2">Вызов</h4>
                  <p class="text-gray-400">Заставляет думать по-новому об UX/UI</p>
                </div>
              </div>
              <div class="text-gray-400 text-sm">
                💡 Создано с использованием Vue 3, TypeScript, Tailwind CSS и PrimeVue
              </div>
            </div>
          </template>
        </PrimeCard>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { RouteName } from '@/router/routes'
</script>

<style scoped>
/* Дополнительные анимации */
@keyframes float {
  0%, 100% { transform: translateY(0px) }
  50% { transform: translateY(-10px) }
}

.float {
  animation: float 3s ease-in-out infinite;
}

/* Переопределение стилей для карточек */
:deep(.p-card) {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

:deep(.p-card:hover) {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}
</style>
