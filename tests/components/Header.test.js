import { shallowMount } from "@vue/test-utils";
import router from '~/routes'
import store from "~/store";
import Header from '~/components/Header';

describe('components/Header.vue', () => {
 let wrapper
  beforeEach( async () => {
    window.scrollTo = jest.fn();
    router.push('/movie/tt123456');
    await router.isReady();
  wrapper = shallowMount(Header, {
    global: {
      plugins: [
        router,
        store
      ]
    }
  })
 })
  test('경로 일치하지 않습니다.', () => {
    const regExp = undefined;
    expect(wrapper.vm.isMatch(regExp)).toBe(false)
  })
  test('경로가 일치해야 합니다.',() => {
    const regExp = /^\/movie/
    expect(wrapper.vm.isMatch(regExp)).toBe(true)
  })
  test('일치하지 않아야합니다.', () => {
    const regExp = /^\/suji/;
    expect(wrapper.vm.isMatch(regExp)).toBe(false)
  })
})
