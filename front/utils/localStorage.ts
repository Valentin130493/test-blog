export const Storage = {
    get: (key: string) => {
        sessionStorage.getItem(key)
    },
    set: (key: string, value: string) => {
        sessionStorage.setItem(key, value)
    },
    remove: (key: string) => {
        sessionStorage.removeItem(key)
    },
    clear: () => {
        sessionStorage.clear()
    }
}
