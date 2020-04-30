<template>
    <div class="details pb70">
        <Header title="详情"/>
        <div class="body">
            <div class="h78 px16 f-sb fill-bg">
                <div class="f-tc">
                    <img :src="tradersInfo.headimgurl" class="avatar mr12" alt="">
                    <span>{{ tradersInfo.nickname }}</span>
                </div>
                <div class="tr">
                    <p class="f21 fc-btn">{{ tradersInfo.profitSharing * 100 | filterDecimal }}%</p>
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
                <van-tab title='主页' name="home">
                    <van-row class="px16 py18 fill-bg">
                        <van-col span="8">
                            <p class="f12 fc3">累计收益率</p>
                            <p class="fc2 mt10">{{ homeInfo.allProfitRate * 100 | filterDecimal }}%</p>
                            <p class="f12 fc3 mt20">交易天数</p>
                            <p class="fc2 mt10">{{ homeInfo.days }}</p>
                        </van-col>
                        <van-col span="8" class="tc">
                            <p class="f12 fc3">近三周收益率</p>
                            <p class="fc2 mt10">{{ homeInfo.profitRate * 100 | filterDecimal }}%</p>
                            <p class="f12 fc3 mt20">交易笔数</p>
                            <p class="fc2 mt10">{{ homeInfo.transactionNum }}</p>
                        </van-col>
                        <van-col span="8" class="tr">
                            <p class="f12 fc3">近三周最大回撤</p>
                            <p class="fc2 mt10">{{ homeInfo.maxBackRate * 100 | filterDecimal }}%</p>
                            <p class="f12 fc3 mt20">累计跟随人数</p>
                            <p class="fc2 mt10">{{ homeInfo.followNum }}</p>
                        </van-col>
                    </van-row>
                    <div class="py18 mt12 fill-bg" style="height: 200px;">
                        <p class="px16" >累计收益率曲线图</p>
                    </div>
                </van-tab>
                <van-tab title='历史持仓' name="history">
                    <van-list
                            v-model="loadingHistory"
                            :finished="finishedHistory"
                            :immediate-check="false"
                            finished-text="没有更多了"
                            @load="getHistory">
                        <div v-for="item in historyList" :key="item.id" class="fill-bg mb12">
                            <div class="px16 py18">
                                <div class="f-sb">
                                    <div class="flex">
                                        <p class="f21 mr12">欧元美元</p>
                                        <div class="f-tc">
                                            <van-tag v-if="item.side === 0" color="#24B286" plain class="mr12">买入</van-tag>
                                            <van-tag v-else color="#F15B5A" plain class="mr12">卖出</van-tag>
                                            <van-tag color="#ECB816" plain>{{ item.margin }}X</van-tag>
                                        </div>
                                    </div>
                                    <p v-if="item.tradeUserId === 0" class="f14 fc-btn">自主下单</p>
                                    <p v-else class="f14 fc-btn">跟随下单</p>
                                </div>
                                <van-row class="mt20">
                                    <van-col span="8">
                                        <p class="f12 fc3">开仓价</p>
                                        <p class="fc2 mt10">{{ item.price }}</p>
                                    </van-col>
                                    <van-col span="8" class="tc">
                                        <p class="f12 fc3">平仓价</p>
                                        <p class="fc2 mt10">{{ item.closePrice }}</p>
                                    </van-col>
                                    <van-col span="8" class="tr">
                                        <p class="f12 fc3">收益率</p>
                                        <p class="fc2 mt10">{{ item.profitLossPrice }} %</p>
                                    </van-col>
                                </van-row>
                            </div>
                            <div class="px16">
                                <div class="f-sb border-top">
                                    <p class="f12 fc3">开仓时间:{{ item.ctime }}</p>
                                    <p class="f12 fc3">平仓时间:{{ item.closeCtime }}</p>
                                </div>
                            </div>
                        </div>
                    </van-list>
                </van-tab>
                <van-tab title='跟随者' name="follow">
                    <van-list
                            v-model="loadingFollower"
                            :finished="finishedFollower"
                            :immediate-check="false"
                            finished-text="没有更多了"
                            @load="getFollower">
                        <div v-for="item in followerList" class="h78 px16 f-sb fill-bg mb12">
                            <div class="f-tc">
                                <img :src="item.headimgurl" class="avatar mr12" alt="">
                                <span>{{ item.nikename }}</span>
                            </div>
                            <div class="tr">
                                <p class="f21 fc-btn">{{ item.profit }}</p>
                                <p class="f12 fc3 mt05">跟单收益</p>
                            </div>
                        </div>
                    </van-list>
                </van-tab>
            </van-tabs>
        </div>
        <div class="footer-box fill-bg px16">
            <van-button v-if="activeName !== 'history'" block text="立即跟单"/>
            <van-button v-else block text="查看跟单"/>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { Tab, Tabs, Col, Row, Button, Tag, List } from 'vant'

    export default {
        name: "details",
        components: {
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Col.name]: Col,
            [Row.name]: Row,
            [Button.name]: Button,
            [Tag.name]: Tag,
            [List.name]: List,
        },
        props: ['uid'],
        data() {
            return {
                activeName: 'home',
                homeInfo: {},
                loadingFollower: false,
                finishedFollower: false,
                loadingHistory: false,
                finishedHistory: false,
                page: 1,
                pageSize: 10,
                followerList: [],
                historyList: [],
            }
        },
        computed: {
            ...mapState(['tradersInfo'])
        },
        activated() {
            this.tabsClick(this.activeName);
        },
        methods: {
            tabsClick(name) {
                if (name === 'home') {
                    this.getUserHome();
                    this.getChart();
                } else if (name === 'history') {
                    this.page = 1;
                    this.finishedHistory = false;
                    this.historyList = [];
                    this.getHistory();
                } else if (name === 'follow') {
                    this.page = 1;
                    this.finishedFollower = false;
                    this.followerList = [];
                    this.getFollower();
                }
            },
            async getUserHome() {
                this.homeInfo = {};
                let params = {
                    tradeUserId: this.uid,
                };
                this.homeInfo = await this.$http.get('follow/fmtrader/search_trader_homepage', {params});
            },
            async getChart() {
                let params = {
                    tradeUserId: this.uid,
                };
                let res = await this.$http.get('follow/fm_user_profit/search_user_profit', {params});
            },
            async getHistory () {
                this.loadingHistory = true;
                let params = {
                    page: this.page ++,
                    limit: this.pageSize,
                    tradeUserId: this.uid,
                };
                try {
                    let { list } = await this.$http.get('fxOrderHistory/get_follow_orderhistory', {params});
                    this.loadingHistory = false;
                    if (list.length && list.length > 0) {
                        this.historyList = [...this.historyList, ...list];
                    }
                    this.finishedHistory = list.length < this.pageSize;
                } catch (e) {
                    this.loadingHistory = false;
                    this.finishedHistory = true;
                }
            },
            async getFollower() {
                this.loadingFollower = true;
                let params = {
                    page: this.page ++,
                    limit: this.pageSize,
                    tradeUserId: this.uid,
                };
                try {
                    let { list } = await this.$http.get('follow/fm_follow_profit/get_follow_user', {params});
                    this.loadingFollower = false;
                    if (list.length && list.length > 0) {
                        this.followerList = [...this.followerList, ...list];
                    }
                    this.finishedFollower = list.length < this.pageSize;
                } catch (e) {
                    this.loadingFollower = false;
                    this.finishedFollower = true;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .details /deep/ .van-tab--active {
        font-size: 18px;
    }
    .h78 {
        height: 78px;
    }
    .avatar {
        @include wh(40);
        border-radius: 50%;
    }
    .border-top {
        border-top: .5px solid $border-color;
        padding: 12px 0 ;
    }
</style>
