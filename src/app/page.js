import dynamic from 'next/dynamic';


export default function Home() {
  // Import the Map component without SSR
  const MapWithNoSSR = dynamic(() => import('./components/Map'), {
    ssr: false,
    loading: () => <p>Loading...</p>
  });
  return (
    <div>
      <MapWithNoSSR />
    </div>
  );
}
