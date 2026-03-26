<script setup lang="ts">
const display = useDisplay()

const smAndUp = computed(() => display.mdAndUp.value)
</script>

<template>
  <VApp>
    <VMain>
      <VRow :gap="[0, 0]">
        <VCol v-if="smAndUp" md="6" lg="7">
          <div
            :class="useCx(
              useCss({
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }),
              'dashboard-noauth-left',
            )"
          >
            <div>
              <h1
                :class="useCss({
                  color: 'white',
                  textAlign: 'center',
                  margin: 0,
                  marginBottom: 16,
                })"
              >
                Welcome !
              </h1>
              <p
                :class="useCss({
                  color: 'rgba(255, 255, 255, 0.5)',
                  margin: 0,
                })"
              >
                Selamat datang di Admin Pelaporan
              </p>
            </div>
          </div>
        </VCol>
        <VCol cols="12" md="6" lg="5">
          <div
            :class="useCss({
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 16,
              paddingRight: 16,
            })"
          >
            <slot />
          </div>
        </VCol>
      </VRow>
    </VMain>
  </VApp>
</template>

<style lang="scss">
.dashboard-noauth-left {
  background-color: rgb(var(--v-theme-primary));
}
</style>
