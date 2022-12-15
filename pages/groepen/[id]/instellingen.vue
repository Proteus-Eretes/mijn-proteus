<template>
  <h1 class="text-4xl text-primary font-bold mb-4">
    {{ group.name }}
    <Icon name="ic:chevron-right" />
    Instellingen
  </h1>
  <div class="overflow-x-auto shadow">
    groep dingen hiero<br />
    <button class="btn btn-error btn-outline" @click="deleteGroup">
      Groep Verwijderen
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  group: unknown;
}>();

const deleteGroup = async () => {
  await $fetch("/api/groups/" + useRoute().params.id, {
    method: "DELETE",
  });
  await navigateTo("/groepen/zoeken");
};
</script>
