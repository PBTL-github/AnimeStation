<script lang="ts" setup>
import { useIntersectionObserver } from "@vueuse/core";
import { DirectiveBinding, Ref, ref, unref, watch } from "vue";
import { ImageList, WaterFull } from "./index";

const waterFull: WaterFull = new WaterFull();
const imgIndex: Ref<number> = ref(0);
const imgElCells: Ref<Array<HTMLElement>> = ref([]);
const InterceptHeight: Ref<number> = ref(0);
const imgList: Ref<Array<ImageList>> = ref([]);

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

/**
 * @description: Object.keys( obj ) 将obj中的key转换成数组 [key, key, ...]
 * @return {*}
 */
Object.keys(files).forEach((item: string) => {
  imgList.value.push({
    imgIndex: imgIndex.value++,
    imgUrl: item,
    isShow: false,
  });
});

/**
 * @description: 指令 当前div加载后 更改isShow的值
 * @return {*}
 */
const vImgLazyShow = {
  mounted(el: HTMLDivElement, binding: DirectiveBinding<ImageList>) {
    console.log("v-for");
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        binding.value.isShow = true;
        stop();
      }
    });
  },
};

/**
 * @description: 指令: 图片懒加载
 * @return {*}
 */
const vImgLazyLoad = {
  mounted(el: HTMLImageElement, binding: DirectiveBinding<ImageList>) {
    const fatherElement: HTMLElement = el.parentElement as HTMLElement;
    const { stop } = useIntersectionObserver(el, async ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        el.src = binding.value.imgUrl;
        el.onload = () => {
          fatherElement.style.height = el.offsetHeight + "px";
          fatherElement.style.position = "absolute";
          imgElCells.value.push(el.parentElement);
          waterFull.initWaterFull(unref(imgElCells));
          InterceptHeight.value = waterFull.getMinHeight();
        };
        stop();
      }
    });
  },
};

/**
 * @description: 自定义指令 初始化设置瀑布流布局容器
 * @function: onReSize
 * @return {*}
 */
const vResetContainer = {
  mounted(el: HTMLElement) {
    waterFull.resetContainer(el);
    let width = el.clientWidth;
    let height = el.clientHeight;
    const elSetInterval = setInterval(onReSize, 500);
    /**
     * @description: 元素宽高发生改变时从新布局
     * @return {*}
     */
    function onReSize(): void {
      const curWidth = el.clientWidth;
      const curHeight = el.clientHeight;
      if (curWidth != width || curHeight != height) {
        console.log("onResize");
        waterFull.initWaterFull(unref(imgElCells));
        InterceptHeight.value = waterFull.getMinHeight();
      }
      width = curWidth;
      height = curHeight;
    }
  },
};
</script>

<template>
  <div class="picture-wrapper img-content" v-reset-container @reset="">
    <div class="intercept" :style="{ height: InterceptHeight + 'px' }" />
    <div class="imgItem-wrapper" v-for="(item, idx) in imgList" :key="idx" v-ImgLazyShow="item">
      <transition name="image-show">
        <img v-img-lazy-load="item" v-if="item.isShow" />
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
    transition-delay: 0.75s;
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
    width: 90%;
    min-width: 1100px;
    min-height: 80vh;
    margin: 0 auto;
    overflow: hidden;
    --image-width: 206px;
  }
  .intercept {
    & {
      position: relative;
      width: 100%;
    }
  }

  .imgItem-wrapper {
    & {
      position: relative;
      width: var(--image-width);
      height: 100vh;
      margin-bottom: 15px;
      border-radius: var(--defalut-radius);
      transition: all 0.45s ease;
    }

    img {
      & {
        width: var(--image-width);
        border-radius: var(--defalut-radius);
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
