<script setup>

defineProps({
    title: {
        type: String
    },
    toggle: {
        type: Boolean,
        default: false,
    },
    validButton: {
        type: String,
        default: 'bg-green-100'
    },
    invalidButton: {
        type: String,
        default: 'bg-gray-200'
    },
    onClick: {
        type: Function,
        default: null,
    }
})
</script>

<template>
    <button :class="`w-[75%] min-h-[60px] rounded-md mt-5 ${!toggle ? invalidButton : validButton}`" @click="onClick"
        :disabled="!toggle">{{ title }}</button>
</template>