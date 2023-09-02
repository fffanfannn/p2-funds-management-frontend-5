<template>
  <div>
    <h4>Details items</h4>
    <p>{{ online.detailArray[0].date }}</p>
    <p>{{ online.detailArray[0].amount }}</p>
    <p>{{ online.detailArray[0].type }}</p>
    <p>{{ online.detailArray[0].tag }}</p>
    <p>{{ online.detailArray[0].remark }}</p>
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
