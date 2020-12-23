function registrationComponents(app: any) {
  const files = require.context("../components", true, /index\.vue$/);
  files.keys().forEach((key: string) => {
    const component = files(key).default;
    app.component("custom-" + component.name, component);
  });
}

export default registrationComponents
