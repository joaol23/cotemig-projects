import { BrowserRouter, Route, Routes } from "react-router-dom";

import { FilesPage } from "./pages/states";
import { DetailsPage } from "./pages/details-state";
import { Header } from './UI/components/Header';
import { Home } from './pages/Home';
import { Memes } from "./pages/memes";
import { Error } from './UI/components/Error';

export const Maps = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/states' element={<FilesPage />} />
                <Route path="/details-state" element={<DetailsPage />}>
                    <Route path=":id" element={<DetailsPage />} />
                </Route>
                <Route path='/memes' element={<Memes />} />
                <Route path="*" element={ <Error/> } />
            </Routes>
        </BrowserRouter>
    )
}

