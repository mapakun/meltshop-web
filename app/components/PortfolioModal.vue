<template>
  <div
      class="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
      style="background-color: rgba(0,0,0,0.5);"
      @click.self="close"
  >
    <div class="w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl" style="background-color: #FFFDF0;">

      <!-- 로딩 -->
      <div v-if="pending" class="p-20 text-center" style="color: #9B7B4B;">불러오는 중...</div>

      <!-- 에러 -->
      <div v-else-if="error" class="p-20 text-center" style="color: #9B7B4B;">
        작업물을 찾을 수 없습니다.
      </div>

      <template v-else-if="data">
        <!-- 상단 헤더 -->
        <div class="flex items-start justify-between p-5 pb-3">
          <div>
            <p class="font-black text-xl" style="color: #3D2B1F;">{{ data.characterName }}</p>
            <p class="text-sm" style="color: #9B7B4B;">{{ data.workTitle }}</p>
          </div>
          <button @click="close" class="text-2xl leading-none px-2" style="color: #9B7B4B;">×</button>
        </div>

        <!-- 메인 이미지 -->
        <div class="px-5">
          <div class="w-full rounded-xl overflow-hidden" style="background-color: #EDE8C8; aspect-ratio: 3/4; max-height: 55vh;">
            <img v-if="currentImage" :src="currentImage" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-sm" style="color: #C8B880;">
              이미지 준비 중
            </div>
          </div>
        </div>

        <!-- 썸네일 -->
        <div v-if="allImages.length > 1" class="flex gap-2 px-5 pt-3 overflow-x-auto">
          <button
              v-for="(img, idx) in allImages"
              :key="idx"
              @click="currentIndex = idx"
              class="flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden"
              :style="{ outline: currentIndex === idx ? '2px solid #F0C040' : 'none' }"
          >
            <img :src="img" class="w-full h-full object-cover" />
          </button>
        </div>

        <!-- 설명문 -->
        <div v-if="data.description" class="px-5 pt-4">
          <div style="background-color: #FEF3C7; border-radius: 16px; padding: 18px 20px;">
            <p class="whitespace-pre-line" style="font-size: 14px; font-weight: 800; line-height: 1.7; color: #7A5A2B; margin: 0;">{{ data.description }}</p>
          </div>
        </div>

        <!-- 공유 -->
        <div class="p-5">
          <button
              @click="copyLink"
              class="w-full py-2.5 rounded-full text-sm font-bold"
              style="background-color: #F0C040; color: #3D2B1F;"
          >
            {{ copied ? '링크가 복사되었습니다!' : '🔗 링크 복사' }}
          </button>
        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: { type: [String, Number], required: true }
})

const route = useRoute()

const { data, pending, error } = await useFetch(() => `/api/portfolio/${props.id}`)

const currentIndex = ref(0)
const copied = ref(false)

const allImages = computed(() => {
  if (!data.value) return []
  const list = []
  if (data.value.imageUrl) list.push(data.value.imageUrl)
  data.value.mt_portfolio_image?.forEach(img => list.push(img.imageUrl))
  return list
})

const currentImage = computed(() => allImages.value[currentIndex.value] ?? null)

const close = () => navigateTo({ path: '/portfolio', query: { page: route.query.page || 1 } })

const copyLink = async () => {
  await navigator.clipboard.writeText(window.location.href)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
})
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>