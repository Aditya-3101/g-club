import './App.css';
import React from 'react';
import {Home} from './components/Home/Home.tsx';
import { HomeLayout } from './components/layout/HomeLayout.tsx';
import {NavigationLayout} from './components/layout/NavigationLayout.tsx'
import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider,useRouteError} from 'react-router-dom';
import { loader as gamesLoader } from './components/Game/MainPage.tsx';
import {AliveScope} from 'react-activation'
import { ErrorWall } from './components/ErrorBoundry/ErrorWall.tsx';

const MainPage = React.lazy(()=>import('./components/Game/MainPage.tsx').then(module=>({default:module.MainPage})))
const GamePage = React.lazy(()=>import('./components/Game/GamePage.tsx'))
const DownloadPage = React.lazy(()=>import('./components/Downloads/Downloads.tsx').then(module=>({default:module.Downloads})))

interface ErrorResponse {
  code: number;
  status: string;
  message?: string;
  statusText?:string
}


const ErrorBoundary:React.FC = () => {
  const error = useRouteError() as ErrorResponse;
  return <ErrorWall error={error} />
}


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<HomeLayout/>}>
      <Route index element={<Home/>} errorElement={<ErrorBoundary/>}/>
      <Route element={<NavigationLayout/>}>
        <Route path="/:type" element={<MainPage/>} loader={gamesLoader} errorElement={<ErrorBoundary/>}/>
        <Route path="/games/search" element={<GamePage/>} errorElement={<ErrorBoundary/>}/>
        <Route path="/games/:game_name" element={<GamePage/>} errorElement={<ErrorBoundary/>}/>
        <Route path="/downloads" element={<DownloadPage/>} errorElement={<ErrorBoundary/>} />
      </Route>
    </Route>
    <Route path="*" element={<h1>Not Found!</h1>}/>
    </>
  )
)

const App:React.FC = ():JSX.Element => {
  return <AliveScope>
    <RouterProvider router={router} />
  </AliveScope>
  
}

export default App;
