import type {NextPage} from 'next'
import AuthPage from "./auth-page/index";
import styles from '../styles/Home.module.css'


const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <AuthPage/>
        </div>
    )
}

export default Home
