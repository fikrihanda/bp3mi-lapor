<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    location?: [
      'top' | 'bottom' | 'center',
      'center' | 'left' | 'right',
    ]
  }>(),
  {
    location: () => ['bottom', 'right'],
  },
)

const notif = useNotification()

const notifItems = computed(() => notif.notification?.value || [])
const overlayCheck = computed(() => Boolean(notifItems.value.length))
const classOverlay = computed(() => {
  return useCx(
    useCss({
      alignItems: (() => {
        switch (props.location[0]) {
          case 'center':
            return 'center'
          case 'top':
            return 'flex-start'
          case 'bottom':
            return 'flex-end'
          default:
            return 'center'
        }
      })(),
      justifyContent: (() => {
        switch (props.location[1]) {
          case 'center':
            return 'center'
          case 'left':
            return 'flex-start'
          case 'right':
            return 'flex-end'
          default:
            return 'center'
        }
      })(),
      zIndex: 2000,
      margin: 8,
      marginInlineEnd: 'calc(8px + var(--v-scrollbar-offset))',
    }),
  )
})
const classOverlayContent = computed(() => {
  return useCx(
    useCss({
      maxWidth: 672,
      minWidth: 344,
    }),
  )
})
</script>

<template>
  <VOverlay
    :model-value="overlayCheck"
    persistent
    no-click-animation
    :scrim="false"
    scroll-strategy="none"
    _disable-global-stack
    :class="classOverlay"
    :content-class="classOverlayContent"
  >
    <VSlideXTransition group>
      <LaporNotificationItem
        v-for="(n, i) in notifItems"
        :key="n.id"
        :title="n.title"
        :text="n.text"
        :type="n.type"
        :class="useCss({
          marginBottom: (() => {
            if ((i + 1) === notifItems.length) return 0
            else return 8
          })(),
        })"
        @close="notif.destroy(n)"
      />
    </VSlideXTransition>
  </VOverlay>
</template>
