<template>
  <a-result
    status="404"
    title="404"
    sub-title="Sorry, the page you visited does not exist."
  >
    <template #extra>
      <a-button type="primary" @click="toHome"> Back Home </a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
export default {
  name: "Exception404",
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
