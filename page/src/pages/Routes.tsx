import { BrowserRouter, Route, Routes } from "react-router-dom";

import { FilesPage } from "../UI/components/FilesPage/FilesHome";
import { DetailsPage } from "../UI/components/DetailsFile/DetailsFiles";
import { Header } from '../UI/components/Header/Header';
import { Home } from '../UI/components/Home/Home';

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
            </Routes>
        </BrowserRouter>
    )
}

