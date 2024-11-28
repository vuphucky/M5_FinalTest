import React, { useState } from "react";
import { addSong } from "../api/api";
import { toast } from "react-toastify";

const AddSongForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        singer: "",
        composer: "",
        duration: "",
        likes: 0,
        status: "Lưu trữ",
    });

    const [errors, setErrors] = useState({});


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Tên bài hát không được để trống.";
        if (!formData.singer.trim()) newErrors.singer = "Ca sĩ không được để trống.";
        if (formData.singer.length > 30)
            newErrors.singer = "Tên ca sĩ không được quá 30 ký tự.";
        if (!formData.composer.trim()) newErrors.composer = "Nhạc sĩ không được để trống.";
        if (formData.composer.length > 30)
            newErrors.composer = "Tên nhạc sĩ không được quá 30 ký tự.";
        if (!formData.duration.trim())
            newErrors.duration = "Thời gian phát không được để trống.";
        if (!/^\d{2}:\d{2}$/.test(formData.duration))
            newErrors.duration = "Thời gian phát phải đúng định dạng hh:mm.";
        if (formData.likes < 0) newErrors.likes = "Số lượt yêu thích phải lớn hơn hoặc bằng 0.";
        return newErrors;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        addSong(formData)
            .then(() => {
                setFormData({
                    name: "",
                    singer: "",
                    composer: "",
                    duration: "",
                    likes: 0,
                    status: "Lưu trữ",
                });
                toast.success("Bài hát đã được thêm thành công!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                if (onSuccess) onSuccess();
            })
            .catch((error) => {
                toast.error("Có lỗi xảy ra khi thêm bài hát!");
                console.error(error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Tên bài hát</label>
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <small className="text-danger">{errors.name}</small>}
            </div>
            <div className="mb-3">
                <label className="form-label">Ca sĩ</label>
                <input
                    type="text"
                    name="singer"
                    className="form-control"
                    value={formData.singer}
                    onChange={handleChange}
                />
                {errors.singer && <small className="text-danger">{errors.singer}</small>}
            </div>
            <div className="mb-3">
                <label className="form-label">Nhạc sĩ</label>
                <input
                    type="text"
                    name="composer"
                    className="form-control"
                    value={formData.composer}
                    onChange={handleChange}
                />
                {errors.composer && <small className="text-danger">{errors.composer}</small>}
            </div>
            <div className="mb-3">
                <label className="form-label">Thời gian phát (hh:mm)</label>
                <input
                    type="text"
                    name="duration"
                    className="form-control"
                    value={formData.duration}
                    onChange={handleChange}
                />
                {errors.duration && <small className="text-danger">{errors.duration}</small>}
            </div>


            <button type="submit" className="btn btn-primary">
                Thêm bài hát
            </button>
        </form>
    );
};

export default AddSongForm;