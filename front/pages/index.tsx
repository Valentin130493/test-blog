import type { NextPage } from 'next'
import Index from "./auth-page/index";
import styles from '../styles/Home.module.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
    <Index/>
    </div>
  )
}

export default Home
