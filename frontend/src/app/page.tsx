import dynamic from 'next/dynamic'
 
const HomePage = dynamic(() => import('./components/HomePage'), { ssr: false })
 
export default function Home() {
  return (<HomePage />
  )
}

// import HomeWrapper from './components/HomeWrapper';

// export default function Home() {
//   return <HomeWrapper />;
// }
