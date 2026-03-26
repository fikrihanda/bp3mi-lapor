<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    text?: string
    type?: 'error' | 'success' | 'warning' | 'info'
    timer?: string | number
  }>(),
  {
    title: '',
    text: '',
    type: 'info',
    timer: 5000,
  },
)

const emits = defineEmits<{
  (e: 'close'): void
}>()
const model = ref(false)

let activeTimeout = -1

const timer = computed(() => parseNumber(props.timer))

function clearTimeout() {
  window.clearTimeout(activeTimeout)
}
function startTimeout() {
  window.clearTimeout(activeTimeout)
  const timeout = timer.value

  if (!model.value || timeout === -1)
    return

  activeTimeout = window.setTimeout(() => {
    model.value = false
  }, timeout)
}

function onPointerenter() {
  clearTimeout()
}
function onPointerleave() {
  startTimeout()
}

watch(model, (val) => {
  if (!val)
    emits('close')
  else
    startTimeout()
})

onMounted(() => model.value = true)
</script>

<template>
  <VAlert
    v-model="model"
    :class="useCss({
      padding: '14px 16px',
    })"
    :type="type"
    :title="title"
    :text="text"
    closable
    v-bind="{
      onPointerenter,
      onPointerleave,
    }"
    @click:close="emits('close')"
  />
</template>
