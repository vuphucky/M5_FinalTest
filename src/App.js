import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SongTable from "./components/SongTable";
import AddSongForm from "./components/AddSongForm";
import { getSongs } from "./api/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const [songs, setSongs] = useState([]);
    const [search, setSearch] = useState("");
    const [currentSong, setCurrentSong] = useState(null);

    useEffect(() => {
        fetchSongs();
    }, []);

    const fetchSongs = () => {
        getSongs().then((data) => setSongs(data));
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const filteredSongs = songs.filter((song) =>
        song.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelectSong = (song) => {
        setCurrentSong(song);
    };

    return (
        <Router>
            <div className="container mt-4">
                <ToastContainer/>
                <nav className="mb-4 d-flex justify-content-between align-items-center">
                    <h2>Kho nhạc</h2>
                    <div className="d-flex align-items-center">
                        <Link to="/add-song" className="btn btn-success">
                            Đăng ký bài hát
                        </Link>
                    </div>
                </nav>
                <div className="d-flex justify-content-end align-items-center">
                    <input
                        type="text"
                        className="form-control me-2"
                        style={{width: "200px"}}
                        placeholder="Tìm kiếm bài hát..."
                        value={search}
                        onChange={handleSearch}
                    />
                </div>

                    <Routes>
                        <Route
                            path="/"
                            element={
                                <div>
                                    {currentSong && (
                                        <div className="mb-4 p-3 border bg-light">
                                            <h3>{currentSong.name}</h3>
                                            <p>{currentSong.singer}</p>
                                            <button className="btn btn-primary">Phát nhạc</button>
                                        </div>
                                    )}
                                    <SongTable
                                        songs={filteredSongs}
                                        onSelectSong={handleSelectSong}
                                        fetchSongs={fetchSongs}
                                    />
                                </div>
                            }
                        />
                        <Route
                            path="/add-song"
                            element={
                                <AddSongForm
                                    onSuccess={() => {
                                        fetchSongs();
                                        window.location.href = "/"; // Quay về kho nhạc
                                    }}
                                />
                            }
                        />
                    </Routes>
                </div>
        </Router>
);
};

export default App;