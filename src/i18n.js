import i18n from "i18next";
import { initReactI18next } from "react-i18next";

let userLang = navigator.language || navigator.userLanguage;
userLang = userLang.split("-")[0];

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: {
        Common: {
          add: "Add",
          delete: "Delete",
          update: "Update",
          detail: "Detail",
        },
        LoginPage: "Login Page",
        Email: "E-Mail",
        Password: "Password",
        Login: "Login",
        Home: "Home",
        Articles: "Articles",
        Logout: "Logout",
        Add: "Add",
        Admin: "Admin",
        User: "User",
        Users: "Users",
        Profile: "Profile",
        Admin: "Admin",
      },
    },
    tr: {
      translations: {
        Common: {
          add: "Ekle",
          delete: "Sil",
          update: "Güncelle",
          detail: "Detay",
        },
        LoginPage: "Giriş Sayfası",
        Email: "E-Posta",
        Password: "Parola",
        Login: "Giriş",
        Home: "AnaSayfa",
        Articles: "Makaleler",
        Logout: "Çıkış",
        Add: "Ekle",
        Admin: "Yönetici",
        User: "Kullanıcı",
        Users: "Kullanıcılar",
        Profile: "Profil",
        Admin: "Yönetici",
      },
    },
  },
  fallbackLng: { userLang },
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ",",
  },
  react: {
    useSuspense: true,
  },
});
export default i18n;
