import React from "react";
import AddSongForm from "../components/AddSongForm";
import { toast } from "react-toastify";

const AddSongPage = ({ onSongAdded }) => {
    const handleSuccess = () => {
        toast.success("Bài hát đã được đăng ký thành công!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            pauseOnHover: true,
            draggable: true,
        });
        if (onSongAdded) onSongAdded();
    };

    return (
        <div>
            <h1>Đăng ký bài hát </h1>
            <AddSongForm onSuccess={handleSuccess} />
        </div>
    );
};

export default AddSongPage;