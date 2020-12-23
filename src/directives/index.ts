function registrationDirectives(app: any) {
  const files = require.context("./module", true, /index\.ts$/);
  files.keys().forEach((key: string) => {
    const { name, value } = files(key).default;
    app.directive(name, value);
  });
}

export default registrationDirectives
