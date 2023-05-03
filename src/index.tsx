import React, {lazy, Suspense} from "react";
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './style.css';

const Main = lazy(() => import("./pages/main/App"));
const SalsaEncoder = lazy(() => import("./pages/salsa/encoder/App"));
const AdfgvxEncoder = lazy(() => import("./pages/adfgvx/encoder/App"));
const PlayfairEncoder = lazy(() => import("./pages/playfair/encoder/App"));
const DesEncoder = lazy(() => import("./pages/des/encoder/App"));
const SalsaDecoder = lazy(() => import("./pages/salsa/decoder/App"));
const AdfgvxDecoder = lazy(() => import("./pages/adfgvx/decoder/App"));
const PlayfairDecoder = lazy(() => import("./pages/playfair/decoder/App"));
const DesDecoder = lazy(() => import("./pages/des/decoder/App"));

const Sha256Hash = lazy(() => import("./pages/sha256/hash/App"));

export const main = "/";
export const adfgvx_encoder = "/encoder/adfgvx";
export const playfair_encoder = "/encoder/playfair";
export const salsa_encoder = "/encoder/salsa";
export const des_encoder = "/encoder/des";
export const salsa_decoder = "/decoder/salsa";
export const adfgvx_decoder = "/decoder/adfgvx";
export const playfair_decoder = "/decoder/playfair";
export const des_decoder = "/decoder/des";

export const sha256_hash = "/hash/sha256";

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
                <Route path={des_encoder} element={<DesEncoder/>}/>
                <Route path={des_decoder} element={<DesDecoder/>}/>
                <Route path={sha256_hash} element={<Sha256Hash/>}/>
            </Routes>
        </Suspense>
    </Router>,
    document.getElementById("root")
);
