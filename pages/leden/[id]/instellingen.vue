<template>
  <h1 class="text-4xl text-primary font-bold mb-4">
    {{ member.firstName }} {{ member.insertion }} {{ member.lastName }}
    <Icon name="ic:chevron-right" />
    Instellingen
  </h1>
  <div class="overflow-x-auto shadow">toevoegen hiero</div>
</template>

<script setup lang="ts">
import { Contact, Member, Membership, MemberStudy } from ".prisma/client";

defineProps<{
  member: Member & {
    contacts: Contact[];
    studies: MemberStudy[];
    memberships: Membership[];
  };
}>();
</script>
