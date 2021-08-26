<!-- Draggable.svelte -->
<script lang="ts">
  import Draggable from "./Draggable.svelte";
</script>

<h1>drag object test</h1>
<div id="viewport">
  <Draggable left={50} top={50} objId={1}>
    <h1>Drag Me 1</h1>
  </Draggable>

  <Draggable left={300} top={50} objId={2}>
    <h1>Drag Me 2</h1>
  </Draggable>

  <Draggable left={50} top={300} objId={3}>
    <h1>Drag Me 3</h1>
  </Draggable>
</div>

<style>
  #viewport {
    width: 800px;
    height: 500px;
    margin: 10px;
    border: 1px solid #ccc;
    position: relative;
    box-shadow: 0 0 3px 3px #ccc inset;
    overflow: hidden;
  }
</style>
