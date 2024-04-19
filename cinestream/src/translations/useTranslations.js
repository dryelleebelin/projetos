import { useState, useEffect } from 'react'

export default function useTranslations(){
  const [language, setLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem('@languageCinestream')
    return storedLanguage ? storedLanguage : 'portuguese'
  })

  const [translations, setTranslations] = useState({})

  useEffect(() => {    
    const loadTranslations = async () => {
      try {
        const languageData = await import(`../translations/${language}.json`)
        setTranslations(languageData.default)
      } catch (error) {
        console.error(translations.errorLoadingTranslations, error)
      }
    }

    loadTranslations()
  }, [language])

  return translations
}
