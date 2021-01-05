<template>
  <a-sub-menu
    v-if="menuItem.children && menuItem.children.length"
    :key="menuItem.path"
  >
    <template #title>
      <span>
        <Icon :icon="menuItem.meta.icon" />
        <span>{{ menuItem.meta.title }}</span>
      </span>
    </template>
    <MenuItem
      v-for="menu in menuItem.children"
      :key="menu.path"
      :menuItem="menu"
    />
  </a-sub-menu>
  <a-menu-item v-else :key="menuItem.path">
    <Icon :icon="menuItem.meta.icon" />
    <span>{{ menuItem.meta.title }}</span>
  </a-menu-item>
</template>

<script>
import Icon from "/@/components/Icon/index.vue";
export default {
  name: "MenuItem",
  components: {
    Icon,
  },
  props: {
    menuItem: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
