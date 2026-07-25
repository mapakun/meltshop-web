<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
    <nav class="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
      <NuxtLink to="/" class="font-black text-lg tracking-tight text-gray-900">
        MELT SHOP
      </NuxtLink>
      <ul class="flex items-center gap-8 text-sm text-gray-700">
        <li><NuxtLink to="/#about" class="hover:text-yellow-500 transition-colors">소개</NuxtLink></li>
        <li><NuxtLink to="/portfolio" class="hover:text-yellow-500 transition-colors">작업물</NuxtLink></li>
        <li><NuxtLink to="/#notice" class="hover:text-yellow-500 transition-colors">공지</NuxtLink></li>
        <li><NuxtLink to="/#contact" class="hover:text-yellow-500 transition-colors">문의</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>