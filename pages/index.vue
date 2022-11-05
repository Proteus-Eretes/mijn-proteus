<template>
  <div>
    <h2>Home</h2>
    <div class="grid lg:grid-cols-2 gap-8">
      <div
        v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]"
        :key="i"
        class="card lg:card-side bg-primary text-primary-content shadow-xl"
      >
        <figure class="w-2/5">
          <img src="https://placeimg.com/400/400/arch" alt="Album" />
        </figure>
        <div class="card-body w-3/5">
          <h2 class="card-title">{{ card.title }}</h2>
          <p>{{ card.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const card = {
  title: "Voorbeschouwing Novembervieren",
  content: `4 november staat ook wel bekend als de mooiste dag van het jaar.
          Daarom dacht de hoop: laten we een wedstrijd van 4 kilometer op 4
          november organiseren die je alleen in 4+en of 4*en kan roeien. Dat is
          een mooi idee, behalve dat 4 november op een vrijdag valt dit jaar.
          Daarom moeten we het doen met 6 november.`,
};
</script>
