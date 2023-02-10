import { useRouter } from "next/router"
import Link from "next/link"
import Head from "next/head"
const CoffeeStore = () => {
    const router = useRouter()
    
    return (
        <>
         <Head>
            <title>{router.query.id}</title>
         </Head>
        <div>Coffee Store Page {router.query.id}

        <Link href="/">Back to Home</Link>
        <br></br>
        <Link href="/coffee-store/dynamic">go to page dynamic</Link></div>
        </>
        
    )
}

export default CoffeeStore