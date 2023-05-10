import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'Ray';
export const siteTitle = "Next.js sample website";

export default function Layout({children,home}){
    return (
        <div className={styles.container}>
            <Head>
                <link ref="icon" href="/favicon.ico"/>
                <meta
                    name = "description"
                    content="Sample website to learn Next.js"
                />
            </Head>
            <header className={styles.header}>
                {home?(
                    <>
                        <Image
                            priority
                            src="/images/profile.jpg"
                            className={utilStyles.borderCircle}
                            height={144}
                            width={144}
                            alt="annoyed"
                        />
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                        <Link href="/post/first-post">First Post</Link>
                    </>
                    
                ):(
                    <>
                        <Link href="/">
                            <Image
                                priority
                                src="/images/profile.jpg"
                                className={utilStyles.borderCircle}
                                height={108}
                                width={108}
                                alt="calm"
                            />
                        </Link>
                        <h2 className={utilStyles.headingLg}>
                            <Link href="/" className={utilStyles.colorInherit}>{name}</Link>
                        </h2>
                    </>
                )
                }
            </header>
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">← Back to home</Link>
                </div>
            )}
        </div>
    )
}