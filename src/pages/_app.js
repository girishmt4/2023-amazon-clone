import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { Provider } from 'react-redux'
import { store } from '../store/index'


export default function App({ Component, pageProps }) {
  return (<SessionProvider session={pageProps.session}>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </SessionProvider>)
}
