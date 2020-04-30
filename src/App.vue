<template>
    <div id="app">
        <transition :name="transitionName">
            <keep-alive>
                <router-view class="page"/>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'

    export default {
        data() {
            return {
                transitionName: '',
            }
        },
        computed: {
            ...mapState(['isBack'])
        },
        watch: {
            '$route' (to, from) {
                this.transitionName = this.isBack ? 'slide-right' : 'slide-left';
                this.setIsBack(false);
            }
        },
        methods: {
            ...mapMutations({
                setIsBack: 'SET_IS_BACK',
            }),
        }
    }
</script>

<style lang="scss">
    @import "assets/css/reset.css";
    @import "assets/css/common.scss";

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        height: 100vh;
        color: $def-font-color;
        font-size: 16px;
        background: #0A0F10
    }
    .page {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background: #0A0F10;
        box-sizing: border-box;
    }
    .slide-right-enter-active,
    .slide-right-leave-active,
    .slide-left-enter-active,
    .slide-left-leave-active {
        will-change: transform;
        transition: all 300ms;
        position: absolute;
    }
    .slide-right-enter {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }
    .slide-right-leave-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }
    .slide-left-enter {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }
    .slide-left-leave-active {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }
</style>
