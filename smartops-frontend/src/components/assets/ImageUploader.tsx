import { getErrorMessage } from "@/src/lib/common/exceptions/errors";
import { fileApi } from "@/src/lib/core/api";
import { fileUrl } from "@/src/lib/core/file";
import { useRef, useState } from "react";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp'];

interface Props {
    value: string | null;                         // ชื่อไฟล์ที่อัปโหลดแล้ว
    onChange: (filename: string | null) => void;
    onUploadingChange?: (uploading: boolean) => void;
}
export default function ImageUploader({ value, onChange, onUploadingChange }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = ''; // ให้เลือกไฟล์เดิมซ้ำได้
        if (!file) return;

        setError(null);
        if (!ALLOWED.includes(file.type)) {
            setError('รองรับเฉพาะไฟล์ JPG, PNG, WEBP');
            return;
        }
        if (file.size > MAX_SIZE) {
            setError('ไฟล์ต้องไม่เกิน 5 MB');
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
            <label className="block text-sm font-medium text-gray-700 mb-1">รูปภาพ</label>

            <div className="flex items-center gap-4">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded border bg-gray-50 flex items-center justify-center text-xs text-gray-400">
                    {value ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={fileUrl(value)} alt="" className="h-full w-full object-cover" />
                    ) : (
                        'ไม่มีรูป'
                    )}
                </div>

                <div className="space-y-2">
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleFile}
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        disabled={uploading}
                        className="px-3 py-1.5 rounded border text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                        {uploading ? 'กำลังอัปโหลด...' : value ? 'เปลี่ยนรูป' : 'เลือกรูป'}
                    </button>

                    {value && !uploading && (
                        <button
                            type="button"
                            onClick={() => onChange(null)}
                            className="block text-sm text-red-600 hover:underline"
                        >
                            ลบรูป
                        </button>
                    )}
                </div>
            </div>

            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>
    );
}