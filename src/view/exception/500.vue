<template>
  <a-result status="500" title="500" sub-title="Sorry, the server is wrong.">
    <template #extra>
      <a-button type="primary" @click="toHome"> Back Home </a-button>
    </template>
  </a-result>
</template>
<script lang="ts">
import { useRouter } from "vue-router";
export default {
  name: "Exception500",
  setup() {
    const router = useRouter();

    const toHome = () => {
      router.push({ path: "/" });
    };

    return {
      toHome,
    };
  },
};
</script>
