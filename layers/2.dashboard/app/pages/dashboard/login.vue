<script setup lang="ts">
definePageMeta({
  layout: 'dashboard-noauth',
})
useHead({
  title: 'Dashboard - Login',
})

const { show: showNotification } = useNotification()

const refForm = useTemplateRef('ref-form-login')

const rules = useRules()
const authStore = useAuthStoreDashboard()

const showPass = ref(false)
const showOtp = ref(false)

const form = reactive({
  email: '',
  password: '',
})

async function onLogin() {
  const validate = await refForm.value?.validate()

  if (!validate?.valid)
    return

  try {
    const res = await $fetch('/api/dashboard/login', {
      method: 'POST',
      body: form,
    })

    if ('needOtp' in res) {
      if (res.needOtp) {
        showOtp.value = true
      }
    }

    if ('token' in res) {
      authStore.setToken(res.token)
      authStore.setInfo(res.info!)

      await navigateTo('/dashboard')
    }
  }
  catch (err: any) {
    showNotification({
      title: 'Error',
      text: err.statusText || err.message,
      type: 'error',
    })
  }
}
</script>

<template>
  <VForm
    ref="ref-form-login"
    class="dashboard-login-form"
    @submit.prevent="onLogin"
  >
    <h1
      :class="useCss({
        textAlign: 'center',
        margin: 0,
        marginBottom: 16,
      })"
    >
      Login
    </h1>
    <div
      :class="useCss({
        marginBottom: 32,
      })"
    >
      <VTextField
        v-model="form.email"
        label="Email"
        name="email"
        hide-details="auto"
        autocomplete="email"
        class="mb-4"
        :rules="[rules.required('Email harus di isi'), rules.email('Email harus berupa email')]"
      />
      <VTextField
        v-model="form.password"
        label="Password"
        hide-details="auto"
        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-closed'"
        :type="showPass ? 'text' : 'password'"
        name="current-password"
        class="mb-4"
        autocomplete="current-password"
        :rules="[rules.required('Password harus di isi')]"
        @click:append="showPass = !showPass"
      />
    </div>
    <div>
      <VBtn color="primary" type="submit" block>
        Login
      </VBtn>
    </div>
  </VForm>
</template>

<style lang="scss">
@use 'sass:map';
@use '~/assets/css/components.scss' as settings;

.dashboard-login-form {
  width: 100%;
  @media #{map.get(settings.$display-breakpoints, 'md-and-up')} {
    width: 80%;
  }
}
</style>
