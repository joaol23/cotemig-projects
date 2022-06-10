import { BrowserRouter, Route, Routes } from "react-router-dom";

import { FilesPage } from "./UI/components/FilesPage/FilesHome";
import { Header } from './UI/components/Header/Header';

export const Maps = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={FilesPage()} />
            </Routes>
        </BrowserRouter>
    )
}

