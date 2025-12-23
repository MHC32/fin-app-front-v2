import { Routes, Route } from 'react-router-dom'
import { YStack } from 'tamagui'



function App() {
  return (
    <YStack flex={1} backgroundColor="$background">
      <div style={{ padding: '20px', color: 'white' }}>
        <h1>🇭🇹 FinApp Haiti</h1>
        <p>Setup réussi! L'application React + Vite + Tamagui + Redux fonctionne.</p>
        <div style={{ marginTop: '20px' }}>
          <h2>✅ Dépendances installées:</h2>
          <ul>
            <li>React 18.3.1</li>
            <li>Vite 5.0.11</li>
            <li>Tamagui (Core + Config + Themes)</li>
            <li>Redux Toolkit + React Redux</li>
            <li>React Router DOM</li>
            <li>Axios</li>
            <li>Recharts</li>
            <li>Date-fns</li>
            <li>React Hook Form + Zod</li>
            <li>Framer Motion</li>
            <li>Lucide React</li>
          </ul>
        </div>
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: 'rgba(139, 92, 246, 0.2)', borderRadius: '10px' }}>
          <h3>🚀 Prochaine étape:</h3>
          <p>Créer les composants UI et les pages de l'application</p>
        </div>
      </div>
      
      
    </YStack>
  )
}

export default App