export const redirectWithReload = (path: string) => {
  if (window) {
    window.location.href = path;
  }
};
