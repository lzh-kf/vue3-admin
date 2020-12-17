
function registrationComponents(app: { component: (arg0: string, arg1: any) => void }) {
  const files = require.context("../components", true, /index\.vue$/);
  files.keys().forEach((key: string) => {
    const component = files(key).default;
    app.component("custom-" + component.name, component);
  });
}

export default registrationComponents
