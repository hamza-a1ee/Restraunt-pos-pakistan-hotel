const BASE_URL = "/user";
export const userRoutes = {
  login: () => `${BASE_URL}/login`,
  signup: () => `${BASE_URL}/signup`,
  forgotPassword: () => `${BASE_URL}/forgot-password`,
  dashboard: () => `${BASE_URL}/dashboard`,
  tables: () => `${BASE_URL}/tables`,
  creditCustomers: () => `${BASE_URL}/credit-customers`,
  menu: () => `${BASE_URL}/menu`,
};
