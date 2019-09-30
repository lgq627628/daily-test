<template>
  <div class="xr-editor">
    <div contenteditable="true">
      <p>这是可编辑的</p>
      <p contenteditable="false">这是不可编辑的</p>
    </div>
  </div>
</template>

<style lang="scss">
.xr-editor {
  width: 300px;
  height: 300px;
  border: 1px solid #000;
  > div {
    width: 100%;
    height: 100%;
  }
}
</style>
