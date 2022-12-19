<template>
  <Breadcrumbs :crumbs="crumbs" />
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
import { Contact, Group, Membership } from ".prisma/client";

const props = defineProps<{
  group: Group & {
    contacts: Contact[];
    children: Group[];
    members: Membership[];
  };
}>();

const { error, requesting, send, data } = useRequest<
  Awaited<
    ReturnType<typeof import("~/server/api/groups/[id]/index.delete").default>
  >
>("/api/groups/" + useRoute().params.id, apiErrorHandler([]), {
  method: "delete",
  async onSuccess() {
    await navigateTo("/groepen/zoeken");
  },
});

const crumbs = computed(() => [
  {
    name: "Groepen",
    link: "/groepen/zoeken",
  },
  {
    name: props.group.name,
    link: `/groepen/${props.group.id}/overzicht`,
  },
  {
    name: "Instellingen",
    link: `/groepen/${props.group.id}/instellingen`,
  },
]);
</script>
