<template>
  <div class="min-h-screen py-12 px-6" style="background-color: #FEFCE8;">
    <div class="max-w-xl mx-auto">
      <NuxtLink to="/admin" class="text-sm underline" style="color: #9B7B4B;">← 대시보드</NuxtLink>
      <h1 class="text-2xl font-black mt-1 mb-8" style="color: #3D2B1F;">수주 상태 관리</h1>

      <div class="rounded-2xl p-6" style="background-color: #FFFDF0;">
        <p class="font-bold mb-4" style="color: #3D2B1F;">현재 수주 상태</p>
        <div class="flex gap-3 mb-6">
          <button
              v-for="opt in options"
              :key="opt.value"
              @click="form.status = opt.value"
              class="flex-1 py-3 rounded-xl font-bold text-sm border-2 transition-all"
              :style="form.status === opt.value
              ? `border-color:${opt.color}; background-color:${opt.color}; color:#fff;`
              : 'border-color:#EDE8C8; background-color:#FEFCE8; color:#6B5B4B;'"
          >
            {{ opt.label }}
          </button>
        </div>

        <p class="font-bold mb-2" style="color: #3D2B1F;">안내 메모</p>
        <textarea
            v-model="form.memo"
            rows="3"
            maxlength="200"
            placeholder="예: 현재 주문이 많아 제작이 2주 지연됩니다."
            class="w-full px-3 py-2 rounded-lg outline-none resize-none mb-1"
            style="background-color: #FEFCE8;"
        ></textarea>
        <p class="text-xs text-right mb-4" style="color: #9B7B4B;">{{ form.memo?.length ?? 0 }} / 200</p>

        <button @click="save" class="px-6 py-2 rounded-full font-bold text-sm" style="background-color: #F0C040; color: #3D2B1F;">
          저장
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: false, middleware: 'admin' })

const options = [
  { value: 'OPEN', label: '수주 가능', color: '#2E9E5B' },
  { value: 'BUSY', label: '수주 지연', color: '#E8A020' },
  { value: 'CLOSED', label: '수주 마감', color: '#D04040' },
]

const { data } = await useFetch('/api/shop-status', { headers: useRequestHeaders(['cookie']) })
const form = ref({ status: data.value?.status ?? 'OPEN', memo: data.value?.memo ?? '' })

const save = async () => {
  await $fetch('/api/admin/shop-status', { method: 'PUT', body: form.value })
  alert('저장되었습니다.')
}
</script>
