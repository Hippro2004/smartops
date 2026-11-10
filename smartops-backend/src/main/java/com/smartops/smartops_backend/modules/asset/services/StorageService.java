package com.smartops.smartops_backend.modules.asset.services;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    String save(MultipartFile file);

    Resource load(String filename);

    void delete(String name);
}
