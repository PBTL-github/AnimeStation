<script lang="ts" setup>
import { reactive, ref, Ref } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";

const route = useRoute();

const navBarItem = reactive([
  {
    id: "0",
    iconType: "HomeFilled",
    title: "首页",
    path: "/",
  },
  {
    id: "1",
    iconType: "Promotion",
    title: "搜索",
    path: "/search",
  },
  {
    id: "2",
    iconType: "Avatar",
    title: "关于我",
    path: "/about",
  },
  {
    id: "3",
    iconType: "PictureFilled",
    title: "图库",
    path: "/picture",
  },
  {
    id: "4",
    iconType: "Tools",
    title: "设置",
    path: "/setting",
  },
]);

const transformY: Ref<string> = ref(
  "translateY(calc(" + route.meta.id + " * (100% + 15px)))"
);

router.afterEach(() => {
  transformY.value = "translateY(calc(" + route.meta.id + " * (100% + 15px)))";
});

const routerPush = (path: string) => {
  router.push(path);
};

// 控制菜单是否弹出
const isArrow: Ref<boolean> = ref(true);
</script>

<template>
  <div
    class="navbar-wrapper"
    :style="{
      width: isArrow ? '306px' : '60px',
    }"
  >
    <Transition name="navbar-show">
      <div class="navbar-wrapper-card" v-if="isArrow">
        <ul>
          <li
            class="bg-active"
            :style="{
              transform: transformY,
            }"
          ></li>
          <li
            v-for="item in navBarItem"
            :key="item.id"
            :style="{
              color:
                $route.meta.id == item.id
                  ? 'white'
                  : 'var(--general-font-color)',
            }"
          >
            <el-icon class="icon" @click="routerPush(item.path)"
              ><component :is="item.iconType"
            /></el-icon>
            <span class="title" @click="routerPush(item.path)">{{
              item.title
            }}</span>
          </li>
        </ul>
      </div>
    </Transition>
    <div class="navbar-wrapper-toggle" @click="isArrow = !isArrow">
      <el-icon
        ><component :is="isArrow ? 'ArrowLeftBold' : 'ArrowRightBold'"
      /></el-icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar-show {
  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease;
  }

  &-enter-active {
    transition-delay: 0.25s;
  }

  &-enter-from,
  &-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }
}

.navbar {
  &-wrapper {
    & {
      height: calc(100% - 80px);
      margin-right: 40px;
      background-color: var(--navbar-color);
      border-radius: var(--defalut-radius);
      position: relative;
      padding-left: 20px;
      color: var(--general-font-color);
      transform: translateX(-20px);
      transition: 0.65s;

      --li-icon-font-size: 24px;
    }

    &-card {
      & {
        margin-top: 150px;
        border-radius: var(--defalut-radius);
      }

      ul {
        & {
          width: 100%;
          box-sizing: border-box;
          list-style: none;
          box-sizing: border-box;
        }
        .bg-active {
          & {
            position: absolute;
            padding: 26px;
            width: 20%;
            min-width: 70px;
            border-radius: 0 18px 18px 0;
            background-color: rgb(75, 202, 190);
            transition: 0.3s ease;
          }
        }

        li {
          & {
            display: flex;
            flex-direction: row;
            align-items: center;
            line-height: calc(var(--li-icon-font-size) * 2);
            padding: 0 26px;
            margin-bottom: 20px;
            transition: 0.3s ease-in-out;
          }
          .icon {
            font-size: var(--li-icon-font-size);
            font-style: normal;
            margin-right: 40px;
            cursor: pointer;
          }
          .title {
            font-size: var(--li-icon-font-size);
            cursor: pointer;
          }
        }
      }
    }

    &-toggle {
      & {
        position: absolute;
        box-sizing: border-box;
        width: 52px;
        height: 52px;
        background-color: var(--navbar-color);
        border: solid 3px var(--general-font-color);
        top: calc(50% - 26px);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        right: -26px;
        cursor: pointer;
      }

      &:hover {
        border: solid 3px white;
        color: white;
      }
    }
  }
}
</style>
