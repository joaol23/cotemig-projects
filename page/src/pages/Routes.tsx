import { BrowserRouter, Route, Routes } from "react-router-dom";

import { FilesPage } from "../UI/components/FilesPage/FilesHome";
import { DetailsPage } from "../UI/components/DetailsFile/DetailsFiles";
import { Header } from '../UI/components/Header/Header';
import { Home } from '../UI/components/Home/Home';
import { MemeGenerator } from "../UI/components/MemeGenerator/MemeGenerator";
import { Error } from '../UI/components/Error/Error';

export const Maps = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/files-states' element={<FilesPage />} />
                <Route path="/details-file" element={<DetailsPage />}>
                    <Route path=":id" element={<DetailsPage />} />
                </Route>
                <Route path='/meme-generator' element={<MemeGenerator />} />
                <Route path="*" element={ <Error/> } />
            </Routes>
        </BrowserRouter>
    )
}

