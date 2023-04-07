export const redirectHome = (token: string | null) => {
  if (token) {
    window.location.href = "/todo";
  } else {
    window.location.href = "/signin";
  }
};
