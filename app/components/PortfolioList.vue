<template>
  <div class="font-nunito">

    <!-- 헤더 영역 -->
    <section class="py-20 px-6 text-center" style="background-color: #FEFCE8;">
      <p class="text-xs font-bold tracking-widest mb-3" style="color: #9B7B4B;">OUR WORKS</p>
      <h1 class="text-4xl font-black mb-3" style="color: #3D2B1F;">작업물 갤러리</h1>
      <div class="w-10 h-1 rounded-full mx-auto" style="background-color: #E8A020;"></div>
    </section>

    <!-- 갤러리 그리드 -->
    <section class="py-12 px-6" style="background-color: #FEFCE8;">
      <div class="max-w-5xl mx-auto">
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
          <NuxtLink
              v-for="item in data?.items"
              :key="item.id"
              :to="{ path: `/portfolio/${item.id}`, query: { page: page } }"
              style="background-color: #FFFDE8; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); display: block;"
          >
            <!-- 이미지 영역 -->
            <div style="width: 100%; aspect-ratio: 3/4; background-color: #EDE8C8; overflow: hidden;">
              <img
                  v-if="item.imageUrl"
                  :src="item.imageUrl"
                  :alt="item.characterName"
                  loading="lazy"
                  style="width: 100%; height: 100%; object-fit: cover;"
              />
              <div v-else style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #C8B880;">
                <span style="font-size: 28px;">🙂</span>
                <span style="font-size: 12px; margin-top: 8px;">작업물 사진</span>
              </div>
            </div>

            <!-- 카드 하단 정보 -->
            <div style="padding: 14px 16px;">
              <p style="font-weight: 900; font-size: 16px; color: #3D2B1F; margin: 0 0 4px;">{{ item.characterName }}</p>
              <p style="font-size: 13px; color: #9B7B4B; margin: 0;">{{ item.workTitle }}</p>
            </div>
          </NuxtLink>
        </div>

        <!-- 페이지네이션 -->
        <Pagination
            v-if="data"
            :page="data.page"
            :total-pages="data.totalPages"
            @change="goPage"
        />
      </div>
    </section>

  </div>
</template>

<script setup>
const route = useRoute()
const page = computed(() => Number(route.query.page) || 1)

const { data } = await useFetch('/api/portfolio', {
  query: { page }
})

const goPage = (p) => {
  navigateTo({ path: '/portfolio', query: { page: p } })
}
</script>