import { getErrorMessage } from "@/src/lib/common/exceptions/errors";
import { fileApi } from "@/src/lib/core/api";
import { fileUrl } from "@/src/lib/core/file";
import { useRef, useState } from "react";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp'];

interface Props {
    value: string | null;                         // Name of the uploaded file.
    onChange: (filename: string | null) => void;
    onUploadingChange?: (uploading: boolean) => void;
}
export default function ImageUploader({ value, onChange, onUploadingChange }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = ''; // Allow selecting the same file again.
        if (!file) return;

        setError(null);
        if (!ALLOWED.includes(file.type)) {
            setError('Only JPG, PNG, and WEBP files are supported.');
            return;
        }
        if (file.size > MAX_SIZE) {
            setError('File size must not exceed 5 MB.');
            return;
        }

        setUploading(true);
        onUploadingChange?.(true);
        try {
            onChange(await fileApi.upload(file));
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setUploading(false);
            onUploadingChange?.(false);
        }
    };

    return (
        <div>
            <p className="mb-1.5 block text-sm font-medium text-slate-700">Image</p>
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-4 transition hover:border-blue-300 hover:bg-blue-50/30">
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFile}
                    className="hidden"
                />
                <div className="flex items-center gap-3">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-400">
                        {value ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={fileUrl(value)} alt="Asset image preview" className="h-full w-full object-cover" />
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
                                <path d="M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5v10a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-10Z" stroke="currentColor" strokeWidth="1.6" />
                                <circle cx="9" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.6" />
                                <path d="m5 17 4-4 3 3 2-2 5 4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                            </svg>
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-800">
                            {value ? 'Image added' : 'Add an asset image'}
                        </p>
                        <p className="mt-0.5 text-xs leading-5 text-slate-500">
                            JPG, PNG, or WEBP · Up to 5 MB
                        </p>
                    </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        disabled={uploading}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {uploading ? 'Uploading...' : value ? 'Change image' : 'Choose file'}
                    </button>
                    {value && !uploading && (
                        <button
                            type="button"
                            onClick={() => onChange(null)}
                            className="rounded-lg px-3 py-2 text-xs font-medium text-rose-600 transition hover:bg-rose-50 focus:outline-none focus:ring-4 focus:ring-rose-500/10"
                        >
                            Remove image
                        </button>
                    )}
                </div>
            </div>
            {error && <p role="alert" className="mt-2 text-xs text-rose-600">{error}</p>}
        </div>
    );
}