<template>
  <a-menu
    theme="dark"
    v-model:selectedKeys="selectedKeys"
    @click="handleSelectMenu"
    mode="inline"
  >
    <MenuItem v-for="menu in menus" :key="menu.name" :menuItem="menu" />
  </a-menu>
</template>

<script lang="ts">
import { ref, onBeforeMount, watch } from "vue";
import MenuItem from "./MenuItem.vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
export default {
  components: {
    MenuItem,
  },
  props: {
    menus: {
      type: Array,
      default: [],
    },
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const selectedKeys = ref<Array<string | number>>([]);

    onBeforeRouteUpdate((to) => {
      const pathName = to.path.split("/").pop();
      selectedKeys.value = [pathName];
    });

    onBeforeMount(() => {
      selectedKeys.value = [route.path.slice(1)];
    });

    const handleSelectMenu = ({ item, key, keyPath }) => {
      router.push({ path: "/" + keyPath.reverse().join("/") });
    };

    return {
      selectedKeys,
      handleSelectMenu,
    };
  },
};
</script>
