import store from "@/store";

interface Binding {
  value: string;
  oldValue: unknown;
}

interface El {
  [key: string]: unknown;
  style: {
    [key: string]: unknown;
  };
}
Element
export default {
  name: "permission",
  value: {
    mounted(el: El, binding: Binding) {
      if (!store.state.permissions.includes(binding.value)) {
        if (el.style) {
          el.style.display = "none";
        }
      }
    }
  }
};
