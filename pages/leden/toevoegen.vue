<template>
  <Breadcrumbs :crumbs="breadCrumbs" />
  <div class="overflow-x-auto shadow p-5">
    <form @submit.prevent="send">
      <InputText
        v-model="initials"
        type="text"
        title="Initialen"
        placeholder="A.B.C."
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="firstName"
        type="text"
        title="Voornaam"
        placeholder="Jan"
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="insertion"
        type="text"
        title="Tussenvoegsel"
        placeholder="van"
        :disabled="requesting"
        bordered
      />
      <InputText
        v-model="lastName"
        type="text"
        title="Achternaam"
        placeholder="Jansen"
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="dateOfBirth"
        type="date"
        title="Geboortedatum"
        :disabled="requesting"
        bordered
      />
      <InputSelect
        v-model="sex"
        title="Geslacht"
        :disabled="requesting"
        bordered
      >
        <option selected disabled value="">-- Selecteer --</option>
        <option value="MALE">Man</option>
        <option value="FEMALE">Vrouw</option>
      </InputSelect>
      <InputText
        v-model="street"
        type="text"
        title="Straat"
        placeholder="Rotterdamseweg"
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="number"
        type="text"
        title="Huisnummer"
        placeholder="362a"
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="zipcode"
        type="text"
        title="Postcode"
        placeholder="2628AT"
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="city"
        type="text"
        title="Plaats"
        placeholder="Delft"
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="country"
        type="text"
        title="Land"
        placeholder="Nederland"
        :disabled="requesting"
        required
        bordered
        class="mb-4"
      />
      <Button
        type="submit"
        title="Voeg persoon toe"
        color="primary"
        :loading="requesting"
      >
        Toevoegen
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
const { breadCrumbs } = useBreadcrumbs();

const initials = ref<string>("");
const firstName = ref<string>("");
const insertion = ref<string>("");
const lastName = ref<string>("");
const dateOfBirth = ref<string>("");
const sex = ref<"MALE" | "FEMALE" | "">("");
const street = ref<string>("");
const number = ref<string>("");
const city = ref<string>("");
const zipcode = ref<string>("");
const country = ref<string>("");

const { requesting, send, data } = useRequest<
  Awaited<ReturnType<typeof import("~~/server/api/members/index.post").default>>
>("/api/members", apiErrorHandler([]), {
  method: "post",
  body: {
    initials,
    firstName,
    insertion,
    lastName,
    dateOfBirth,
    sex,
    street,
    number,
    city,
    zipcode,
    country,
  },
  async onSuccess() {
    await navigateTo(`/members/${data.value?.id}/profiel`);
  },
});
</script>
