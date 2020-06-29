import Head from 'next/head'
import Nav from '../components/nav'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>首页</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav/>
    </div>
  )
}
