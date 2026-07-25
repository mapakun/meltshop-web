<template>
  <section id="about" class="bg-white py-20 px-6">
    <div class="max-w-4xl mx-auto">

      <!-- 제목 -->
      <p class="text-xs font-bold tracking-widest mb-2" style="color: #9B7B4B;">ABOUT MELT SHOP</p>
      <h2 class="text-4xl font-black mb-3" style="color: #3D2B1F;">멜트샵을 소개합니다</h2>
      <div class="w-10 h-1 rounded-full mb-10" style="background-color: #E8A020;"></div>

      <!-- 본문 + 이미지 -->
      <div class="flex flex-col md:flex-row gap-10 mb-12">
        <div class="flex-1 space-y-4 text-sm leading-relaxed" style="color: #4B3B2B;">
          <p>안녕하세요! <strong>멜트샵</strong>은 코스프레 가발 스타일링 전문 샵입니다.</p>
          <p>원하시는 캐릭터의 가발을 <strong>원작에 충실하게</strong> 제작해 드립니다. 처음 코스프레를 시작하시는 분들도 편하게 문의해 주세요!</p>
          <p>주문자님의 의견을 최선으로 반영하여 제작하고 있으니, 편하게 상담 해주시길 바랍니다. 🧡</p>
        </div>

        <!-- 캐릭터 이미지 -->
        <div class="flex items-center justify-center">
          <div class="w-48 h-48 rounded-full flex items-center justify-center" style="background-color: #FEF9C3;">
            <img src="/images/character2.png" alt="멜트샵 캐릭터" class="w-40 h-40 object-contain" />
          </div>
        </div>
      </div>

      <!-- 4가지 카드 -->
      <div class="grid grid-cols-2 gap-3 w-full">
        <div class="rounded-2xl p-6 flex flex-col items-center gap-3" style="background-color: #FEFCE8;">
          <span class="text-3xl">✂️</span>
          <p class="text-sm font-bold" style="color: #3D2B1F;">정밀한 스타일링</p>
        </div>
        <div class="rounded-2xl p-6 flex flex-col items-center gap-3" style="background-color: #FEFCE8;">
          <span class="text-3xl">🧡</span>
          <p class="text-sm font-bold" style="color: #3D2B1F;">원작 충실 재현</p>
        </div>
        <div class="rounded-2xl p-6 flex flex-col items-center gap-3" style="background-color: #FEFCE8;">
          <span class="text-3xl">📦</span>
          <p class="text-sm font-bold" style="color: #3D2B1F;">안전한 택배 배송</p>
        </div>
        <div class="rounded-2xl p-6 flex flex-col items-center gap-3" style="background-color: #FEFCE8;">
          <span class="text-3xl">💬</span>
          <p class="text-sm font-bold" style="color: #3D2B1F;">친절한 1:1 상담</p>
        </div>
      </div>

    </div>
  </section>
</template>