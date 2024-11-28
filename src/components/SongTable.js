import React, { useState } from "react";
import { updateSongStatus } from "../api/api";

const SongTable = ({ songs, onSelectSong, fetchSongs }) => {
    const [modalData, setModalData] = useState(null);
    const [toastMessage, setToastMessage] = useState("");

    const handleConfirmPublic = () => {
        updateSongStatus(modalData.id, "Công khai").then(() => {
            fetchSongs();
            setToastMessage(`Bài hát "${modalData.name}" đã được công khai!`);
            setModalData(null);
        });
    };

    return (
        <div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên bài hát</th>
                    <th>Ca sĩ</th>
                    <th>Thời gian phát</th>
                    <th>Số lượt yêu thích</th>
                    <th>Trạng thái</th>
                    <th>Chức năng</th>
                </tr>
                </thead>
                <tbody>
                {songs.map((song, index) => (
                    <tr key={song.id}>
                        <td>{index + 1}</td>
                        <td
                            onClick={() => onSelectSong(song)}
                            style={{ cursor: "pointer", color: "blue" }}
                        >
                            {song.name}
                        </td>
                        <td>{song.singer}</td>
                        <td>{song.duration}</td>
                        <td>{song.likes}</td>
                        <td>{song.status}</td>
                        <td>
                            {song.status === "Lưu trữ" && (
                                <button
                                    className="btn btn-warning btn-sm"
                                    onClick={() => setModalData(song)}
                                >
                                    Công khai
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>


            {modalData && (
                <div
                    className="modal fade show"
                    style={{ display: "block" }}
                    tabIndex="-1"
                    role="dialog"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Xác nhận</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setModalData(null)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    Bạn có chắc chắn muốn công khai bài hát{" "}
                                    <strong>{modalData.name}</strong> không?
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setModalData(null)}
                                >
                                    Hủy
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleConfirmPublic}
                                >
                                    Công khai
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {toastMessage && (
                <div
                    className="toast show position-fixed bottom-0 end-0 p-3"
                    role="alert"
                    style={{ zIndex: 1055 }}
                >
                    <div className="toast-header">
                        <strong className="me-auto">Thông báo</strong>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setToastMessage("")}
                        ></button>
                    </div>
                    <div className="toast-body">{toastMessage}</div>
                </div>
            )}
        </div>
    );
};

export default SongTable;