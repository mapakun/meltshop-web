<template>
  <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 pt-10">
    <button
        :disabled="page <= 1"
        @click="$emit('change', page - 1)"
        class="w-9 h-9 rounded-full text-sm font-bold disabled:opacity-30"
        style="background-color: #FFFDE8; color: #3D2B1F;"
    >‹</button>

    <button
        v-for="p in visiblePages"
        :key="p"
        :disabled="p === '...'"
        @click="p !== '...' && $emit('change', p)"
        class="min-w-9 h-9 px-2 rounded-full text-sm font-bold"
        :style="p === page
        ? 'background-color: #F0C040; color: #3D2B1F;'
        : p === '...'
          ? 'background-color: transparent; color: #C8B880; cursor: default;'
          : 'background-color: #FFFDE8; color: #9B7B4B;'"
    >{{ p }}</button>

    <button
        :disabled="page >= totalPages"
        @click="$emit('change', page + 1)"
        class="w-9 h-9 rounded-full text-sm font-bold disabled:opacity-30"
        style="background-color: #FFFDE8; color: #3D2B1F;"
    >›</button>
  </div>
</template>

<script setup>
const props = defineProps({
  page: { type: Number, required: true },
  totalPages: { type: Number, required: true }
})
defineEmits(['change'])

const visiblePages = computed(() => {
  const { page, totalPages } = props
  const delta = 2
  const range = []

  for (let i = Math.max(1, page - delta); i <= Math.min(totalPages, page + delta); i++) {
    range.push(i)
  }

  if (range[0] > 1) {
    if (range[0] > 2) range.unshift('...')
    range.unshift(1)
  }
  if (range[range.length - 1] < totalPages) {
    if (range[range.length - 1] < totalPages - 1) range.push('...')
    range.push(totalPages)
  }

  return range
})
</script>