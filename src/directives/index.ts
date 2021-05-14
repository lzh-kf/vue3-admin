import { App } from 'vue'

export default function(app: App<Element>) {
  const files = require.context('./module', true, /index\.ts$/)
  files.keys().forEach((key: string) => {
    const { name, value } = files(key).default
    app.directive(name, value)
  })
}
