<template>
  <section class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-14" style="background-color: #FEFCE8;">

    <!-- 멜트 작업물 배경 -->
    <div v-if="!reduced && works.length" class="absolute inset-0 z-0 pointer-events-none">
      <div
          v-for="(idx, i) in slotIndexes"
          :key="i"
          class="melt-bg-card"
          :class="`slot-${i}`"
          :style="{ animationDelay: `${i * 1.4}s` }"
          @animationiteration="advance(i)"
      >
        <img
            v-if="works[idx]?.imageUrl"
            :src="works[idx].imageUrl"
            :alt="''"
            class="w-full h-full object-cover"
        />
        <div v-else class="w-full h-full" style="background-color: #F3E9C0;"></div>
      </div>
    </div>

    <!-- 장식 원 -->
    <div class="absolute top-16 left-16 w-40 h-40 rounded-full bg-teal-200/40 z-0"></div>
    <div class="absolute bottom-24 right-8 w-48 h-48 rounded-full bg-pink-200/30 z-0"></div>

    <!-- 콘텐츠 (배경 위) -->
    <div class="relative z-10 flex flex-col items-center">
      <div class="w-36 h-36 mb-6">
        <img src="/images/character.png" alt="멜트샵 캐릭터" class="w-full h-full object-contain" />
      </div>

      <p class="text-xs font-bold tracking-widest text-yellow-700 mb-2">COSPLAY WIG STYLING</p>
      <h1 class="text-6xl font-black text-gray-900 mb-4">MELT SHOP</h1>
      <p class="text-base text-gray-700 mb-8">당신의 캐릭터를 완성시켜드릴게요 🧡</p>

      <a
          href="https://pf.kakao.com/_dxefxnX"
          target="_blank"
          class="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-full transition-colors"
      >
        <span>●</span> 견적 문의하기
      </a>
    </div>

  </section>
</template>

<script setup>
const { data } = await useFetch('/api/portfolio', { query: { all: 1 } })
const works = computed(() => data.value?.items ?? [])

const SLOT_COUNT = 6

const slotIndexes = ref(
    Array.from({ length: SLOT_COUNT }, (_, k) =>
        works.value.length ? k % works.value.length : 0
    )
)

const advance = (i) => {
  const len = works.value.length
  if (len <= 1) return

  const shown = new Set(slotIndexes.value)
  const candidates = works.value
      .map((_, idx) => idx)
      .filter(idx => !shown.has(idx))

  if (candidates.length) {
    slotIndexes.value[i] = candidates[Math.floor(Math.random() * candidates.length)]
  } else {
    let next = Math.floor(Math.random() * len)
    if (next === slotIndexes.value[i]) next = (next + 1) % len
    slotIndexes.value[i] = next
  }
}

const reduced = ref(false)
onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})
</script>

<style scoped>
.melt-bg-card {
  position: absolute;
  width: 180px;
  height: 225px;
  border-radius: 14px;
  overflow: hidden;
  opacity: 0.4;
  transform-origin: top center;
  animation: melt 5.5s ease-in-out infinite backwards;
}

/* 데스크탑 위치 (중심 쪽으로 모음) */
.slot-0 { top: 16%; left: 20%; }
.slot-1 { top: 20%; right: 20%; }
.slot-2 { bottom: 18%; left: 24%; }
.slot-3 { bottom: 22%; right: 22%; }
.slot-4 { top: 38%; left: 12%; }
.slot-5 { top: 42%; right: 12%; }

/* 모바일: 4장만 네 모서리로, 크기 축소, 중앙 비움 */
@media (max-width: 640px) {
  .melt-bg-card { width: 100px; height: 125px; }
  .slot-0 { top: 4%;    left: 2%;  right: auto; bottom: auto; }
  .slot-1 { top: 4%;    right: 2%; left: auto;  bottom: auto; }
  .slot-2 { bottom: 5%; left: 2%;  top: auto;   right: auto; }
  .slot-3 { bottom: 5%; right: 2%; top: auto;   left: auto; }
  .slot-4, .slot-5 { display: none; }
}

@keyframes melt {
  0%   { opacity: 0; transform: translateY(-14px) scaleY(0.72); border-radius: 14px 14px 46% 46%; filter: blur(3px); }
  14%  { opacity: 0.4; transform: translateY(0) scaleY(1); border-radius: 14px; filter: blur(0); }
  62%  { opacity: 0.4; transform: translateY(0) scaleY(1); border-radius: 14px; filter: blur(0); }
  82%  { opacity: 0.32; transform: translateY(10px) scaleY(1.12); border-radius: 14px 14px 50% 50% / 14px 14px 90% 90%; filter: blur(1px); }
  100% { opacity: 0; transform: translateY(30px) scaleY(1.5); border-radius: 10px 10px 60% 60% / 10px 10px 140% 140%; filter: blur(5px); }
}
</style>