package com.smartops.smartops_backend.modules.asset.controllers;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.smartops.smartops_backend.modules.asset.services.StorageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/files")
@RequiredArgsConstructor
public class FileController {

    private final StorageService storage;

    public record UploadResponse(String filename) {
    }

    @PostMapping("/upload")
    public UploadResponse upload(@RequestParam("file") MultipartFile file) {
        return new UploadResponse(storage.save(file));
    }

    @GetMapping("/{filename}")
    public ResponseEntity<Resource> get(@PathVariable String filename) {
        Resource resource = storage.load(filename);
        MediaType type = MediaTypeFactory.getMediaType(resource)
                .orElse(MediaType.APPLICATION_OCTET_STREAM);

        return ResponseEntity.ok()
                .contentType(type)
                .header(HttpHeaders.CACHE_CONTROL, "public, max-age=31536000, immutable")
                .body(resource);
    }

}
