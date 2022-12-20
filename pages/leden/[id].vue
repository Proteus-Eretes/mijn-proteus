<template>
  <Breadcrumbs :crumbs="memberCrumbs(member).value" />
  <NuxtPage :member="member" />
</template>

<script lang="ts" setup>
import { Member } from "~/server/types";

const { memberCrumbs } = useBreadcrumbs();

const { data: member } = await useFetch<Member>(
  "/api/members/" + useRoute().params.id,
);
</script>
