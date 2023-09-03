<template>
  <div>
    <h4>Details items</h4>
    <p>Date: {{ online.detailArray[0].date }}</p>
    <p>Amount: {{ online.detailArray[0].amount }}</p>
    <p>Type: {{ online.detailArray[0].type }}</p>
    <p>Tag: {{ online.detailArray[0].tag }}</p>
    <p>Remark: {{ online.detailArray[0].remark }}</p>
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
