<template>
  <div>
    <PortfolioList />
    <PortfolioModal :id="route.params.id" />
  </div>
</template>

<script setup>
const route = useRoute()
</script>