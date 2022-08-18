// 节流
export function useDebounce(fn, wait) {
    let timer = null
    return (...args) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => fn(...args), wait)

    }
}