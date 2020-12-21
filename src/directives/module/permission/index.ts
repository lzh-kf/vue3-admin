import store from "@/store";

interface Binding {
  name: string;
  value: string;
  oldValue: unknown;
}

interface El {
  [key: string]: unknown;
  style: {
    [key: string]: unknown;
  };
}
export default {
  name: "permission",
  value: {
    inserted: function (el: El, Binding: Binding): void {
      setTimeout(() => {
        if (!store.state.permissions.includes(Binding.value)) {
          if (el.style) {
            el.style.display = "none";
          }
        }
      });
    }
  }
};
