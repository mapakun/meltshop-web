<template>
  <section v-if="works.length" class="py-16 px-6" style="background-color: #FEFCE8;">
    <div class="max-w-4xl mx-auto text-center">
      <p class="text-xs font-bold tracking-widest mb-2" style="color: #9B7B4B;">MELT</p>
      <h2 class="text-3xl font-black mb-10" style="color: #3D2B1F;">녹아내리는 작업물</h2>

      <!-- 멜트 애니메이션 -->
      <div v-if="!reduced" class="flex gap-6 justify-center flex-wrap" style="min-height: 190px; align-items: flex-start;">
        <div
            v-for="(idx, i) in slotIndexes"
            :key="i"
            class="melt-card"
            :style="{ animationDelay: `${i * 1.83}s` }"
            @animationiteration="advance(i)"
        >
          <img
              v-if="works[idx]?.imageUrl"
              :src="works[idx].imageUrl"
              :alt="works[idx].characterName"
              class="melt-img"
          />
          <div v-else class="melt-placeholder">작업물</div>
        </div>
      </div>

      <!-- 동작 줄이기: 정지 그리드 -->
      <div v-else class="grid grid-cols-3 gap-4 max-w-md mx-auto">
        <div
            v-for="w in works.slice(0, 3)"
            :key="w.id"
            class="rounded-xl overflow-hidden"
            style="aspect-ratio: 3/4; background-color: #F3E9C0;"
        >
          <img v-if="w.imageUrl" :src="w.imageUrl" :alt="w.characterName" style="width:100%;height:100%;object-fit:cover;" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { data } = await useFetch('/api/portfolio')
const works = computed(() => data.value?.items ?? [])

const SLOT_COUNT = 3
const slotIndexes = ref([0, 1, 2])

const advance = (i) => {
  const len = works.value.length
  if (!len) return
  slotIndexes.value[i] = (slotIndexes.value[i] + SLOT_COUNT) % len
}

const reduced = ref(false)
onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})
</script>

<style scoped>
.melt-card {
  width: 130px;
  height: 165px;
  border-radius: 14px;
  overflow: hidden;
  background-color: #F3E9C0;
  transform-origin: top center;
  animation: melt 5.5s ease-in-out infinite backwards;
}
.melt-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.melt-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 10px;
  font-size: 12px;
  font-weight: 800;
  color: #9B7B4B;
}

@keyframes melt {
  0%   { opacity: 0; transform: translateY(-14px) scaleY(0.72); border-radius: 14px 14px 46% 46%; filter: blur(3px); }
  14%  { opacity: 1; transform: translateY(0) scaleY(1); border-radius: 14px; filter: blur(0); }
  62%  { opacity: 1; transform: translateY(0) scaleY(1); border-radius: 14px; filter: blur(0); }
  82%  { opacity: 0.85; transform: translateY(10px) scaleY(1.12); border-radius: 14px 14px 50% 50% / 14px 14px 90% 90%; filter: blur(1px); }
  100% { opacity: 0; transform: translateY(30px) scaleY(1.5); border-radius: 10px 10px 60% 60% / 10px 10px 140% 140%; filter: blur(5px); }
}
</style>