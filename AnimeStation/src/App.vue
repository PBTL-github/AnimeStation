<script lang="ts" setup>
import ViewBox from "@/views/index.vue";
import NavBar from "@/components/NavBar/index.vue";
</script>

<template>
  <div class="app-contain">
    <NavBar></NavBar>
    <ViewBox></ViewBox>
  </div>
</template>

<style lang="scss" scoped>
.app-contain {
  & {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
}
</style>
