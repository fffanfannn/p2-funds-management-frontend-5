<template>
  <div>
    <h4>Details items</h4>
    <p>{{ online.detailArray }}</p>
  </div>
</template>

<script>
import { useOnlineStore } from "@/store/online";
import { useCodeSpacesStore } from "@/store/codespaceURL";
export default {
  name: "DetailsComp",
  setup() {
    const online = useOnlineStore();
    const codespaces = useCodeSpacesStore();
    return { online, codespaces };
  },
};
</script>
