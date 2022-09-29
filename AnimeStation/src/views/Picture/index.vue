<script lang="ts" setup>
import { useIntersectionObserver } from "@vueuse/core";
import { DirectiveBinding, Ref, ref } from "vue";

/**
 * @问题 类型“ImportMeta”上不存在属性“globEager”
 * @解决方案
 *  在 tsconfig.json 中 添加
    "compilerOptions": {
        "types": ["vite/client"]
    }
 */
const files = import.meta.glob([
  "@picture/伊蕾娜/*.jpg",
  "@picture/伊蕾娜/*.png",
  "@picture/伊蕾娜/*.jpeg",
]);

const imgList: Ref<Array<any>> = ref([]);

/**
 * @description: Object.keys( obj ) 将obj中的key转换成数组 [key, key, ...]
 * @return {*}
 */
Object.keys(files).forEach((item: string) => {
  imgList.value.push({
    imgUrl: item,
    isShow: false,
  });
});

/**
 * @description: 修改父级元素宽高
 * @param {*} e
 * 获取当前时间触发的event
 * @return {*}
 */
const imgLoad = (e: Event) => {
  const el = e.currentTarget as HTMLElement;
  const elViewPort = el.getBoundingClientRect();
  const fatherElement: HTMLElement = el.parentElement as HTMLElement;
  fatherElement.style.height = elViewPort.height + "px";
};

/**
 * @description: 指令 当前div加载后 更改isShow的值
 * @return {*}
 */
const vImgLazyShow = {
  mounted(el: HTMLImageElement, binding: DirectiveBinding<any>) {
    const { stop } = useIntersectionObserver(
      el,
      ([{ isIntersecting }], observerElement) => {
        if (isIntersecting) {
          binding.value.isShow = true;
          stop();
        }
      }
    );
  },
};

/**
 * @description: 指令: 图片懒加载
 * @return {*}
 */
const vImgLazyLoad = {
  mounted(el: HTMLImageElement, binding: DirectiveBinding<any>) {
    const { stop } = useIntersectionObserver(
      el,
      async ([{ isIntersecting }], observerElement) => {
        if (isIntersecting) {
          el.src = binding.value;
          setTimeout(() => {}, 1000);
          stop();
        }
      }
    );
  },
};
</script>

<template>
  <div class="picture-wrapper img-content">
    <div
      class="imgItem-wrapper"
      v-for="(item, idx) in imgList"
      :key="idx"
      v-ImgLazyShow="item"
    >
      <transition name="image-show">
        <img
          v-img-lazy-load="item.imgUrl"
          @load="imgLoad($event)"
          v-if="item.isShow"
        />
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.image-show {
  &-enter-active,
  &-leave-active {
    transition: all 0.5s ease;
  }

  &-enter-active {
    transition-delay: 0.25s;
  }

  &-enter-from {
    transform: translateY(30%);
    opacity: 0;
  }
  &-leave-to {
    opacity: 0;
  }
}

.picture-wrapper {
  & {
    position: relative;
    width: 1100px;
    min-height: 80vh;
    margin: 0 auto;
    --image-width: 206px;
  }

  .imgItem-wrapper {
    & {
      position: absolute;
      width: var(--image-width);
      height: 100vh;
      margin-bottom: 20px;
      border-radius: var(--defalut-radius);
    }
    img {
      & {
        width: var(--image-width);
        border-radius: var(--defalut-radius);
        // height: 100%;
      }
    }
    .el-image {
      & {
        width: var(--image-width);
        border-radius: var(--defalut-radius);
        background-color: rgba(177, 167, 157, 0.815);
      }
    }
  }
}
</style>
