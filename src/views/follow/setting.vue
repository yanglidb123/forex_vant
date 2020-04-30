<template>
    <div class="setting pb70">
        <Header title="设置跟单"/>
        <div class="f-sb h45 px16">
            <span class="fc3">当前账户风险控制</span>
            <span class="fc-btn">修改</span>
        </div>
        <van-cell
                title="净值保护"
                class="fill-bg"
                title-class="fc1"
                value-class="fc3"
                :border="false"
                value="￥1000.00/￥10000.00"
        />
        <van-cell
                title="跟随持仓总手数"
                class="fill-bg"
                title-class="fc1"
                value-class="fc3"
                :border="false"
                value="100.00 标准手"
        />
        <van-cell
                title="最大单笔跟随手数"
                class="fill-bg"
                title-class="fc1"
                value-class="fc3"
                :border="false"
                value="10.00 标准手"
        />
        <div class="flex align-center h45 px16">
            <span class="fc3">跟随方式</span>
        </div>
        <van-tabs
                v-model="activeName"
                color="#ECB816"
                background="#12171D"
                line-width="20"
                :border="false"
                title-active-color="#fff"
                title-inactive-color="#5A6876"
                @click="tabsClick">
            <van-tab title='智能比例' name="smart">
                <div class="px16 py18 fill-bg">
                    <p class="f14 fc2 lh20">
                        例：接收到开仓信号时，跟随者账户净值为$100，杠杆为1:100;交易员A账户净值为$200，杠杆为1:200；
                        交易员B账户净值为$200，杠杆为1:50；交易员B下1标准手，此时你跟随下单的手数为0.2标准手。
                    </p>
                    <p class="f12 fc3 lh16 mt12">
                        智能比例计算公式：交易员B开仓手数*(跟随者净值*杠杆)/(交易员A净值*杠杆+交易员B净值*杠杆)
                    </p>
                </div>
            </van-tab>
            <van-tab title='固定比例' name="fixed">
                <div class="px16 fill-bg tc py16">
                    <van-stepper
                            v-model="scaleValue"
                            step="0.01"
                            min="0"
                            input-width="140px"
                            button-size="35px"
                            decimal-length="2"
                    />
                </div>
                <div class="px16 f12 fc3 fill-bg">
                    <p class="border-top py16 lh16">
                        例子：你设置为0.5倍比例跟随，交易员下单1标准手，你的手数为0.5标准手。
                    </p>
                </div>
            </van-tab>
            <van-tab title='固定手数' name="hand">
                <div class="px16 fill-bg tc py16">
                    <van-stepper
                            v-model="handValue"
                            step="0.01"
                            min="0"
                            input-width="140px"
                            button-size="35px"
                            decimal-length="2"
                    />
                </div>
                <div class="px16 f12 fc3 fill-bg">
                    <p class="border-top py16 lh16">
                        例子：你设置固定数量0.01标准手，不论交易员下单多少标准手，你手数均为0.01标准手。
                    </p>
                </div>
            </van-tab>
        </van-tabs>
        <div class="body">
        <div class="row-info fill-bg">
            <van-cell
                    title="最大持仓手数"
                    class="fill-bg"
                    title-class="fc1"
                    value-class="fc3"
                    :border="false">
                <template #default>
                    <van-stepper
                            v-model="scaleValue"
                            step="0.01"
                            min="0"
                            input-width="70px"
                            decimal-length="2"
                    />
                </template>
            </van-cell>
            <p class="f12 fc3 px16 lh16">跟随该交易员的持仓本金到达该数值后，将不再跟随下单。</p>
        </div>
        <div class="row-info fill-bg border-top">
            <van-cell
                    title="高级交易设置"
                    class="fill-bg"
                    title-class="fc1 f20"
                    value-class="fc3 f14"
                    value="欧元美元/欧美式的"
                    center
                    is-link
                    :border="false">
            </van-cell>
            <p class="f12 fc3 px16 lh16">例如您设置的跟单本金2USD，无论交易员下单多少本金，您的下单本金固定为2USD，最低跟单本金为2USD。</p>
        </div>
        <div class="row-info fill-bg border-top mb12">
            <van-cell
                    title="停止交易时间"
                    class="fill-bg"
                    title-class="fc1 f20"
                    value-class="fc3 f14"
                    value="周一 13:00至14:00"
                    center
                    is-link
                    to="/follow/time?id=23"
                    :border="false">
            </van-cell>
            <p class="f12 fc3 px16 lh16">例如您设置的跟单本金2USD，无论交易员下单多少本金，您的下单本金固定为2USD，最低跟单本金为2USD。</p>
        </div>
        </div>
        <div v-if="false" class="footer-box fill-bg px16">
            <van-button block text="立即跟单" @click="showSheet = true"/>
        </div>
        <div class="footer-box fill-bg px16 f-sb">
            <van-button text="取消订单" style="background: #1E2933; border-color: #1E2933;" class="fc3 flex-1 mr12" @click="showSheet = true"/>
            <van-button text="保存跟单" class="flex-1" @click="showSheet = true"/>
        </div>
        <van-popup
                v-model="showSheet"
                round
                closeable
                style="height: 50%"
                position="bottom">
            <div>123123</div>
        </van-popup>
    </div>
</template>

<script>
    import { Cell, Tab, Tabs, Stepper, Button, ActionSheet, DatetimePicker, Popup } from 'vant'

    export default {
        name: "setting",
        components: {
            [Cell.name]: Cell,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Stepper.name]: Stepper,
            [Button.name]: Button,
            [ActionSheet.name]: ActionSheet,
            [DatetimePicker.name]: DatetimePicker,
            [Popup.name]: Popup,
        },
        props: {
            id: String,
        },
        data() {
            return {
                activeName: 'smart',
                scaleValue: '',
                handValue: '',
                showSheet: false,
            }
        },
        activated() {
            console.log(this.id);
        },
        deactivated() {},
        methods: {
            tabsClick(name, val) {
                console.log(name, val);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .setting /deep/ {
        .van-stepper__minus, .van-stepper__plus {
            background: #1E2933;
            color: #8397A9;
        }
        .van-stepper__input {
            background: $fill-bg;
            color: $def-font-color;
            font-size: 16px;
        }
    }
    .h45 {
        height: 45px;
    }
    .lh20 {
        line-height: 20px;
    }
    .lh16 {
        line-height: 16px;
    }
    .row-info {
        padding: 10px 0;
    }
</style>
