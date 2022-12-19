<template>
  <Breadcrumbs :crumbs="crumbs" />
  <div class="overflow-x-auto shadow">Studiebeheersysteem hiero</div>
</template>

<script setup lang="ts">
import { Contact, Member, Membership, MemberStudy } from ".prisma/client";

const props = defineProps<{
  member: Member & {
    contacts: Contact[];
    studies: MemberStudy[];
    memberships: Membership[];
  };
}>();

const crumbs = computed(() => [
  {
    name: "Leden",
    link: "/leden/zoeken",
  },
  {
    name: `${props.member.firstName} ${props.member.insertion} ${props.member.lastName}`,
    link: `/leden/${props.member.id}/profiel`,
  },
  {
    name: "Studies",
    link: `/leden/${props.member.id}/studies`,
  },
]);
</script>
