<template>
  <Breadcrumbs :crumbs="groupCrumbs(group).value" />
  <NuxtPage :group="group" />
</template>

<script lang="ts" setup>
import { Group } from "~/server/types";

const { groupCrumbs } = useBreadcrumbs();

const { data: group } = await useFetch<Group>(
  "/api/groups/" + useRoute().params.id,
);
</script>
