import i18n from "i18next"
import { initReactI18next } from "react-i18next"

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        appName: "electron-shadcn",
        titleHomePage: "Home Page",
        titleSecondPage: "Second Page",
        titleStateDemoPage: "State Demo",
        shortcutMessages: {
          toggleTheme: "Theme toggled",
          toggleLanguage: "Language changed",
          toggleKeyboardTest: "Keyboard test toggled",
        },
        shortcutHelp: {
          title: "Keyboard Shortcuts:",
          toggleTheme: "Toggle theme: {{key}}",
          toggleLanguage: "Toggle language: {{key}}",
          globalToggleApp: "Toggle app visibility: {{key}}",
          toggleKeyboardTest: "Toggle keyboard test: {{key}}",
        },
      },
    },
    "pt-BR": {
      translation: {
        appName: "electron-shadcn",
        titleHomePage: "Página Inicial",
        titleSecondPage: "Segunda Página",
        titleStateDemoPage: "Demo de Estado",
        shortcutMessages: {
          toggleTheme: "Tema alternado",
          toggleLanguage: "Idioma alterado",
          toggleKeyboardTest: "Teste de teclado alternado",
        },
        shortcutHelp: {
          title: "Atalhos do Teclado:",
          toggleTheme: "Alternar tema: {{key}}",
          toggleLanguage: "Alternar idioma: {{key}}",
          globalToggleApp: "Alternar visibilidade: {{key}}",
          toggleKeyboardTest: "Alternar teste de teclado: {{key}}",
        },
      },
    },
    zh: {
      translation: {
        appName: "electron-shadcn",
        titleHomePage: "首页",
        titleSecondPage: "第二页",
        titleStateDemoPage: "状态管理演示",
        shortcutMessages: {
          toggleTheme: "主题已切换",
          toggleLanguage: "语言已切换",
          toggleKeyboardTest: "键盘测试已切换",
        },
        shortcutHelp: {
          title: "键盘快捷键：",
          toggleTheme: "切换主题：{{key}}",
          toggleLanguage: "切换语言：{{key}}",
          globalToggleApp: "切换应用可见性：{{key}}",
          toggleKeyboardTest: "切换键盘测试：{{key}}",
        },
      },
    },
  },
})
