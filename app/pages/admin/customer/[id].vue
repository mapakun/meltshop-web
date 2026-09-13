<template>
  <div class="min-h-screen py-12 px-6" style="background-color: #FEFCE8;">
    <div class="max-w-2xl mx-auto">

      <NuxtLink to="/admin/customer" class="text-sm underline mb-6 inline-block" style="color: #9B7B4B;">← 고객 목록</NuxtLink>

      <template v-if="customer">
        <!-- 기본 정보 -->
        <div class="rounded-2xl p-6 mb-6" style="background-color: #FFFDF0;">
          <div class="flex items-center justify-between mb-5">
            <div>
              <p class="text-xs" style="color: #9B7B4B;">#{{ customer.id }}</p>
              <p class="font-black text-xl" style="color: #3D2B1F;">{{ customer.name }}</p>
            </div>
            <div class="text-right">
              <p class="text-xs" style="color: #9B7B4B;">보유 포인트</p>
              <p class="font-black text-2xl" style="color: #E8A020;">{{ customer.point.toLocaleString() }} P</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 mb-3">
            <input v-model="customer.name" placeholder="닉네임" class="px-3 py-2 rounded-lg outline-none" style="background-color: #FEFCE8;" />
            <input v-model="customer.phone" placeholder="고객번호" class="px-3 py-2 rounded-lg outline-none" style="background-color: #FEFCE8;" />
          </div>
          <div class="flex gap-2">
            <button @click="saveInfo" class="px-5 py-2 rounded-full font-bold text-sm" style="background-color: #F0C040; color: #3D2B1F;">정보 저장</button>
            <button @click="removeCustomer" class="px-5 py-2 rounded-full text-sm" style="background-color: #F0D0D0; color: #8B3030;">고객 삭제</button>
          </div>
        </div>

        <!-- 포인트 조정 -->
        <div class="rounded-2xl p-6 mb-6" style="background-color: #FFFDF0;">
          <p class="font-bold mb-4" style="color: #3D2B1F;">포인트 조정</p>
          <div class="flex flex-col sm:flex-row gap-3 mb-3">
            <input v-model.number="pointForm.amount" type="number" placeholder="변동 포인트 (적립 +, 사용 -)" class="flex-1 px-3 py-2 rounded-lg outline-none" style="background-color: #FEFCE8;" />
            <input v-model="pointForm.reason" placeholder="사유 (예: 방문 적립)" class="flex-1 px-3 py-2 rounded-lg outline-none" style="background-color: #FEFCE8;" />
          </div>
          <div class="flex gap-2">
            <button @click="adjust" class="px-5 py-2 rounded-full font-bold text-sm" style="background-color: #F0C040; color: #3D2B1F;">적용</button>
            <button @click="pointForm.amount = 10" class="px-3 py-2 rounded-full text-xs" style="background-color: #EDE8C8; color: #3D2B1F;">+10</button>
            <button @click="pointForm.amount = 100" class="px-3 py-2 rounded-full text-xs" style="background-color: #EDE8C8; color: #3D2B1F;">+100</button>
          </div>
        </div>

        <!-- 포인트 이력 -->
        <div class="rounded-2xl p-6" style="background-color: #FFFDF0;">
          <p class="font-bold mb-4" style="color: #3D2B1F;">포인트 이력</p>
          <div v-if="customer.mt_point_history.length" class="space-y-2">
            <div
                v-for="h in customer.mt_point_history"
                :key="h.id"
                class="flex items-center justify-between text-sm py-2 border-b"
                style="border-color: #F0EBD0;"
            >
              <div>
                <span :style="{ color: h.amount >= 0 ? '#2E9E5B' : '#D04040', fontWeight: 800 }">
                  {{ h.amount >= 0 ? '+' : '' }}{{ h.amount.toLocaleString() }} P
                </span>
                <span class="ml-2" style="color: #6B5B4B;">{{ h.reason || '-' }}</span>
              </div>
              <div class="text-right" style="color: #9B7B4B;">
                <span class="text-xs">잔액 {{ h.balance.toLocaleString() }} P</span>
                <span class="text-xs ml-2">{{ formatDate(h.createdAt) }}</span>
              </div>
            </div>
          </div>
          <p v-else class="text-sm" style="color: #9B7B4B;">포인트 이력이 없습니다.</p>
        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: false, middleware: 'admin' })

const route = useRoute()
const id = route.params.id

const { data: customer, refresh } = await useFetch(`/api/admin/customer/${id}`, {
  headers: useRequestHeaders(['cookie'])
})

const pointForm = ref({ amount: null, reason: '' })

const saveInfo = async () => {
  try {
    await $fetch(`/api/admin/customer/${id}`, { method: 'PUT', body: customer.value })
    await refresh()
    alert('저장되었습니다.')
  } catch (e) {
    alert(e.data?.statusMessage ?? '저장에 실패했습니다.')
  }
}

const adjust = async () => {
  if (!pointForm.value.amount) {
    alert('변동 포인트를 입력해주세요.')
    return
  }
  try {
    await $fetch(`/api/admin/customer/${id}/point`, { method: 'POST', body: pointForm.value })
    pointForm.value = { amount: null, reason: '' }
    await refresh()
  } catch (e) {
    alert(e.data?.statusMessage ?? '조정에 실패했습니다.')
  }
}

const removeCustomer = async () => {
  if (!confirm('정말 이 고객을 삭제하시겠습니까? 포인트 이력도 함께 삭제됩니다.')) return
  await $fetch(`/api/admin/customer/${id}`, { method: 'DELETE' })
  await navigateTo('/admin/customer')
}

const formatDate = (d) => new Date(d).toLocaleDateString('ko-KR', {
  year: '2-digit', month: '2-digit', day: '2-digit'
})
</script>