<template>
  <div
    class="container h-screen flex flex-col items-center mx-auto max-lg:pt-2"
  >
    <NavBar />
    <slot />
    <span class="block w-full min-h-16 mt-2 lg:hidden"></span>
  </div>
</template>
