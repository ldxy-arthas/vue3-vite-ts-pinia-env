<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="Username">
            <el-input v-model="formInline.user" placeholder="用户名" />
        </el-form-item>
        <el-form-item label="Password">
            <el-input v-model="formInline.user" placeholder="密码" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">更新</el-button>
        </el-form-item>
    </el-form>
</template>
  
<script lang="ts" setup>
import { reactive } from 'vue'

const formInline = reactive({
    user: '',
    password: '',
})

const onSubmit = () => {
    console.log('submit!')
}
</script>
  
<style lang="scss"></style>