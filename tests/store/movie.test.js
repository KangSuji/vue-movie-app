import movieStore from '../../src/store/movie';
import _cloneDeep from 'lodash/cloneDeep';
import axios from 'axios';

describe('store/movie.js', () => {
  let store;
  beforeEach( () => {
    store = _cloneDeep(movieStore);
    store.state = store.state();
    store.commit = (name, payload) => {
      store.mutations[name](store.state, payload)
    }
    store.dispatch = (name, payload) => {
      const context = {
        state: store.state,
        commit: store.commit,
        dispatch: store.dispatch
      }
      store.actions[name](context, payload)
    }
  })
  test('데이터 초기화', () => {
    store.commit('updateState', {
      movies: [{ imdbID: '1' }],
      message: 'Hello world',
      loading: true,
    })
    store.commit('resetMovies');
    expect(store.state.movies).toEqual([]);
    expect(store.state.message).toBe('Search For The Movie Title!')
    expect(store.state.loading).toBe(false)
  })
  test('데이터 확인', async () => {
    const res = {
      data: {
        totalResults: '1',
        Search: [
          {
            imdbID: '1',
            Title: 'Hello',
            Poster: 'hello.jpg',
            Year: '2022'
          }
        ]
      }
    }
    axios.post = jest.fn().mockResolvedValue(res);
    
    await store.dispatch('searchMovies')
    expect(store.state.movies).toEqual([])
  })
  test('에러메세지 확인', async () => {
    const errorMessage = 'Network Error';
    axios.post = jest.fn().mockRejectedValue(new Error(errorMessage))
    await store.dispatch('searchMovies')
    expect(store.state.message).toBe('')
  })
  test('중복', async () => {
    const res = {
      data: {
        totalResults: '1',
        Search: [
          {
            imdbID: '1',
            Title: 'Hello',
            Poster: 'hello.jpg',
            Year: '2022'
          },
          {
            imdbID: '1',
            Title: 'Hello',
            Poster: 'hello.jpg',
            Year: '2022'
          },
          {
            imdbID: '1',
            Title: 'Hello',
            Poster: 'hello.jpg',
            Year: '2022'
          }
        ]
      }
    }
    axios.get = jest.fn().mockResolvedValue(res)
    await store.dispatch('searchMovies')
    expect(store.state.movies.length).toBe(0)
  })
})