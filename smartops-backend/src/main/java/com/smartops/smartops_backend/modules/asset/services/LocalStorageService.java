package com.smartops.smartops_backend.modules.asset.services;

import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.smartops.smartops_backend.common.exceptions.BusinessException;
import com.smartops.smartops_backend.common.exceptions.ErrorCode;

@Service
public class LocalStorageService implements StorageService {

    private static final Map<String, String> ALLOWED = Map.of(
            "image/jpeg", "jpg",
            "image/png", "png",
            "image/webp", "webp");

    private final Path root;

    public LocalStorageService(@Value("${app.upload.dir}") String dir) {
        this.root = Path.of(dir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(root);
        } catch (IOException e) {
            throw new UncheckedIOException("Cannot create upload dir", e);
        }
    }

    @Override
    public String save(MultipartFile file) {
        if (file.isEmpty()) {
            throw new BusinessException(ErrorCode.FILE_EMPTY);
        }
        String ext = ALLOWED.get(file.getContentType());
        if (ext == null) {
            throw new BusinessException(ErrorCode.FILE_TYPE_NOT_ALLOWED);
        }

        String filename = UUID.randomUUID() + "." + ext;
        try (InputStream in = file.getInputStream()) {
            Files.copy(in, root.resolve(filename));
        } catch (IOException e) {
            throw new UncheckedIOException("Cannot save file", e);
        }
        return filename;
    }

    @Override
    public Resource load(String filename) {
        Path file = root.resolve(filename).normalize();
        if (!file.startsWith(root) || !Files.isReadable(file)) {
            throw new BusinessException(ErrorCode.FILE_NOT_FOUND);
        }
        return new FileSystemResource(file);
    }

    @Override
    public void delete(String filename) {
        if (filename == null || filename.isBlank())
            return;
        Path file = root.resolve(filename).normalize();
        if (!file.startsWith(root))
            return;
        try {
            Files.deleteIfExists(file);
        } catch (IOException e) {
            // ลบไม่ได้ไม่ควรทำให้คำขอหลักล้มเหลว (ควร log ไว้)
        }
    }
}
