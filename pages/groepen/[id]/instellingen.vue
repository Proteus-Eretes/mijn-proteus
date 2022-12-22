<template>
  <div class="overflow-x-auto shadow">
    groep dingen hiero<br />
    <button
      class="btn btn-error btn-outline"
      :disabled="requesting"
      @click="send"
    >
      Groep Verwijderen
    </button>
  </div>
</template>

<script setup lang="ts">
import { Group } from "~/server/types";

defineProps<{
  group: Group;
}>();

const { requesting, send } = useRequest<
  Awaited<
    ReturnType<typeof import("~/server/api/groups/[id]/index.delete").default>
  >
>("/api/groups/" + useRoute().params.id, apiErrorHandler([]), {
  method: "delete",
  async onSuccess() {
    await navigateTo("/groepen");
  },
});
</script>
