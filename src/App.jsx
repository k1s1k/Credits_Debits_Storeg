import React from 'react';
import MainPage from "./pages/MainPage/MainPage.jsx";
import { AddItemProvider } from "./app/provider/AddItemProvider/AddItemProvider.jsx";

const App = () => {
    return (
        <AddItemProvider>
            <MainPage/>
        </AddItemProvider>
    );
};

export default App;