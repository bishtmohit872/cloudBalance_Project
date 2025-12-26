import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'react-hot-toast'

import { RouterProvider } from 'react-router-dom'
import routes from './Routes/routes.jsx'

import { QueryClientProvider,QueryClient} from '@tanstack/react-query'

import store,{persistor} from './redux/store.js'
import { Provider } from 'react-redux' //this package is used for providing the store to whole scope of out application
import { PersistGate } from 'redux-persist/integration/react'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Toaster/>
          <RouterProvider router={routes}/>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
