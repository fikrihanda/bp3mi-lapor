<script setup lang="ts">
const appConfig = useAppConfig()

const notification = ref<Notif[]>([])

provide(appConfig.notification, notification)
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
    <LaporNotificationContainer />
  </NuxtLayout>
</template>
