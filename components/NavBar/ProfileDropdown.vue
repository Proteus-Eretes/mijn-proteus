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
        <NuxtLink
          :to="`/leden/${data?.user?.proteusId}/profiel`"
          title="Mijn Profiel"
          >Profiel
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          :to="`/leden/${data?.user?.proteusId}/groepen`"
          title="Lidmaatschappen"
          >Lidmaatschappen
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          :to="`/leden/${data?.user?.proteusId}/instellingen`"
          title="Instellingen"
          >Instellingen
        </NuxtLink>
      </li>
      <li><a @click.prevent="() => signOut()">Log uit</a></li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const { data, signOut } = useSession();
</script>
