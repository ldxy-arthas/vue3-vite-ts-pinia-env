<template>
    <div>
        <div>
            <el-card class="login">
                <el-image src='src\assets\logo.png' alt="logo" width="40%" />

                <el-input :prefix-icon="User" v-model="username" placeholder="用户名" size="large" clearable />
                <br>
                <br>
                br
                <form>
                    <el-input :prefix-icon="Promotion" v-model="password" placeholder="密码" size="large" clearable
                        show-password />
                </form>
                <el-button :disabled="is" class="btn" @click="login()">登录</el-button>

            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { User, Promotion } from '@element-plus/icons-vue'
import { ref, onMounted, onBeforeUnmount } from "vue"
import { useRouter } from "vue-router";
import { userLogin } from "../../api/user/user"
import { ElNotification } from 'element-plus'
import { h } from 'vue'
import { userStore } from "../../store/User"
// import { test } from "../../api/demo/test"

// 监听回车事件
const onKeyUp = (e: any) => {
    // console.log(e);
    if (e.key === "Enter") {
        onMounted(e);
        // 点击回车后执行登录按钮
        login();
    }
}

onMounted(() => {
    // 页面加载之前添加键盘监听
    document.addEventListener("keyup", onKeyUp);
});

// 页面卸载之前移除键盘监听
onBeforeUnmount(() => {
    document.removeEventListener("keyup", onKeyUp);
});

const router = useRouter();

// 用户输入信息
const username = ref('')
const password = ref('')
const is = ref<Boolean>(false)

// 处理用户登录逻辑
const login = () => {

    let isUsername = ref<Boolean>(false)
    let isPassword = ref<Boolean>(false)

    // console.log(username.value + " " + password.value)
    // 数据校验
    if (isNumberOrzim(username.value)) {
        console.log("用户名前端校验通过");
        isUsername.value = true
    } else {
        ElNotification({
            showClose: true,
            title: '信息校验失败',
            message: h('i', { style: 'color: red' }, '用户名格式有误,只能为数字和字母'),
        })
    }
    if (validatePassword(password.value)) {
        console.log("密码前端校验通过");
        isPassword.value = true
    } else {
        ElNotification({
            showClose: true,
            title: '信息校验失败',
            message: h('i', { style: 'color: red' }, '用户密码长度不小于6位'),
        })
    }

    // test 测试请求
    // test().then((res: any) => {
    //     console.log(res);
    // })

    if (
        isUsername.value === true
        &&
        isPassword.value === true
    ) {
        // 发送登录请求
        userLogin({
            username: username.value,
            password: password.value
        })
            .then((res: any) => {
                if (res.code == 8291) {
                    // console.log("res: " + JSON.stringify(res));
                    // 登录成功
                    localStorage.setItem("token", res.data.token)
                    // userStore
                    router.push("/index")
                } else {
                    let info = ''
                    if (res.code == 8293) {
                        info = "用户密码错误，请重新输入！"
                    } else {
                        info = '服务器响应异常，请稍后再试！'
                    }
                    // 提示
                    ElNotification({
                        showClose: true,
                        title: "登录失败",
                        message: h('i', { style: 'color: red' }, info),
                    })
                }
            })
            .catch((err: any) => {
                console.log("err: " + err);
                ElNotification({
                    showClose: true,
                    title: "登录失败",
                    message: h('i', { style: 'color: red' }, '服务器响应失败，请稍后再试！'),
                })
            })
    }
}

//密码长度不小于8位
const validatePassword = (value: string) => {
    if (value.length < 6) {
        return false
    } else {
        return true
    }
}

const isNumberOrzim = (value: string) => {
    let number = /^[\da-z]+$/i
    if (!number.test(value)) {
        return false
    } else {
        return true
    }
}

</script>
  
<style lang="scss" scoped>
* {
    user-select: none;
    /* 无法选中，整体感更强 */
}

.btn {
    background-color: #59c2c5;
    width: 38%;
    height: 48px;
    border-radius: 8px;
    margin-left: 10px;
    margin-top: 190px;
    font-size: 23px;
    font-weight: 600;
    color: white;
}

.btn:hover {
    background-color: #59c2a0;
}

.login {
    position: absolute;
    top: 50%;
    margin-top: -200px;
    left: 50%;
    margin-left: -200px;
    /* absolute居中的一种方法 */
    background-color: whitesmoke;
    width: 400px;
    height: 380px;
    border-radius: 25px;
    text-align: center;
    padding: 20px 0;
    box-sizing: border-box;
    /* 这样padding就不会影响大小 */
}

.el-input {
    background-color: transparent;
    height: 40px;
    width: 300px;
    margin-top: 114px;
    margin-left: -139px;
}

.el-image {
    width: 230px;
    height: 110px;
    margin-left: -107px;
}

div {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/wallpaper.jpg);
    background-size: cover;
    background-attachment: fixed;
}
</style>
