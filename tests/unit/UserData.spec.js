import { shallowMount } from "@vue/test-utils";
import UserData from "@/views/UserData.vue";

describe("UserDate.vue", () => {
  it("sets createDialog to true when the create button is clicked", async () => {
    const wrapper = shallowMount(UserData);
    const button = wrapper.find('[data-testid="create-button"]');
    expect(wrapper.vm.createDialog).toBe(false);
    await button.trigger("click");
    expect(wrapper.vm.createDialog).toBe(true);
  });

  it("sets searchDialog to true when the search button is clicked", async () => {
    const wrapper = shallowMount(UserData);
    const button = wrapper.find('[data-testid="search-button"]');
    expect(wrapper.vm.searchDialog).toBe(false);
    await button.trigger("click");
    expect(wrapper.vm.searchDialog).toBe(true);
  });

  it("sets editDialog to true when the update button is clicked", async () => {
    const wrapper = shallowMount(UserData);
    const button = wrapper.find('[data-testid="update-button"]');
    expect(wrapper.vm.editDialog).toBe(false);
    await button.trigger("click");
    expect(wrapper.vm.editDialog).toBe(true);
  });
});
