<template>
  <div class="min-h-screen py-12 px-6" style="background-color: #FEFCE8;">
    <div class="max-w-4xl mx-auto">

      <!-- 헤더 -->
      <div class="mb-8">
        <NuxtLink to="/admin" class="text-sm underline" style="color: #9B7B4B;">← 대시보드</NuxtLink>
        <h1 class="text-2xl font-black mt-1" style="color: #3D2B1F;">고객 관리</h1>
      </div>

      <!-- 신규 등록 -->
      <div class="rounded-2xl p-6 mb-6" style="background-color: #FFFDF0;">
        <p class="font-bold mb-4" style="color: #3D2B1F;">새 고객 등록</p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          <input v-model="newItem.name" placeholder="이름 / 닉네임" class="px-3 py-2 rounded-lg outline-none" style="background-color: #FEFCE8;" />
          <input v-model="newItem.phone" placeholder="핸드폰 번호" class="px-3 py-2 rounded-lg outline-none" style="background-color: #FEFCE8;" />
          <input v-model.number="newItem.point" type="number" placeholder="초기 포인트 (0)" class="px-3 py-2 rounded-lg outline-none" style="background-color: #FEFCE8;" />
        </div>
        <button @click="create" class="px-5 py-2 rounded-full font-bold text-sm" style="background-color: #F0C040; color: #3D2B1F;">
          등록
        </button>
      </div>

      <!-- 검색 -->
      <div class="mb-4">
        <input
            v-model="searchInput"
            @keyup.enter="doSearch"
            placeholder="이름 또는 핸드폰 번호로 검색"
            class="w-full px-4 py-2 rounded-full outline-none"
            style="background-color: #FFFDF0;"
        />
      </div>

      <!-- 목록 -->
      <div class="space-y-3">
        <NuxtLink
            v-for="c in list"
            :key="c.id"
            :to="`/admin/customer/${c.id}`"
            class="rounded-2xl p-4 flex items-center justify-between transition-transform hover:scale-[1.01]"
            style="background-color: #FFFDF0;"
        >
          <div>
            <p class="font-bold" style="color: #3D2B1F;">{{ c.name }}</p>
            <p class="text-sm" style="color: #9B7B4B;">{{ c.phone }}</p>
          </div>
          <div class="text-right">
            <p class="font-black text-lg" style="color: #E8A020;">{{ c.point.toLocaleString() }} P</p>
            <p class="text-xs" style="color: #9B7B4B;">#{{ c.id }}</p>
          </div>
        </NuxtLink>

        <p v-if="!list.length" class="text-center text-sm py-10" style="color: #9B7B4B;">
          등록된 고객이 없습니다.
        </p>
      </div>

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
const search = computed(() => route.query.search || '')

const searchInput = ref(search.value)

const { data, refresh } = await useFetch('/api/admin/customer', {
  query: { page, search },
  headers: useRequestHeaders(['cookie'])
})

const list = computed(() => data.value?.items ?? [])

const newItem = ref({ name: '', phone: '', point: 0 })

const create = async () => {
  if (!newItem.value.name || !newItem.value.phone) {
    alert('이름과 고객번호를 입력해주세요.')
    return
  }
  try {
    await $fetch('/api/admin/customer', { method: 'POST', body: newItem.value })
    newItem.value = { name: '', phone: '', point: 0 }
    await refresh()
  } catch (e) {
    alert(e.data?.statusMessage ?? '등록에 실패했습니다.')
  }
}

const doSearch = () => {
  navigateTo({ path: '/admin/customer', query: { search: searchInput.value || undefined } })
}

const goPage = (p) => {
  navigateTo({ path: '/admin/customer', query: { page: p, search: search.value || undefined } })
}
</script>