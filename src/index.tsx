import React, {lazy, Suspense} from "react";
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './style.css';

const Main = lazy(() => import("./pages/main/App"));
const SalsaEncoder = lazy(() => import("./pages/encoder_salsa/App"));
const SalsaDecoder = lazy(() => import("./pages/decoder_salsa/App"));
const AdfgvxEncoder = lazy(() => import("./pages/encoder_adfgvx/App"));
const AdfgvxDecoder = lazy(() => import("./pages/decoder_adfgvx/App"));
const PlayfairEncoder = lazy(() => import("./pages/encoder_playfair/App"));
const PlayfairDecoder = lazy(() => import("./pages/decoder_playfair/App"));
export const main = "/";
export const salsa_encoder = "/encoder_salsa";
export const salsa_decoder = "/decoder_salsa";
export const adfgvx_encoder = "/encoder_adfgvx";
export const adfgvx_decoder = "/decoder_adfgvx";
export const playfair_encoder = "/encoder_playfair";
export const playfair_decoder = "/decoder_playfair";
ReactDOM.render(
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path={main} element={<Main/>}/>
                <Route path={adfgvx_encoder} element={<AdfgvxEncoder/>}/>
                <Route path={adfgvx_decoder} element={<AdfgvxDecoder/>}/>
                <Route path={playfair_encoder} element={<PlayfairEncoder/>}/>
                <Route path={playfair_decoder} element={<PlayfairDecoder/>}/>
                <Route path={salsa_encoder} element={<SalsaEncoder/>}/>
                <Route path={salsa_decoder} element={<SalsaDecoder/>}/>
            </Routes>
        </Suspense>
    </Router>,
    document.getElementById("root")
);
