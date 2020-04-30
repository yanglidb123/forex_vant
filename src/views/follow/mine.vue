<template>
    <div class="mine">
        <Header title="我的跟单"/>
        <div class="body">
            <div class="h78 px16 f-sb fill-bg">
                <div class="">
                    <p class="f21 fc-btn">12%</p>
                    <p class="f12 fc3 mt05">跟单利润分成</p>
                </div>
                <div class="tr">
                    <p class="f21 fc-btn">12%</p>
                    <p class="f12 fc3 mt05">跟单利润分成</p>
                </div>
            </div>
            <van-tabs
                    v-model="activeName"
                    animated
                    sticky
                    class="mt12"
                    color="#ECB816"
                    background="#12171D"
                    line-width="20"
                    offset-top="46"
                    :border="false"
                    title-active-color="#fff"
                    title-inactive-color="#5A6876"
                    @click="tabsClick">
                <van-tab title='当前跟单' name="current">
                    <div v-for="item in 2" class="item px16 mb12 fill-bg">
                        <div class="py16">
                            <div class="f-sb">
                                <p class="flex align-center">
                                    <img class="avatar mr12"
                                         src="http://b-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.thumb.700_0.jpeg" alt="">
                                    <span class="f18">张山</span>
                                </p>
                                <van-button
                                        text="编辑"
                                        class="f16"
                                        size="small"
                                        @click="$goNext('/follow/setting?id=' + item)"
                                />
                            </div>
                            <van-row class="mt14">
                                <van-col span="12">
                                    <p class="f12 fc3">累计跟单金额</p>
                                    <p class="fc2 mt10">90054.00</p>
                                </van-col>
                                <van-col span="12" class="tr">
                                    <p class="f12 fc3">跟单总收益</p>
                                    <p class="fc2 mt10"> 70.22%</p>
                                </van-col>
                            </van-row>
                        </div>
                        <div class="py16 f12 border-top">
                            <van-row type="flex" justify="space-between">
                                <van-col span="11" class="f-sb">
                                    <span class="fc3">固定本金</span>
                                    <span class="fc2">90054.00</span>
                                </van-col>
                                <van-col span="11" class="f-sb">
                                    <span class="fc3">最大持仓手数</span>
                                    <span class="fc2">90054.00</span>
                                </van-col>
                            </van-row>
                            <van-row type="flex" justify="space-between" class="mt12">
                                <van-col span="11" class="f-sb">
                                    <span class="fc3">最大持仓金额</span>
                                    <span class="fc2">90054.00</span>
                                </van-col>
                                <van-col span="11" class="f-sb">
                                    <span class="fc3">品种设置</span>
                                    <span class="fc2">欧元美元</span>
                                </van-col>
                            </van-row>
                            <div class="f-sb mt12">
                                <span class="fc3">停止交易时间</span>
                                <span class="fc2">周一 19:00至20:00/周一 19:00至20:00</span>
                            </div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title='历史跟单' name="history">
                    <div v-for="item in 5" class="item px16 mb12 fill-bg">
                        <div class="py16">
                            <div class="f-sb">
                                <p class="flex align-center">
                                    <img class="avatar mr12"
                                         src="http://b-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.thumb.700_0.jpeg" alt="">
                                    <span class="f18">张山</span>
                                </p>
                                <van-button
                                        text="编辑"
                                        class="f16"
                                        size="small"
                                        @click="$goNext('/follow/setting?id=' + item)"
                                />
                            </div>
                            <van-row class="mt14">
                                <van-col span="12">
                                    <p class="f12 fc3">累计跟单金额</p>
                                    <p class="fc2 mt10">90054.00</p>
                                </van-col>
                                <van-col span="12" class="tr">
                                    <p class="f12 fc3">跟单总收益</p>
                                    <p class="fc2 mt10"> 70.22%</p>
                                </van-col>
                            </van-row>
                        </div>
                        <div class="py16 f12 border-top">
                            <div class="f-sb">
                                <span class="fc3">开仓时间：2020.04.05 12:2</span>
                                <span class="fc3">平仓时间：2020.04.05 12:2</span>
                            </div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title='' name="" disabled/>
                <van-tab title='' name="" disabled/>
            </van-tabs>
        </div>
    </div>
</template>

<script>
    import { Tab, Tabs, Col, Row, Button } from 'vant'

    export default {
        name: "mine",
        components: {
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Col.name]: Col,
            [Row.name]: Row,
            [Button.name]: Button,
        },
        data() {
            return {
                activeName: 'current',
            }
        },
        methods: {
            tabsClick(name, val) {
                console.log(name, val);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .h78 {
        height: 78px;
    }
    .avatar {
        @include wh(30);
        border-radius: 50%;
    }
    .border-top {
        border-top: .5px solid $border-color;
    }
</style>
