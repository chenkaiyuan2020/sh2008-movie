<template>
    <div class="login">
        <el-container>
            <el-header>
                <img src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png" alt="">
            </el-header>
            <el-main>
                <!-- 表单 -->
                <el-form :rules="rules" :model="formData" ref="formData">
                    <el-form-item label="手机号" prop="mobile">
                        <el-input
                            placeholder="请输入手机号"
                            v-model="formData.mobile"
                            maxlength="11"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input
                            placeholder="请输入密码"
                            type="password"
                            v-model="formData.password"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="submitForm('formData')"
                            >登录</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import {userLogin} from "@/api/api";
export default {
    data() {
        return {
            formData: {
                mobile: "",
                password: "",
            },
            rules: {
                mobile: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur",
                    },
                    {
                        pattern: /^1[3-9]\d{9}$/,
                        message: "手机号格式不正确！",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur",
                    },
                    {
                        min: 6,
                        max: 20,
                        message: "长度在 6 到 20 个字符",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    // 进入的时候去掉底部导航
    created() {
        this.eventBus.$emit("footernav", false);
    },
    // 出来的时候显示底部导航
    beforeDestroy() {
        this.eventBus.$emit("footernav", true);
    },
    methods: {
        submitForm: function(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    // 获取用户名和密码进行提交（API）
                    let ret = await userLogin(this.formData);
                    if (ret.data.code == 1000) {
                        // 登录成功（存储token、跳转）
                        this.$store.commit("updateToken", ret.data.data._token);
                        if(this.$route.query.refer){
                            this.$router.push({path:this.$route.query.refer});
                        }else{
                            this.$router.push({ path: "/center" });
                        } 
                    } else {
                        // 登录失败
                        alert(ret.data.info);
                    }
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
*{
    padding: 0;
    margin: 0;
}
.login {
    margin: 80px auto 50px auto;
    .el-header{
        margin: 79px auto 40px;
    text-align: center;
    height: 60px;
    line-height: 60px;
    img{
        height: 60px;
    }
    }
    .el-container {
        width: 80%;
        margin-left: 40px;
        .el-header {
            font-size: 23px;
        }
    }
    .el-main{
        font-size: 15px;
        .el-form{
            width: 100%;
    position: relative;
    .el-form-item{
        margin-bottom:10px;
    }
    .el-input{
        height: 15px;
        line-height: 15px;
        padding: 20px 0;
        width: 100%;
        font-size: 15px;
        color: #191a1b;
        border: 0;
        outline-width: 0;
        margin-top: -25px;
    }
    .el-button{
        line-height: 45px;
        font-size: 16px;
        margin: 70px 25px 0;
        border-radius: 3px;
        text-align: center;
        background-color: #ff5f16;
        height: 45px;
        color: #fff;
        border: none;
        width: 80%;
        
    }
        }
    }
}
</style>