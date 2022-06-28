<template>
<h1>ようこそ</h1>
<router-link to="/page16">page16</router-link>
<button @click="router.push('page01')">Redirect</button>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
