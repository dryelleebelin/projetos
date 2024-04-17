import axios from "axios"
import { useEffect } from "react" // Importando useEffect para poder usá-lo
import useTranslations from "../translations/useTranslations"

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: "df4556586815e5b2b94838a7bf5c822b",
  }
})

// Exporte a instância do Axios como um export padrão
export default api

// Crie um componente funcional para configurar o idioma na instância do Axios
export function useLanguageInterceptor() {
  const { translations } = useTranslations() // Chama o hook useTranslations

  useEffect(() => {
    // Atualiza a instância do Axios para incluir o idioma atual
    const interceptor = api.interceptors.request.use(config => {
      config.params = {
        ...config.params,
        language: translations.language === 'pt-BR' ? 'pt-BR' : 'en'
      }
      return config
    })

    return () => {
      // Remove o interceptor ao desmontar o componente
      api.interceptors.request.eject(interceptor)
    }
  }, [translations])

  // Retorna null porque este hook não precisa retornar nenhum componente
  return null
}
