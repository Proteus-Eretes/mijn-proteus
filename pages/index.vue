<template>
  <h1 class="text-4xl font-bold">ProThuis</h1>
  <p>
    Dit is de hoofdpagina waar later allemaal fancy dingen op te zien zijn. Voor
    nu moet je het alleen hier mee doen.
  </p>
  <p>Je bent op dit moment: {{ status }}</p>
  <p>{{ JSON.stringify(data) }}</p>
</template>

<script setup lang="ts">
const { status, data } = useSession();
</script>
