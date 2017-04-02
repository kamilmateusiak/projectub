<template>
  <div>
    <div class="main-banner">
      <h1>Lama Media - projectHub</h1>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style>
  .main-banner {
    background-image: url('../assets/banner-lm.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    min-height: 200px;
    width: 100%;
    position: relative;
  }
  .main-banner h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
    color: #fff;
  }
</style>
