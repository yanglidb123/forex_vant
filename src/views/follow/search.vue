<template>
    <div class="search-order">
        <Header title=" "/>
        <div class="fill-head-bg px16">
            <van-search
                    v-model="keyWord"
                    show-action
                    background="#171D25"
                    placeholder="请输入交易员昵称"
                    @cancel="$goBack()"
                    @search="onSearch"/>
        </div>
        <div class="body">
            <van-pull-refresh
                    style="min-height: 70vh"
                    v-model="refreshing"
                    @refresh="onRefresh">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        :immediate-check="false"
                        @load="getListData">
                    <div v-for="item in listData"
                         :key="item.id"
                         class="fill-bg px16 item mb12">
                        <div class="f-sb">
                            <p class="flex align-center">
                                <img class="avatar mr12" :src="item.headimgurl" alt="">
                                <span class="f18">{{ item.nickname }}</span>
                            </p>
                            <van-button text="跟单"
                                        style="font-size: 16px;"
                                        size="small"
                                        @click="$replaceNext('/follow/details?uid=' + item.userId)"/>
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
    import { Search, Col, Row, Button, PullRefresh, List } from 'vant'

    export default {
        name: "searchOrder",
        components: {
            [Search.name]: Search,
            [Col.name]: Col,
            [Row.name]: Row,
            [Button.name]: Button,
            [PullRefresh.name]: PullRefresh,
            [List.name]: List,
        },
        data() {
            return {
                loading: false,
                finished: false,
                refreshing: false,
                page: 1,
                pageSize: 10,
                keyWord: '',
                listData: [],
            }
        },
        activated() {
            this.page = 1;
            this.keyWord = '';
            this.listData = [];
            this.loading = false;
            this.refreshing = false;
        },
        methods: {
            onSearch(val) {
                this.page = 1;
                this.keyWord = val;
                this.listData = [];
                this.getListData();
            },
            async getListData() {
                this.loading = true;
                let params = {
                    pageSize: this.pageSize,
                    page: this.page ++,
                    keyWord: this.keyWord,
                };
                try {
                    let res = await this.$http.get('follow/fmtrader/search', {params});
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
            },
        }
    }
</script>

<style lang="scss" scoped>
    .search-order /deep/ {
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
        .van-search__action {
            background-color: $fill-head-bg;
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
