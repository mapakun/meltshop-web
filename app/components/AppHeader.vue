<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
    <nav class="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
      <NuxtLink to="/" class="font-black text-lg tracking-tight text-gray-900" @click="open = false">
        MELT SHOP
      </NuxtLink>

      <!-- 데스크탑 메뉴 -->
      <ul class="hidden sm:flex items-center gap-8 text-sm text-gray-700">
        <li><NuxtLink to="/#about" class="hover:text-yellow-500 transition-colors">소개</NuxtLink></li>
        <li><NuxtLink to="/portfolio" class="hover:text-yellow-500 transition-colors">작업물</NuxtLink></li>
        <li><NuxtLink to="/point" class="hover:text-yellow-500 transition-colors">포인트</NuxtLink></li>
        <li><NuxtLink to="/#notice" class="hover:text-yellow-500 transition-colors">공지</NuxtLink></li>
        <li><NuxtLink to="/#contact" class="hover:text-yellow-500 transition-colors">문의</NuxtLink></li>
      </ul>

      <!-- 모바일 햄버거 버튼 -->
      <button class="sm:hidden flex flex-col gap-1.5 p-2" @click="open = !open" aria-label="메뉴 열기">
        <span class="block w-5 h-0.5 bg-gray-800 transition-all duration-200" :class="open ? 'translate-y-2 rotate-45' : ''"></span>
        <span class="block w-5 h-0.5 bg-gray-800 transition-all duration-200" :class="open ? 'opacity-0' : ''"></span>
        <span class="block w-5 h-0.5 bg-gray-800 transition-all duration-200" :class="open ? '-translate-y-2 -rotate-45' : ''"></span>
      </button>
    </nav>

    <!-- 모바일 드롭다운 -->
    <ul v-if="open" class="sm:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 text-sm text-gray-700">
      <li><NuxtLink to="/#about" class="block" @click="open = false">소개</NuxtLink></li>
      <li><NuxtLink to="/portfolio" class="block" @click="open = false">작업물</NuxtLink></li>
      <li><NuxtLink to="/point" class="block" @click="open = false">포인트</NuxtLink></li>
      <li><NuxtLink to="/#notice" class="block" @click="open = false">공지</NuxtLink></li>
      <li><NuxtLink to="/#contact" class="block" @click="open = false">문의</NuxtLink></li>
    </ul>
  </header>
</template>

<script setup>
const open = ref(false)
</script>