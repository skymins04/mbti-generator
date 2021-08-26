<!-- Draggable.svelte -->
<script lang="ts">
  import Draggable from "./Draggable.svelte";
  import { selectedObj, objInfo } from "./stores";

  let objNum = 3;
  let objs = [];

  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

  function setComponents() {
    objs = [];
    for (let i = 0; i < objNum; i++) {
      objs.push({
        left: getRandom(0, 300),
        top: getRandom(0, 300),
        width: 50,
        height: 50,
      });
    }
    objs = objs;
  }

  function addComponent() {
    objs.push({
      left: getRandom(0, 300),
      top: getRandom(0, 300),
      width: 50,
      height: 50,
    });
    objs = objs;
  }

  setComponents();
</script>

<h1>drag object test</h1>
<input type="text" bind:value={objNum} />
<button on:click={setComponents}>적용</button>
<button on:click={addComponent}>오브젝트 추가</button>
<button
  on:click={() => {
    console.log($objInfo);
  }}>오브젝트 정보</button
>
<div
  id="viewport"
  on:click|self={() => {
    $selectedObj = "none";
  }}
>
  {#each objs as { left, top, width, height }, i}
    <Draggable {left} {top} {width} {height} objId={i}>
      <h1>{i}</h1>
    </Draggable>
  {/each}
</div>

<style>
  #viewport {
    width: 90%;
    height: 80%;
    margin: 10px;
    border: 1px solid #ccc;
    position: relative;
    box-shadow: 0 0 3px 3px #ccc inset;
    overflow: hidden;
  }
</style>
