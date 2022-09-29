<template>
  <div class="viewsBox">
    <el-scrollbar width="100%" height="100%">
      <router-view />
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.viewsBox {
  & {
    width: var(--view-Width);
    min-width: 1080px;
    height: calc(100% - 40px);
    min-height: 677px;
    margin-top: 40px;
    overflow: hidden;
  }
}
</style>
