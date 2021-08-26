<!-- Draggable.svelte -->
<script lang="ts">
  import { afterUpdate } from "svelte";
  import { selectedObj } from "./stores";

  export let left = 30;
  export let top = 30;
  export let width = 200;
  export let height = 200;
  export let objId = 1;
  let moving = false;
  let selected = false;
  let resizing = false;
  let selectedHandle = "";

  function start() {
    moving = true;
  }

  function stop() {
    moving = false;
    resizing = false;
  }

  function move(e) {
    if (moving) {
      if (resizing) {
        if (selectedHandle === "top-left-handle") {
          width -= e.movementX;
          height -= e.movementY;
          left += e.movementX;
          top += e.movementY;
        } else if (selectedHandle === "top-right-handle") {
          width += e.movementX;
          height -= e.movementY;
          top += e.movementY;
        } else if (selectedHandle === "bottom-left-handle") {
          width -= e.movementX;
          height += e.movementY;
          left += e.movementX;
        } else {
          width += e.movementX;
          height += e.movementY;
        }
      } else {
        left += e.movementX;
        top += e.movementY;
      }
    }
  }

  function select() {
    if (selected) {
      document.getElementById("handles" + objId.toString()).style.display =
        "block";
    } else {
      document.getElementById("handles" + objId.toString()).style.display =
        "none";
    }
  }

  function handleSelect(e) {
    resizing = true;
    selectedHandle = e.target.id;
  }

  afterUpdate(async () => {
    select();
  });
</script>

<svelte:window
  on:click={() => {
    if ($selectedObj !== "handles" + objId.toString()) {
      selected = false;
    }
    if ($selectedObj === "none") {
      selected = false;
    }
  }}
  on:click|self={() => {
    selected = false;
  }}
  on:mouseup={stop}
  on:mousemove={move}
/>

<section
  on:mousedown={start}
  on:click={(e) => {
    //e.stopPropagation();
    $selectedObj = "handles" + objId.toString();
    selected = !selected;
  }}
  style="left: {left}px; top: {top}px; width: {width}px; height: {height}px;"
  id="draggable"
>
  <div id={"handles" + objId.toString()}>
    <span id="top-left-handle" on:mousedown={handleSelect} />
    <span id="top-right-handle" on:mousedown={handleSelect} />
    <span id="bottom-left-handle" on:mousedown={handleSelect} />
    <span id="bottom-right-handle" on:mousedown={handleSelect} />
  </div>
  <slot id="slot" />
</section>

<style>
  #draggable {
    position: relative;
    user-select: none;
    position: absolute;
    border: 1px solid gray;
    cursor: move;
  }

  #draggable > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  #draggable > div > span {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid rgb(88, 168, 221);
    background-color: white;
  }

  #top-left-handle {
    top: -7px;
    left: -7px;
  }

  #top-right-handle {
    top: -7px;
    right: -7px;
  }

  #bottom-left-handle {
    bottom: -7px;
    left: -7px;
  }

  #bottom-right-handle {
    bottom: -7px;
    right: -7px;
  }
</style>
