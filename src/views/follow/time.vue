<template>
    <div class="time pb70">
        <Header title="停止交易时间"/>
        <div class="body">
            <div class="flex align-center justify-around fill-bg py16">
                <span class="fc3">选择星期</span>
                <span class="fc3">开始时间</span>
                <span class="fc3">结束时间</span>
            </div>
            <van-picker
                    class="fill-bg"
                    ref="pickerDate"
                    :columns="columns" />
            <div class="px16 add fill-bg py16">
                <van-button
                        block
                        plain
                        size="large"
                        style="background-color: #12171D; border: 2px dashed #77899A"
                        text="添加停止交易时间"
                        icon="plus"
                        @click="addDateClick"/>
            </div>
            <p class="fc3 px16 py16">
                您已设置以下时间停止交易
            </p>
            <van-cell
                    v-for="(item, index) in actionList"
                    :key="item"
                    :title="item[0] + ' ' + item[1] + ' 至 ' + item[2]"
                    class="fill-bg"
                    title-class="fc1 f16">
                <template #right-icon>
                    <van-icon
                            name="cross"
                            color="#8397A9"
                            style="line-height: inherit;"
                            @click="deleteClick(index)" />
                </template>
            </van-cell>
        </div>
        <div class="footer-box fill-bg px16">
            <van-button block text="确定" @click=""/>
        </div>
    </div>
</template>

<script>
    import { Picker, Cell, Icon, Button } from 'vant'

    export default {
        name: "time",
        components: {
            [Picker.name]: Picker,
            [Cell.name]: Cell,
            [Icon.name]: Icon,
            [Button.name]: Button,
        },
        props: {
            id: String
        },
        data() {
            return {
                actionList: [],
            }
        },
        activated() {
            console.log(this.id);
        },
        deactivated() {
        },
        computed: {
            date() {
                return Array.from(Array(24), (v, i) =>(i < 10 ? '0' + i : i) + ':00');
            },
            week() {
                return ['周一', '周二','周三','周四','周五','周六','周日',
                    // {text: '周一', type: 1},
                    // {text: '周二', type: 2},
                    // {text: '周三', type: 3},
                    // {text: '周四', type: 4},
                    // {text: '周五', type: 5},
                    // {text: '周六', type: 6},
                    // {text: '周日', type: 7},
                ]
            },
            columns() {
                return [
                    {
                        values: this.week
                    },
                    {
                        values: this.date
                    },
                    {
                        values: this.date
                    },
                ]
            }
        },
        methods: {
            addDateClick() {
                let res = this.$refs.pickerDate.getValues();
                let d1 = this.$refs.pickerDate.getColumnValue(1);
                let d2 = this.$refs.pickerDate.getColumnValue(2);
                if (d2.slice(0, 2) < d1.slice(0, 2)) {
                    this.$toast('请设置正确的时间');
                    return;
                }
                let r = this.actionList.some(item => item.join() === res.join());
                if (!r)
                    this.actionList.push(res);
                else
                    this.$toast('已存在');
            },
            deleteClick(index) {
                this.actionList.splice(index, 1);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .time /deep/ {
        .van-picker__mask {
            background-image: linear-gradient(180deg, rgba(18, 23 ,29, 0.9), rgba(18, 23 ,29, 0.4)), linear-gradient(0deg, rgba(18, 23 ,29, 0.9), rgba(18, 23 ,29, 0.4));
        }
        .van-picker-column__item {
            color: $def-font-color;
        }
        .van-hairline-unset--top-bottom::after {
            border-color: $border-color;
        }

        .add .van-button {
            color: #77899A;
            /*border-image: linear-gradient(0deg, #77899A 0%, #77899A 50%, transparent 51%, transparent 100%) 20 10 repeat*/
        }
    }

</style>
