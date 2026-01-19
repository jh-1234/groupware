package com.project.groupware.service;

import com.project.groupware.constants.FileConstants;
import com.project.groupware.dto.FileDTO;
import com.project.groupware.entity.File;
import com.project.groupware.properties.StorageProperties;
import com.project.groupware.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class FileService {

    private final FileRepository fileRepository;

    private final StorageProperties storageProperties;

    public List<File> save(List<MultipartFile> files, FileConstants.Module module, Long moduleId) {
        if (Objects.nonNull(files)) {
            return files
                    .stream()
                    .filter(file -> Objects.nonNull(file) && !file.isEmpty())
                    .map(file -> save(file, module, moduleId))
                    .toList();
        }

        return Collections.emptyList();
    }

    public File save(MultipartFile file, FileConstants.Module module, Long moduleId) {
        String originalFilename = file.getOriginalFilename();

        if (!StringUtils.hasText(originalFilename) || !originalFilename.contains(".")) {
            throw new IllegalArgumentException();
        }

        int pos = originalFilename.lastIndexOf(".");
        String filename = originalFilename.substring(0, pos);
        String ext = Objects.requireNonNull(originalFilename).substring(pos).toLowerCase();

        // 모듈별로 다른 폴더에 저장하기 위함
        String modulePath = module.getPath();

        if (!StringUtils.hasText(modulePath)) {
            throw new IllegalArgumentException();
        }

        FileConstants.File fileType = FileConstants.File.getFileType(file.getContentType(), ext);

        String uploadDir = storageProperties.paths().get(fileType).uploadPath();
        String loadDir = storageProperties.paths().get(fileType).loadPath();

        Path dir = Path.of(uploadDir, modulePath);

        // 디렉토리가 없다면 생성
        directoryCheck(dir);

        String uploadFilename = UUID.randomUUID().toString().concat(ext);
        Path savePath = Path.of(uploadDir, modulePath, uploadFilename);
        Path loadPath = Path.of(loadDir, modulePath, uploadFilename);

        File fileEntity = new File();
        fileEntity.setOriginalName(originalFilename);
        fileEntity.setUploadName(uploadFilename);
        fileEntity.setBasename(filename);
        fileEntity.setFileExt(ext);
        fileEntity.setFileSize(file.getSize());
        fileEntity.setFilePath(savePath.toString());
        fileEntity.setFileLoadPath(loadPath.toString());
        fileEntity.setModuleType(module);
        fileEntity.setModuleId(moduleId);

        File saveFile = fileRepository.save(fileEntity);

        try {
            file.transferTo(savePath);

            return saveFile;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private void directoryCheck(Path dir) {
        if (Files.notExists(dir)) {
            try {
                Files.createDirectories(dir);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public List<FileDTO> getFiles(FileConstants.Module module, Long moduleId) {
        return findByModuleTypeAndModuleId(module, moduleId).stream().map(file -> new FileDTO(file.getFileId(), file.getBasename(), file.getFileLoadPath())).toList();
    }

    public Map<Long, List<FileDTO>> getAllFiles(FileConstants.Module module, Set<Long> moduleIds) {
        return findByModuleTypeAndModuleIdIn(module, moduleIds).stream().collect(Collectors.groupingBy(com.project.groupware.entity.File::getModuleId, Collectors.mapping(file -> new FileDTO(file.getFileId(), file.getBasename(), file.getFileLoadPath()), Collectors.toList())));
    }

    private List<File> findByModuleTypeAndModuleId(FileConstants.Module module, Long moduleId) {
        return fileRepository.findAllByModuleTypeAndModuleIdAndIsDeleted(module, moduleId, false);
    }

    private List<File> findByModuleTypeAndModuleIdIn(FileConstants.Module module, Set<Long> moduleIds) {
        return fileRepository.findByModuleTypeAndModuleIdInAndIsDeleted(module, moduleIds, false);
    }

    public void remove(Long fileId) {
        fileRepository.remove(fileId);
    }

    public void remove(Set<Long> fileIds) {
        fileRepository.remove(fileIds);
    }

    public void fileRemove(Long fileId) {
        fileRepository.fileRemove(fileId);
    }

    public List<File> getRemoveTargetList() {
        return fileRepository.findAllByIsDeleted(true);
    }
}
