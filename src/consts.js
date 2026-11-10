export const ROUTES = {
  home: "home",
  login: "login",
  register: "register",
  plans: "plans",
};

export const STATUS_AUTH = {
  pending: "pending",
  error: "error",
  guest: "guest",
  authenticated: "authenticated",
};

export const STATUS_TOAST = {
  error: "error",
  success: "success",
};

export const LINKS = [
  {
    link: ROUTES.home,
    name: "Главная",
  },
  {
    link: `${ROUTES.home}/${ROUTES.plans}`,
    name: "Тарифы",
  },
];
