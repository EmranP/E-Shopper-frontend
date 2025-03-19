import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from './app/providers/router'
import './app/styles/global.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter />
	</StrictMode>
)
