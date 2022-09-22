<template>
  <div class="viewsBox">
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.viewsBox {
  & {
    // background-color: rgb(255, 255, 255);
    width: var(--view-Width);
    min-width: 1080px;
    height: calc(100% - 40px);
    min-height: 677px;
    margin-top: 40px;
    overflow: hidden;
  }
}
</style>
