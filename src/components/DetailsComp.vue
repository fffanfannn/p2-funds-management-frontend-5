<template>
  <div>
    <h4>Details items</h4>
    <p>{{ this.detailResults }}</p>
  </div>
</template>

<script>
import { useCodeSpacesStore } from "@/store/codespaceURL";
export default {
  name: "DetailsComp",
  setup() {
    const codespaces = useCodeSpacesStore();
    return { codespaces };
  },
  data() {
    return {
      detailResults: {},
      detailResultss: {},
    };
  },
  created() {
    console.log("This.detailResults");
    console.log(this.$route.params);
    const codespaces = useCodeSpacesStore();
    fetch(`${codespaces.csURL}api/account/${this.$route.params.id}`)
      .then((res) => res.json())
      .then((data) => {
        this.detailResults = data;
        console.log("data", this.detailResults);
      });
  },
};
</script>
