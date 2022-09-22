<template>
  <div class="viewcommon-block">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.viewcommon-block {
  & {
    background-color: var(--component-color);
    width: 100%;
    min-height: 270px;
    border-radius: var(--defalut-radius);
  }
}
</style>
