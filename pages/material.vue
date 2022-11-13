<template>
  <TwoColumn title="Materiaal">
    <template #content>
      <ul class="menu rounded-box">
        <li class="menu-title">
          <span>Category</span>
        </li>
        <li><NuxtLink to="/material">Materiaal Home</NuxtLink></li>
        <li class="menu-title">
          <span>Category</span>
        </li>
        <li><NuxtLink to="/material/types">Materiaaltypes</NuxtLink></li>
      </ul>
    </template>
    <NuxtPage />
  </TwoColumn>
</template>
