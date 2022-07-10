import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: {
        LoginPage: "Login Page",
        Email: "E-Mail",
        Password: "Password",
        Login: "Login",
        Home:"Home",
        Articles:"Articles",
        Logout:"Logout"
      },
    },
    tr: {
      translations: {
        LoginPage: "Giriş Sayfası",
        Email: "E-Posta",
        Password: "Parola",
        Login: "Giriş",
        Home:"AnaSayfa",
        Articles:"Makaleler",
        Logout:"Çıkış"
      },
    },
  },
  fallbackLng: "en",
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ",",
  },
  react: {
    wait: true,
  },
});
export default i18n;
