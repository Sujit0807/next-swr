import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />      // for adding common part in all components
}

export default MyApp
