<template>
    <div class="follow-order">
        <Header title="跟单"
                right-text="我的"
                @left-click="leftBack"
                @right-click="$goNext('/follow/mine')"/>
        <van-row class="fill-head-bg px16">
            <van-col span="16">
                <van-search
                        readonly
                        background="#171D25"
                        placeholder="搜索所有交易员"
                        @focus="$goNext('/follow/search')"/>
            </van-col>
            <van-col span="8" class="drop">
                <van-dropdown-menu
                        active-color="#E2B116"
                        class="fill-head-bg">
                    <van-dropdown-item
                            v-model="value1"
                            :options="dropOption"
                            @change="changeDrop"/>
                </van-dropdown-menu>
            </van-col>
        </van-row>
        <div class="body">
            <van-pull-refresh
                    v-model="refreshing"
                    pulling-text="下拉即可刷新..."
                    loosing-text="释放即可刷新..."
                    loading-text="加载中..."
                    success-text="刷新成功"
                    @refresh="onRefresh">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        :immediate-check="false"
                        finished-text="没有更多了"
                        @load="getListData">
                    <div v-for="item in listData"
                         :key="item.id"
                         class="fill-bg px16 item mb12">
                        <div class="f-sb">
                            <p class="flex align-center">
                                <img class="avatar mr12"
                                     :src="item.headimgurl" alt="">
                                <span class="f18">{{ item.nickname }}</span>
                            </p>
                            <van-button
                                    text="跟单"
                                    class="f16"
                                    size="small"
                                    @click="toDetailsClick(item)"/>
                        </div>
                        <van-row class="mt20">
                            <van-col span="8">
                                <p class="f12 fc3">累计收益率</p>
                                <p class="fc2 mt10">{{ item.allProfitRate * 100 | filterDecimal }}%</p>
                            </van-col>
                            <van-col span="8" class="tc">
                                <p class="f12 fc3">近三周最大回撤</p>
                                <p class="fc2 mt10">{{ item.maxBackRate * 100 | filterDecimal }}%</p>
                            </van-col>
                            <van-col span="8" class="tr">
                                <p class="f12 fc3">累计跟随人数</p>
                                <p class="fc2 mt10">{{ item.followNum }}</p>
                            </van-col>
                        </van-row>
                    </div>
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import {Search, Col, Row, DropdownMenu, DropdownItem, List, PullRefresh, Button} from 'vant'

    export default {
        name: "follow",
        components: {
            [Search.name]: Search,
            [Col.name]: Col,
            [Row.name]: Row,
            [List.name]: List,
            [DropdownMenu.name]: DropdownMenu,
            [DropdownItem.name]: DropdownItem,
            [PullRefresh.name]: PullRefresh,
            [Button.name]: Button,
        },
        data() {
            return {
                value1: 1,
                listData: [],
                loading: true,
                finished: false,
                refreshing: false,
                page: 1,
                pageSize: 10,
            }
        },
        computed: {
            dropOption() {
                return [
                    {text: '综合', value: 1},
                    {text: '累计收益率', value: 2},
                    {text: '跟随人数', value: 3},
                ]
            }
        },
        activated() {
            this.page = 1;
            this.loading = true;
            this.finished = false;
            this.refreshing = false;
            this.listData = [];
            this.getListData();
        },
        deactivated() {
        },
        methods: {
            ...mapMutations({
                setTradersInfo: 'SET_TRADERS_INFO',
            }),
            leftBack() {
                console.log('哪来回哪去！！！！！');
            },
            toDetailsClick(item) {
                this.setTradersInfo(item);
                this.$goNext('/follow/details?uid=' + item.userId);
            },
            changeDrop(e) {
                this.loading = true;
                this.page = 1;
                this.listData = [];
                this.getListData();
            },
            async getListData() {
                let params = {
                    pageSize: this.pageSize,
                    page: this.page++,
                    sortType: this.value1 === 3 ? 1 : 4
                };
                try {
                    let res = await this.$http.get('follow/fmtrader/pageList', {params});
                    this.loading = false;
                    if (res.length && res.length > 0) {
                        this.listData = [...this.listData, ...res];
                    }
                    this.finished = res.length < this.pageSize;
                } catch (e) {
                    this.loading = false;
                    this.finished = true;
                    this.refreshing = false;
                }
            },
            async onRefresh() {
                this.page = 1;
                this.listData = [];
                await this.getListData();
                this.refreshing = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .follow-order /deep/ {
        input::-webkit-input-placeholder {
            color: #5A6876;
        }

        input::-moz-placeholder {
            color: #5A6876;
        }

        input::-ms-input-placeholder {
            color: #5A6876;
        }

        .van-field__control {
            font-size: 16px;
            height: 26px;
            color: $def-font-color;
        }

        .van-field__left-icon .van-icon {
            font-size: 20px;
            color: #8397A9;
        }

        .van-hairline--top-bottom::after {
            border-width: 0;
        }

        .drop .van-cell {
            background-color: $fill-head-bg;
            color: $def-font-color;
        }

        .van-popup {
            background-color: transparent;
        }

        .drop .van-cell:not(:last-child)::after {
            border-color: $border-color;
        }
    }

    .item {
        padding-top: 11px;
        padding-bottom: 14px;
    }

    .avatar {
        @include wh(30);
        border-radius: 50%;
    }

</style>
