import { shallowMount } from "@vue/test-utils";
import LoginView from "@/views/LoginView.vue";

describe("LoginView.vue", () => {
  it("sets isTransition to true when the login button is clicked", async () => {
    const wrapper = shallowMount(LoginView);
    const button = wrapper.find("button");
    expect(wrapper.vm.isTransition).toBe(false);
    await button.trigger("click");
    expect(wrapper.vm.isTransition).toBe(true);
  });
});
