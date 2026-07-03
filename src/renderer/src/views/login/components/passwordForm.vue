<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="0" size="large">
    <el-form-item prop="username">
      <el-input
        v-model="ruleForm.username"
        prefix-icon="user"
        clearable
        :placeholder="$t('login.userPlaceholder')"
      ></el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input
        v-model="ruleForm.password"
        prefix-icon="lock"
        clearable
        show-password
        :placeholder="$t('login.PWPlaceholder')"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <div class="box-code">
        <el-input
          v-model="ruleForm.captcha"
          prefix-icon="CircleCheck"
          clearable
          :placeholder="$t('login.captchaPlaceholder')"
        ></el-input>
        <el-image class="code" :src="captchaUrl" @click="getCaptcha"></el-image>
      </div>
    </el-form-item>

    <div class="remember">
      <div>
        <el-checkbox :label="$t('login.rememberMe')"></el-checkbox>
      </div>
      <div>
        <router-link to="">{{ $t('login.forgetPassword') }}</router-link>
      </div>
    </div>

    <el-form-item>
      <el-button
        type="primary"
        round
        style="width: 100%"
        :loading="isLogin"
        @click="login(ruleFormRef)"
        >{{ $t('login.signIn') }}</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref, onBeforeMount } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { captchaImage, loginByJson } from '@api/login'
import { Encrypt } from '@utils/aes'
import { UserRuleForm } from '@interface/login'

const captchaUrl = ref<string>('')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<UserRuleForm>({
  username: '',
  password: '',
  key: '',
  captcha: ''
})

const rules = reactive<FormRules<UserRuleForm>>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})
const isLogin = ref<boolean>(false)

//验证码
const getCaptcha = async () => {
  const key: string = new Date().getTime().toString()
  ruleForm.key = key
  const res = await captchaImage({ key })
  const blob = new Blob([res], { type: 'image/png' })
  const imgUrl = URL.createObjectURL(blob)
  captchaUrl.value = imgUrl
}

//生命周期
onBeforeMount(() => {
  getCaptcha()
})

//登录
const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      isLogin.value = true
      const res = await loginByJson({
        username: Encrypt(ruleForm.username),
        password: Encrypt(ruleForm.password),
        key: ruleForm.key,
        captcha: ruleForm.captcha
      })
      if (res.code != '200') {
        ElMessage.error(res.msg)
        return
      }
    } else {
      ElMessage.warning('请填写正确内容')
    }
  })
}
</script>

<style scoped>
.box-code {
  display: flex;
  align-items: center;
  width: 100%;
}
.code {
  margin-left: 10px;
  width: 100px;
  height: 40px;
  cursor: pointer;
}
.remember {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
}
</style>
