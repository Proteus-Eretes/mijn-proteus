<template>
  <h1 class="text-4xl text-primary font-bold mb-4">
    {{ member.firstName }} {{ member.insertion }} {{ member.lastName }}
    <Icon name="ic:chevron-right" />
    Gegevens Bewerken
  </h1>
  <div class="overflow-x-auto shadow p-5">
    <form @submit.prevent="send">
      <Alert type="error" :content="error?.global" />
      <InputText
        v-model="initials"
        title="Initialen"
        placeholder="A.B.C."
        :error="error?.name"
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="firstName"
        title="Voornaam"
        placeholder="Jan"
        :error="error?.name"
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="insertion"
        title="Tussenvoegsel"
        placeholder="van"
        :error="error?.name"
        :disabled="requesting"
        bordered
      />
      <InputText
        v-model="lastName"
        title="Achternaam"
        placeholder="Jansen"
        :error="error?.name"
        :disabled="requesting"
        required
        bordered
      />
      <InputDate
        v-model="dateOfBirth"
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
        <option value="MALE">Man</option>
        <option value="FEMALE">Vrouw</option>
      </InputSelect>
      <InputText
        v-model="street"
        title="Straat"
        placeholder="Rotterdamseweg"
        :error="error?.name"
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="number"
        title="Huisnummer"
        placeholder="362a"
        :error="error?.name"
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="zipcode"
        title="Postcode"
        placeholder="2628AT"
        :error="error?.name"
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="city"
        title="Plaats"
        placeholder="Delft"
        :error="error?.name"
        :disabled="requesting"
        required
        bordered
      />
      <InputText
        v-model="country"
        title="Land"
        placeholder="Nederland"
        :error="error?.name"
        :disabled="requesting"
        required
        bordered
        class="mb-4"
      />
      <Button
        type="submit"
        title="Gegevens Opslaan"
        color="primary"
        :loading="requesting"
      >
        Opslaan
      </Button>
    </form>
  </div>
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

const initials = ref<string>(props.member.initials);
const firstName = ref<string>(props.member.firstName);
const insertion = ref<string>(props.member.insertion);
const lastName = ref<string>(props.member.lastName);
const dateOfBirth = ref<string>(
  // According to prisma dateOfBirth is a Date, but in reality it is an ISO string
  (props.member.dateOfBirth as unknown as string).slice(0, 10),
);
const sex = ref<"MALE" | "FEMALE" | "">(props.member.sex);
const street = ref<string>(props.member.street);
const number = ref<string>(props.member.number);
const city = ref<string>(props.member.city);
const zipcode = ref<string>(props.member.zipcode);
const country = ref<string>(props.member.country);

const { error, requesting, send, data } = useRequest<
  Awaited<
    ReturnType<typeof import("~~/server/api/members/[id]/index.patch").default>
  >
>(`/api/members/${useRoute().params.id}`, apiErrorHandler([]), {
  method: "patch",
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
