<template>
    <div class="login">
        <div class="logo">
            <img src="@/assets/img/com/logo.png" alt="">
        </div>
        <van-form
                :show-error="false"
                :show-error-message="false"
                class="mt20"
                validate-first
                ref="form"
                @failed="onToastErr"
                @submit="onSubmit">
            <van-field
                    v-model="username"
                    name="name"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
            />

            <van-field
                    v-model="code"
                    type="digit"
                    name="code"
                    label="密码"
                    maxlength="6"
                    placeholder="密码"
                    :rules="[
                        { required: true, message: '请填写密码' },
                        { pattern, message: '请输入6位数密码' }
                    ]">
                <template #button>
                    <van-count-down
                            v-if="time > 0"
                            :time="time"
                            :format="'ss ' + s"
                            @finish="time = 0"/>
                    <span v-else @click="sendCode">发送验证码</span>
                </template>
            </van-field>
        </van-form>

        <van-button round block type="info" class="mt20" text="登录" @click="$refs.form.submit()"/>

        <van-row type="flex" justify="space-between" class="mt20">
            <van-col span="12" @click="$goNext('/login/register')">
                去注册
            </van-col>
            <van-col span="12" class="tr">
               去注册
            </van-col>
        </van-row>
    </div>
</template>

<script>
    import { Form, Field, Button, CountDown, Col, Row } from 'vant'
    import { mapMutations } from 'vuex'

    export default {
        name: "login",
        components: {
            [Form.name]: Form,
            [Field.name]: Field,
            [Button.name]: Button,
            [CountDown .name]: CountDown,
            [Col .name]: Col,
            [Row .name]: Row,
        },
        data() {
            return {
                username: '',
                code: '',
                time: 0,
                pattern: /\d{6}/,
                s: '秒',
            }
        },
        methods: {
            ...mapMutations({
                setToken: 'SET_TOKEN',
                setUserInfo: 'SET_USER_INFO'
            }),

            sendCode() {
                this.$refs.form.validate('name').then(() => {
                    this.$toast.loading('Loading...');
                    let params = {
                        name: this.username
                    };
                    this.$http.post('/mobile/card/sendcode', params).then(res => {
                        this.time = 190 * 1000;
                        this.$toast.success('发送成功');
                    })
                }).catch(err => {
                    this.$toast(err.message);
                });
            },

            onToastErr(e) {
                this.$toast(e.errors[0].message);
            },

            async onSubmit(params) {
                try {
                    let { token, user } = await this.$http.post('/mobile/card/logincode', params);
                    this.setToken(token);
                    this.setUserInfo(user);
                    this.replaceNext('/home');
                } catch (e) {
                    this.$refs.from.resetValidation('code');
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .login {
        padding: 20px 16px;
    }

    .logo {
        height: 100px;
        text-align: center;

        img {
            height: 100%;
            width: auto;
        }
    }
</style>
