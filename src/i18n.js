import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(initReactI18next)
  .use(Backend)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",//browsera gore dil dosyalarımı bulamazsa(tr,en) default en calissin.
    // backend: { // api den de cekebilirim kenarda dursun simdilik.
    //   loadPath: process.env.REACT_APP_API_URL+"lang?lang={{lng}}",
    // },
  });
export default i18n;
