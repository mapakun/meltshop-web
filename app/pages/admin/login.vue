<template>
  <div class="min-h-screen flex items-center justify-center px-6" style="background-color: #FEFCE8;">
    <div class="w-full max-w-sm">
      <h1 class="text-2xl font-black text-center mb-8" style="color: #3D2B1F;">관리자 로그인</h1>

      <form @submit.prevent="login" class="space-y-4">
        <input
            v-model="id"
            type="text"
            placeholder="아이디"
            class="w-full px-4 py-3 rounded-xl border-0 outline-none"
            style="background-color: #FFFDF0;"
        />
        <input
            v-model="password"
            type="password"
            placeholder="비밀번호"
            class="w-full px-4 py-3 rounded-xl border-0 outline-none"
            style="background-color: #FFFDF0;"
        />

        <p v-if="error" class="text-sm text-center" style="color: #D04040;">{{ error }}</p>

        <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 rounded-xl font-bold disabled:opacity-40"
            style="background-color: #F0C040; color: #3D2B1F;"
        >
          {{ loading ? '로그인 중...' : '로그인' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: false })

const id = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const login = async () => {
  loading.value = true
  error.value = ''

  try {
    await $fetch('/api/admin/login', {
      method: 'POST',
      body: { id: id.value, password: password.value }
    })
    await navigateTo('/admin')
  } catch (err) {
    error.value = err.data?.statusMessage ?? '로그인에 실패했습니다.'
  } finally {
    loading.value = false
  }
}
</script>