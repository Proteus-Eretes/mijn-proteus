<template>
  <div class="dropdown dropdown-end max-lg:dropdown-top">
    <label
      tabindex="0"
      class="btn btn-ghost btn-circle avatar"
      :title="data?.user?.name || undefined"
    >
      <div class="w-10 rounded-full">
        <img src="https://placeimg.com/80/80/people" alt="" />
      </div>
    </label>
    <ul
      tabindex="0"
      class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
    >
      <li>
        <!-- TODO: change link to logged in member's profile -->
        <NuxtLink to="/leden" title="Mijn Profiel">Profiel</NuxtLink>
      </li>
      <li>
        <!-- TODO: change link to logged in member's memberships -->
        <NuxtLink to="/groepen" title="Lidmaatschappen"
          >Lidmaatschappen
        </NuxtLink>
      </li>
      <li>
        <!-- TODO: change link to logged in member's settings -->
        <NuxtLink to="/leden" title="Instellingen">Instellingen</NuxtLink>
      </li>
      <li><a @click.prevent="() => signOut()">Log uit</a></li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const { data, signOut } = useSession();
</script>
