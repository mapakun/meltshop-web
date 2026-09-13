<template>
  <div class="font-nunito min-h-screen py-20 px-6" style="background-color: #FEFCE8;">
    <div class="max-w-md mx-auto">

      <p class="text-xs font-bold tracking-widest text-center mb-2" style="color: #9B7B4B;">MY POINT</p>
      <h1 class="text-3xl font-black text-center mb-8" style="color: #3D2B1F;">포인트 조회</h1>

      <!-- 조회 폼 -->
      <div v-if="!result" class="rounded-2xl p-6" style="background-color: #FFFDF0;">
        <p class="text-sm mb-4" style="color: #6B5B4B;">등록하신 이름과 핸드폰 번호를 입력해 주세요.</p>
        <input v-model="form.name" @keyup.enter="lookup" placeholder="닉네임" class="w-full px-4 py-3 rounded-xl outline-none mb-3" style="background-color: #FEFCE8;" />
        <input v-model="form.phone" @keyup.enter="lookup" placeholder="고객번호" class="w-full px-4 py-3 rounded-xl outline-none mb-4" style="background-color: #FEFCE8;" />
        <p v-if="error" class="text-sm text-center mb-3" style="color: #D04040;">{{ error }}</p>
        <button
            @click="lookup"
            :disabled="loading"
            class="w-full py-3 rounded-xl font-black disabled:opacity-40"
            style="background-color: #F0C040; color: #3D2B1F;"
        >
          {{ loading ? '조회 중...' : '포인트 조회하기' }}
        </button>
      </div>

      <!-- 조회 결과 -->
      <div v-else>
        <div class="rounded-2xl p-8 text-center mb-4" style="background-color: #FFFDF0;">
          <p class="text-sm mb-1" style="color: #9B7B4B;">{{ result.name }} 님 ({{ result.phone }})</p>
          <p class="text-xs mb-2" style="color: #C8B880;">보유 포인트</p>
          <p class="text-4xl font-black" style="color: #E8A020;">{{ result.point.toLocaleString() }} P</p>
        </div>

        <div class="rounded-2xl p-6" style="background-color: #FFFDF0;">
          <p class="font-bold mb-4" style="color: #3D2B1F;">최근 적립 내역</p>
          <div v-if="result.history.length" class="space-y-2">
            <div
                v-for="(h, i) in result.history"
                :key="i"
                class="flex items-center justify-between text-sm py-2 border-b"
                style="border-color: #F0EBD0;"
            >
              <div>
                <span :style="{ color: h.amount >= 0 ? '#2E9E5B' : '#D04040', fontWeight: 800 }">
                  {{ h.amount >= 0 ? '+' : '' }}{{ h.amount.toLocaleString() }} P
                </span>
                <span class="ml-2" style="color: #6B5B4B;">{{ h.reason || '-' }}</span>
              </div>
              <span class="text-xs" style="color: #9B7B4B;">{{ formatDate(h.createdAt) }}</span>
            </div>
          </div>
          <p v-else class="text-sm" style="color: #9B7B4B;">적립 내역이 없습니다.</p>
        </div>

        <button @click="reset" class="w-full mt-4 py-2 text-sm underline" style="color: #9B7B4B;">
          다시 조회하기
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
const form = ref({ name: '', phone: '' })
const result = ref(null)
const loading = ref(false)
const error = ref('')

const lookup = async () => {
  if (!form.value.name || !form.value.phone) {
    error.value = '등록하신 닉네임과 고객번호를 입력해 주세요.'
    return
  }
  loading.value = true
  error.value = ''
  try {
    result.value = await $fetch('/api/point/lookup', { method: 'POST', body: form.value })
  } catch (e) {
    error.value = e.data?.statusMessage ?? '조회에 실패했습니다.'
  } finally {
    loading.value = false
  }
}

const reset = () => {
  result.value = null
  form.value = { name: '', phone: '' }
}

const formatDate = (d) => new Date(d).toLocaleDateString('ko-KR', {
  year: '2-digit', month: '2-digit', day: '2-digit'
})
</script>