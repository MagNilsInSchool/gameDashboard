import { useEffect, useRef, useState } from "react";
import "./imgSelector.css";

interface Props {
    name?: string;
    initialSrc?: string;
    onFileChange?: (file: File | null) => void;
    maxSize?: number;
}
const defaultAvatar = "/assets/icons/user-filled.svg";

const ImgSelector: React.FC<Props> = ({ name = "profile", initialSrc, onFileChange, maxSize = 2 * 1024 * 1024 }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState(initialSrc || defaultAvatar);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!file) return;
        const url = URL.createObjectURL(file);
        setPreview(url);
        onFileChange?.(file);
        return () => URL.revokeObjectURL(url);
    }, [file, onFileChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] ?? null;
        if (!f) {
            setFile(null);
            setError(null);
            onFileChange?.(null);
            return;
        }
        if (f.size > maxSize) {
            setError(
                `File is too large (${(f.size / 1024 / 1024).toFixed(2)} MB). Max ${(maxSize / 1024 / 1024).toFixed(
                    2
                )} MB.`
            );
            setFile(null);
            if (inputRef.current) inputRef.current.value = "";
            onFileChange?.(null);
            return;
        }
        setError(null);
        setFile(f);
    };
    const handleBrowseButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        inputRef.current?.click();
    };
    return (
        <label className="image-selector">
            <span className="image-selector__label">Profile Picture</span>
            <img src={preview} alt="Profile preview" className="image-selector__img" />
            <button className="image-selector__button" onClick={handleBrowseButton} type="button">
                BROWSE
            </button>

            {error && (
                <div role="alert" className="image-selector__error">
                    {error}
                </div>
            )}
            <input
                ref={inputRef}
                type="file"
                name={name}
                accept="image/*"
                onChange={handleChange}
                className="sr-only"
                aria-label="Upload profile image"
            />
        </label>
    );
};

export default ImgSelector;
