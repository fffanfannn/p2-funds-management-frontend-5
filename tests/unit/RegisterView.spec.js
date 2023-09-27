import { shallowMount } from "@vue/test-utils";
import RegisterView from "@/views/RegisterView.vue";

describe("UserData.vue", () => {
  it("if register as regular user, VIP option is shown", async () => {
    const wrapper = shallowMount(RegisterView);
    const select = wrapper.find("#usertype");
    await select.setValue("user");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isVip).toBe(true);
  });

  it("if register as admin, VIP option is shown", async () => {
    const wrapper = shallowMount(RegisterView);
    const select = wrapper.find("#usertype");
    await select.setValue("admin");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isVip).toBe(false);
  });
});
