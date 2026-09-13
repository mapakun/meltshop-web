<template>
  <div class="min-h-screen py-12 px-6" style="background-color: #FEFCE8;">
    <div class="max-w-3xl mx-auto">

      <div class="flex items-center justify-between mb-10">
        <h1 class="text-2xl font-black" style="color: #3D2B1F;">MELT SHOP 관리자</h1>
        <button @click="logout" class="text-sm underline" style="color: #9B7B4B;">로그아웃</button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <NuxtLink to="/admin/portfolio" class="rounded-2xl p-8 block transition-transform hover:scale-[1.02]" style="background-color: #FFFDF0;">
          <div class="text-4xl mb-4">🖼️</div>
          <p class="font-black text-lg mb-1" style="color: #3D2B1F;">포트폴리오 관리</p>
          <p class="text-sm" style="color: #9B7B4B;">작업물 등록·수정·이미지 업로드</p>
        </NuxtLink>

        <NuxtLink to="/admin/customer" class="rounded-2xl p-8 block transition-transform hover:scale-[1.02]" style="background-color: #FFFDF0;">
          <div class="text-4xl mb-4">👥</div>
          <p class="font-black text-lg mb-1" style="color: #3D2B1F;">고객 관리</p>
          <p class="text-sm" style="color: #9B7B4B;">고객 정보·포인트 적립 관리</p>
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: false, middleware: 'admin' })

const logout = async () => {
  await $fetch('/api/admin/logout', { method: 'POST' })
  await navigateTo('/admin/login')
}
</script>