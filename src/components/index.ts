import { App } from 'vue'

export default function(app: App<Element>) {
  const files = require.context('../components', true, /index\.vue$/)
  files.keys().forEach((key: string) => {
    const component = files(key).default
    app.component('custom-' + component.name, component)
  })
}
