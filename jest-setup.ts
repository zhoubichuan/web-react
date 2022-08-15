import '@testing-library/jest-dom'
import 'jest-canvas-mock';
import { act, render } from '@testing-library/react'

const localStorageMock = (function () {
  let store = {}
  return {
    getItem: (key) => {
      return store[key]
    },
    setItem: (key, value) => {
      store[key] = value
    },
    clear: () => {
      store = {}
    },
    removeItem: (key) => {
      delete store[key]
    },
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })
Object.defineProperty(window, 'fetch', { value: jest.fn((val) => {
  return Promise.resolve({
    json: () => Promise.resolve({ streams: [{ codec_name: val.includes('loBiqE22EgMhslC_ugn3UfalWZLw') ?'hevc':'h264' }]}),
  })
}

)})
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
window.URL.createObjectURL = jest.fn(() => 'details');

export const mountTest = (component) => {
  return it('should render mount correctly', function() {
    const err = console.error; // 避免异常测试报错
    console.error = jest.fn();
    let msg = null
    try {
      act(() => {
        render(component)
      })
    }catch (e) {
      msg = e.message
    }
    expect(msg).toBeNull()
    console.error = err
  })
}
