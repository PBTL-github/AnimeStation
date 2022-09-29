import { useIntersectionObserver } from "@vueuse/core";
import { DirectiveBinding } from "vue";

// 操作了dom，性能太拉
// const imgLazyLoad = {
//   mounted(el: HTMLElement, binding: DirectiveBinding<any>) {
//     const { stop } = useIntersectionObserver(
//       el,
//       async ([{ isIntersecting }], observerElement) => {
//         if (isIntersecting) {
//           const img: HTMLImageElement = document.createElement("img");
//           el.appendChild(img);
//           img.src = binding.value;
//           img.style.opacity = "0";
//           img.onload = () => {
//             const imgRect = img.getBoundingClientRect();
//             img.style.width = "206px";
//             el.style.height = (imgRect.height * 206) / imgRect.width + "px";
//             console.log(el.style.height);
//             img.style.opacity = "1";
//           };
//           //   console.log(el.getBoundingClientRect());
//           stop();
//         }
//       }
//     );
//   },
// };

export { imgLazyLoad };

const imgLazyLoad = {
  mounted(el: HTMLImageElement, binding: DirectiveBinding<any>) {
    const { stop } = useIntersectionObserver(
      el,
      async ([{ isIntersecting }], observerElement) => {
        if (isIntersecting) {
          //   binding.value = "1";
          el.src = binding.value;

          // el.onload = async () => {
          //   const elAll = el.getBoundingClientRect();
          //   console.log(el.parentElement!.style.height);
          //   el.parentElement!.style.height =
          //     (elAll.height * 206) / elAll.width + "px";
          //   el.style.height = "100%";
          // };
          console.log(111);
        }
      }
    );
  },
};
