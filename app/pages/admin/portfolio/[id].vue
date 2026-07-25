<template>
  <div class="min-h-screen py-12 px-6" style="background-color: #FEFCE8;">
    <div class="max-w-2xl mx-auto">

      <NuxtLink to="/admin" class="text-sm underline mb-6 inline-block" style="color: #9B7B4B;">← 목록으로</NuxtLink>

      <template v-if="item">
        <h1 class="text-2xl font-black mb-8" style="color: #3D2B1F;">
          #{{ item.id }} {{ item.characterName }}
        </h1>

        <!-- 기본 정보 -->
        <div class="rounded-2xl p-6 mb-6" style="background-color: #FFFDF0;">
          <p class="font-bold mb-4" style="color: #3D2B1F;">기본 정보</p>

          <div class="grid grid-cols-2 gap-3 mb-3">
            <input v-model="item.characterName" placeholder="캐릭터명" class="px-3 py-2 rounded-lg outline-none" style="background-color: #FEFCE8;" />
            <input v-model="item.workTitle" placeholder="작품명" class="px-3 py-2 rounded-lg outline-none" style="background-color: #FEFCE8;" />
          </div>

          <textarea
              v-model="item.description"
              placeholder="작업 설명 (최대 200자)"
              maxlength="200"
              rows="4"
              class="w-full px-3 py-2 rounded-lg outline-none resize-none mb-1"
              style="background-color: #FEFCE8;"
          />
          <p class="text-xs text-right mb-3" style="color: #9B7B4B;">{{ item.description?.length ?? 0 }} / 200</p>

          <div class="flex items-center gap-4 text-sm mb-4" style="color: #9B7B4B;">
            <label class="flex items-center gap-2">
              순서 <input v-model.number="item.order" type="number" class="w-16 px-2 py-1 rounded" style="background-color: #FEFCE8;" />
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input v-model="item.published" type="checkbox" /> 공개
            </label>
          </div>

          <button @click="save" class="px-5 py-2 rounded-full font-bold text-sm" style="background-color: #F0C040; color: #3D2B1F;">
            저장
          </button>
        </div>

        <!-- 대표 이미지 -->
        <div class="rounded-2xl p-6 mb-6" style="background-color: #FFFDF0;">
          <p class="font-bold mb-4" style="color: #3D2B1F;">대표 이미지</p>
          <div class="flex items-center gap-4">
            <div class="w-24 h-32 rounded-lg overflow-hidden flex-shrink-0" style="background-color: #EDE8C8;">
              <img v-if="item.imageUrl" :src="item.imageUrl" class="w-full h-full object-cover" />
            </div>
            <input type="file" accept="image/*" @change="uploadMain" class="text-sm" />
          </div>
        </div>

        <!-- 추가 이미지 -->
        <div class="rounded-2xl p-6" style="background-color: #FFFDF0;">
          <div class="flex items-center justify-between mb-4">
            <p class="font-bold" style="color: #3D2B1F;">추가 이미지</p>
            <input type="file" accept="image/*" multiple @change="uploadExtra" class="text-sm" />
          </div>

          <div v-if="item.mt_portfolio_image?.length" class="grid grid-cols-4 gap-3">
            <div
                v-for="img in item.mt_portfolio_image"
                :key="img.id"
                class="relative rounded-lg overflow-hidden"
                style="aspect-ratio: 3/4; background-color: #EDE8C8;"
            >
              <img :src="img.imageUrl" class="w-full h-full object-cover" />
              <button
                  @click="removeImage(img.id)"
                  class="absolute top-1 right-1 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center"
                  style="background-color: rgba(0,0,0,0.6); color: white;"
              >×</button>
            </div>
          </div>
          <p v-else class="text-sm" style="color: #9B7B4B;">등록된 추가 이미지가 없습니다.</p>
        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: false, middleware: 'admin' })

const route = useRoute()
const id = route.params.id

const { data: item, refresh } = await useFetch(`/api/admin/portfolio/${id}`, {
  headers: useRequestHeaders(['cookie'])
})

const save = async () => {
  await $fetch(`/api/admin/portfolio/${id}`, { method: 'PUT', body: item.value })
  await refresh()
  alert('저장되었습니다.')
}

const uploadToR2 = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('portfolioId', id)
  const res = await $fetch('/api/upload', { method: 'POST', body: formData })
  return res.url
}

const uploadMain = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  item.value.imageUrl = await uploadToR2(file)
  await save()
}

const uploadExtra = async (e) => {
  const files = Array.from(e.target.files)
  if (!files.length) return

  for (const file of files) {
    const url = await uploadToR2(file)
    await $fetch('/api/admin/portfolio-image', {
      method: 'POST',
      body: { portfolioId: Number(id), imageUrl: url, order: 0 }
    })
  }
  await refresh()
  e.target.value = ''
}

const removeImage = async (imageId) => {
  if (!confirm('이미지를 삭제하시겠습니까?')) return
  await $fetch(`/api/admin/portfolio-image/${imageId}`, { method: 'DELETE' })
  await refresh()
}
</script>