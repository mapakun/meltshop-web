<template>
  <div class="min-h-screen py-12 px-6" style="background-color: #FEFCE8;">
    <div class="max-w-4xl mx-auto">

      <!-- 헤더 -->
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-2xl font-black" style="color: #3D2B1F;">포트폴리오 관리</h1>
        <button @click="logout" class="text-sm underline" style="color: #9B7B4B;">로그아웃</button>
      </div>

      <!-- 신규 등록 -->
      <div class="rounded-2xl p-6 mb-8" style="background-color: #FFFDF0;">
        <p class="font-bold mb-4" style="color: #3D2B1F;">새 작업물 등록</p>
        <div class="grid grid-cols-2 gap-3 mb-3">
          <input v-model="newItem.characterName" placeholder="캐릭터명" class="px-3 py-2 rounded-lg outline-none" style="background-color: #FEFCE8;" />
          <input v-model="newItem.workTitle" placeholder="작품명" class="px-3 py-2 rounded-lg outline-none" style="background-color: #FEFCE8;" />
        </div>
        <button @click="create" class="px-5 py-2 rounded-full font-bold text-sm" style="background-color: #F0C040; color: #3D2B1F;">
          등록
        </button>
      </div>

      <!-- 목록 -->
      <div class="space-y-3">
        <div
            v-for="item in list"
            :key="item.id"
            class="rounded-2xl p-4 flex items-center gap-4"
            style="background-color: #FFFDF0;"
        >
          <!-- 썸네일 -->
          <div class="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0" style="background-color: #EDE8C8;">
            <img v-if="item.imageUrl" :src="item.imageUrl" class="w-full h-full object-cover" />
          </div>

          <!-- 정보 -->
          <div class="flex-1 min-w-0">
            <div class="grid grid-cols-2 gap-2 mb-2">
              <input v-model="item.characterName" class="px-2 py-1 rounded text-sm outline-none" style="background-color: #FEFCE8;" />
              <input v-model="item.workTitle" class="px-2 py-1 rounded text-sm outline-none" style="background-color: #FEFCE8;" />
            </div>
            <div class="flex items-center gap-3 text-xs" style="color: #9B7B4B;">
              <span>#{{ item.id }}</span>
              <label class="flex items-center gap-1">
                순서 <input v-model.number="item.order" type="number" class="w-14 px-1 py-0.5 rounded" style="background-color: #FEFCE8;" />
              </label>
              <label class="flex items-center gap-1 cursor-pointer">
                <input v-model="item.published" type="checkbox" /> 공개
              </label>
              <input type="file" accept="image/*" @change="e => uploadImage(e, item)" class="text-xs" />
            </div>
          </div>

          <!-- 버튼 -->
          <div class="flex flex-col gap-2 flex-shrink-0">
            <NuxtLink :to="`/admin/portfolio/${item.id}`" class="px-4 py-1.5 rounded-full text-xs font-bold text-center" style="background-color: #E8D8A0; color: #3D2B1F;">
              상세
            </NuxtLink>
            <button @click="save(item)" class="px-4 py-1.5 rounded-full text-xs font-bold" style="background-color: #F0C040; color: #3D2B1F;">저장</button>
            <button @click="remove(item.id)" class="px-4 py-1.5 rounded-full text-xs" style="background-color: #F0D0D0; color: #8B3030;">삭제</button>
          </div>
        </div>
      </div>

      <!-- 페이지네이션 -->
      <Pagination
          v-if="data"
          :page="data.page"
          :total-pages="data.totalPages"
          @change="goPage"
      />

    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: false, middleware: 'admin' })

const route = useRoute()
const page = computed(() => Number(route.query.page) || 1)

const { data, refresh } = await useFetch('/api/admin/portfolio', {
  query: { page },
  headers: useRequestHeaders(['cookie'])
})

const list = computed(() => data.value?.items ?? [])

const newItem = ref({ characterName: '', workTitle: '' })

const create = async () => {
  if (!newItem.value.characterName || !newItem.value.workTitle) return
  await $fetch('/api/admin/portfolio', { method: 'POST', body: newItem.value })
  newItem.value = { characterName: '', workTitle: '' }
  await refresh()
}

const save = async (item) => {
  await $fetch(`/api/admin/portfolio/${item.id}`, { method: 'PUT', body: item })
  await refresh()
}

const remove = async (id) => {
  if (!confirm('정말 삭제하시겠습니까?')) return
  await $fetch(`/api/admin/portfolio/${id}`, { method: 'DELETE' })
  await refresh()
}

const uploadImage = async (e, item) => {
  const file = e.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('file', file)
  formData.append('portfolioId', item.id)

  const res = await $fetch('/api/upload', { method: 'POST', body: formData })
  item.imageUrl = res.url
  await save(item)
}

const goPage = (p) => {
  navigateTo({ path: '/admin', query: { page: p } })
}

const logout = async () => {
  await $fetch('/api/admin/logout', { method: 'POST' })
  await navigateTo('/admin/login')
}
</script>