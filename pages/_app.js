import 'tailwindcss/tailwind.css'
import '../styles/globals.css';
import { supabase } from '../utils/supabaseClient'
import { Auth } from '@supabase/ui'
import { AuthProvider } from "../utils/supabaseClient"

function MyApp({ Component, pageProps }) {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
	    <Component {...pageProps} />
	  </Auth.UserContextProvider>
  )
}

export default MyApp
