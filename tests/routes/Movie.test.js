import { shallowMount } from "@vue/test-utils";
import store from "../../src/store";
import router from "../../src/routes";
import loadImage from "../../src/plugins/loadImage";
import Movie from '~/routes/Movie.vue';

describe('routes/Movie.vue', () => {
  let wrapper;

  beforeEach(async () => {
    window.scrollTo = jest.fn();
    router.push('/movie/tt123456')
    await router.isReady()
    wrapper = shallowMount(Movie, {
      global: {
        plugins: [
          store,
          router,
          loadImage
        ]
      }
    })
  })
  test('최초 접속한 URL 의 파라미터확인', () => {
    expect(wrapper.vm.$route.params.id).toBe('tt123456')
  })
  test('지정한 이미지 크기로Url변경', () => {
    const url ='https://google.com/sample_image_SX300.jpg';
    expect(wrapper.vm.requestDiffSizeImage(url)).toContain('SX700')
    expect(wrapper.vm.requestDiffSizeImage(url, 900)).toContain('SX900')
  })
  test('정상적인 이미지 주소가 아니면 빈문자 반환', () => {
    expect(wrapper.vm.requestDiffSizeImage()).toBe('')
    expect(wrapper.vm.requestDiffSizeImage('N/A')).toBe('')
  })
})