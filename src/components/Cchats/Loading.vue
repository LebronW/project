<template>
  <div v-show="isLoading">
    <div class="weui-mask_transparent" id="mask"></div>
    <div class="weui-toast" style="position: absolute;" id="toast">
      <i class="weui-loading weui-icon_toast"></i>
      <p class="weui-toast__content">加载中</p>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      }
    },
    mounted() {
      let mask = document.getElementById("mask");
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      mask.style.height = document.documentElement.clientHeight | document.body.clientHeight + "px";
      mask.style.top = parseFloat(scrollTop) + "px";
    }
  }
</script>
<style lang="scss">
  @import "../../common/sass/Cyucb";

  .weui-mask_transparent {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background-color: #000;
    opacity: 0.3;
  }

  .weui-toast {
    position: fixed;
    z-index: 5000;
    width: rem(150rem);
    min-height: rem(150rem);
    top: 49%;
    left: 50%;
    margin-top: -(rem(75rem));
    margin-left: -(rem(75rem));
    background: rgba(17, 17, 17, 0.7);
    text-align: center;
    border-radius: rem(6rem);
    color: #FFFFFF;

    .weui-loading {
      width: rem(20rem);
      height: rem(20rem);
      display: inline-block;
      vertical-align: middle;
      -webkit-animation: weuiLoading 1s steps(12, end) infinite;
      animation: weuiLoading 1s steps(12, end) infinite;
      background: transparent url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cpath fill='none' d='M0 0h100v100H0z'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23E9E9E9' rx='5' ry='5' transform='translate(0 -30)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23989697' rx='5' ry='5' transform='rotate(30 105.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%239B999A' rx='5' ry='5' transform='rotate(60 75.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23A3A1A2' rx='5' ry='5' transform='rotate(90 65 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23ABA9AA' rx='5' ry='5' transform='rotate(120 58.66 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23B2B2B2' rx='5' ry='5' transform='rotate(150 54.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23BAB8B9' rx='5' ry='5' transform='rotate(180 50 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23C2C0C1' rx='5' ry='5' transform='rotate(-150 45.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23CBCBCB' rx='5' ry='5' transform='rotate(-120 41.34 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23D2D2D2' rx='5' ry='5' transform='rotate(-90 35 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23DADADA' rx='5' ry='5' transform='rotate(-60 24.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23E2E2E2' rx='5' ry='5' transform='rotate(-30 -5.98 65)'/%3E%3C/svg%3E") no-repeat;
      background-size: 100%;
    }

    .weui-icon_toast.weui-loading {
      margin: rem(45rem) 0 0 0;
      width: rem(40rem);
      height: rem(40rem);
      vertical-align: baseline;
    }

    .weui-toast__content {
      margin: rem(5rem) 0 rem(30rem) 0;
    }
  }

  @keyframes weuiLoading {
    0% {
      -webkit-transform: rotate3d(0, 0, 1, 0deg);
      transform: rotate3d(0, 0, 1, 0deg);
    }

    100% {
      -webkit-transform: rotate3d(0, 0, 1, 360deg);
      transform: rotate3d(0, 0, 1, 360deg);
    }
  }

</style>
