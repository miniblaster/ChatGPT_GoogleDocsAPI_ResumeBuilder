import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import ReactGA from 'react-ga4';
import RegisterInformation from './components/RegisterInformation';
import Layout from "./components/Layout";
import ErrorPage from "./components/Error/404";

// ReactGA.initialize(process.env.TRACKING_ID);

export default function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<RegisterInformation />} />
          </Route>
          <Route path="*" errorElement={<ErrorPage />} element={<div><h1>Not found</h1><NavLink to="/">go Home</NavLink></div>} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}