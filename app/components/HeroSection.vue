<template>
  <section class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-14" style="background-color: #FEFCE8;">
    <!-- 장식 원 -->
    <div class="absolute top-16 left-16 w-40 h-40 rounded-full bg-teal-200/50"></div>
    <div class="absolute bottom-24 right-8 w-48 h-48 rounded-full bg-pink-200/40"></div>

    <!-- 캐릭터 이미지 자리 (추후 실제 이미지로 교체) -->
    <div class="w-36 h-36 mb-6">
      <img src="/images/character.png" alt="멜트샵 캐릭터" class="w-full h-full object-contain" />
    </div>

    <!-- 텍스트 -->
    <p class="text-xs font-bold tracking-widest text-yellow-700 mb-2">COSPLAY WIG STYLING</p>
    <h1 class="text-6xl font-black text-gray-900 mb-4">MELT SHOP</h1>
    <p class="text-base text-gray-700 mb-8">당신의 캐릭터를 완성시켜드릴게요 🧡</p>

    <!-- 버튼 -->
    <a
        href="#contact"
        class="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-full transition-colors"
    >
      <span>●</span> 견적 문의하기
    </a>
  </section>
</template>