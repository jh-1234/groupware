package com.project.groupware.repository;

import com.project.groupware.constants.FileConstants;
import com.project.groupware.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface FileRepository extends JpaRepository<File, Long> {

    List<File> findAllByModuleTypeAndModuleIdAndIsDeleted(FileConstants.Module module, Long moduleId, Boolean isDeleted);

    List<File> findByModuleTypeAndModuleIdInAndIsDeleted(FileConstants.Module module, Set<Long> moduleIds, Boolean isDeleted);

    List<File> findAllByIsDeleted(Boolean isDeleted);

    @Modifying
    @Query("update File f set f.isDeleted = true where f.fileId = :fileId and f.isDeleted = false")
    void remove(@Param("fileId") Long fileId);

    @Modifying
    @Query("update File f set f.isDeleted = true where f.fileId in :fileIds and f.isDeleted = false")
    void remove(@Param("fileIds") Set<Long> fileIds);

    @Modifying
    @Query("update File f set f.isFileDeleted = true where f.fileId = :fileId and f.isFileDeleted = false")
    void fileRemove(@Param("fileId") Long fileId);
}
