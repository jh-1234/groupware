package com.project.groupware.service;

import com.project.groupware.constants.FileConstants;
import com.project.groupware.dto.FileDTO;
import com.project.groupware.dto.PostCategoryDTO;
import com.project.groupware.dto.PostCommentDTO;
import com.project.groupware.dto.PostDTO;
import com.project.groupware.entity.Post;
import com.project.groupware.entity.PostComment;
import com.project.groupware.entity.PostLikeEmployeeMapping;
import com.project.groupware.repository.PostCategoryRepository;
import com.project.groupware.repository.PostCommentRepository;
import com.project.groupware.repository.PostLikeEmployeeMappingRepository;
import com.project.groupware.repository.PostRepository;
import com.project.groupware.repository.mapper.PostMapper;
import com.project.groupware.utils.CustomException;
import com.project.groupware.utils.PageObj;
import com.project.groupware.utils.Session;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    private final PostMapper postMapper;

    private final PostCategoryRepository postCategoryRepository;

    private final PostLikeEmployeeMappingRepository postLikeEmployeeMappingRepository;

    private final PostCommentRepository postCommentRepository;

    private final EmployeeService employeeService;

    private final FileService fileService;

    public void postSave(PostDTO dto, List<MultipartFile> images) {
        Post post = new Post();
        post.setCategory(postCategoryRepository.findByCateIdAndIsDeletedFalse(dto.getCateId()).orElseThrow());
        post.setAuthor(employeeService.getActiveEmployee(Session.getSession().empId()).orElseThrow());
        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());

        postRepository.save(post);
        fileService.save(images, FileConstants.Module.POST, post.getPostId());
    }

    public PostDTO getPost(Long postId) {
        PostDTO post = postRepository.getPost(postId);
        List<FileDTO> postFiles = fileService.getFiles(FileConstants.Module.POST, postId);
        post.setFiles(postFiles);

        PostCommentDTO param = new PostCommentDTO();
        param.setPostId(postId);
        param.setEmpId(Session.getSession().empId());

        List<PostCommentDTO> comments = postMapper.getComments(param);
        Set<Long> commentIds = comments.stream().map(PostCommentDTO::getCommentId).collect(Collectors.toSet());
        Map<Long, List<FileDTO>> commentFiles = fileService.getAllFiles(FileConstants.Module.POST_COMMENT, commentIds);
        comments.forEach(comment -> comment.setFiles(commentFiles.get(comment.getCommentId())));

        Map<Long, List<PostCommentDTO>> repliesMap = comments.stream().filter(comment -> Objects.nonNull(comment.getParentId())).collect(Collectors.groupingBy(PostCommentDTO::getRootId));
        List<PostCommentDTO> result = comments.stream().filter(comment -> Objects.isNull(comment.getParentId())).peek(comment -> comment.setReplies(repliesMap.get(comment.getCommentId()))).toList();

        post.setComments(result);

        return post;
    }

    public PageObj<PostDTO> getPosts(Integer cateId, Pageable pageable) {
        Page<PostDTO> posts = postRepository.getPosts(cateId, pageable);

        return new PageObj<>(posts);
    }

    public List<PostCategoryDTO> getPostCategories() {
        return postCategoryRepository.findAllByIsDeletedFalseOrderBySortOrderAsc().stream().map(cate -> new PostCategoryDTO(cate.getCateId(), cate.getCateName())).toList();
    }

    public Optional<Post> findByPostId(Long postId) {
        return postRepository.findByPostIdAndIsDeletedIsFalse(postId);
    }

    public void postUpdate(PostDTO dto, List<MultipartFile> images) {
        Post post = findByPostId(dto.getPostId()).orElseThrow();

        if (!Objects.equals(Session.getSession().empId(), post.getAuthor().getEmpId())) {
            throw new CustomException("Post 작성자 본인이 아닙니다.");
        }

        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());

        fileService.remove(dto.getDeleteFileIds());
        fileService.save(images, FileConstants.Module.POST, post.getPostId());
    }

    public void postDelete(Long postId) {
        Post post = findByPostId(postId).orElseThrow();

        if (!Objects.equals(Session.getSession().empId(), post.getAuthor().getEmpId())) {
            throw new CustomException("Post 작성자 본인이 아닙니다.");
        }

        post.setIsDeleted(true);

        List<FileDTO> files = fileService.getFiles(FileConstants.Module.POST, post.getPostId());
        Set<Long> deleteFileIds = files.stream().map(FileDTO::getFileId).collect(Collectors.toSet());

        fileService.remove(deleteFileIds);
    }

    public void postLikeCountUpdate(PostDTO dto) {
        Post post = findByPostId(dto.getPostId()).orElseThrow();

        if (dto.getIsLiked()) {
            PostLikeEmployeeMapping mapping = postLikeEmployeeMappingRepository.findByPost_PostIdAndEmployee_EmpId(dto.getPostId(), Session.getSession().empId()).orElseThrow();
            postLikeEmployeeMappingRepository.delete(mapping);
            postRepository.decrementLikeCount(post.getPostId());
        } else {
            PostLikeEmployeeMapping mapping = new PostLikeEmployeeMapping();
            mapping.setPost(post);
            mapping.setEmployee(employeeService.getActiveEmployee(Session.getSession().empId()).orElseThrow());

            postLikeEmployeeMappingRepository.save(mapping);
            postRepository.incrementLikeCount(post.getPostId());
        }
    }

    public void postViewCountUpdate(Long postId) {
        postRepository.incrementViewCount(postId);
    }

    public Long commentSave(PostCommentDTO dto, List<MultipartFile> images) {
        PostComment comment = new PostComment();

        if (Objects.nonNull(dto.getParentId())) {
            PostComment replyTarget = findByCommentId(dto.getParentId()).orElseThrow();
            comment.setParent(replyTarget);
            comment.setTarget(replyTarget.getEmployee());
            comment.setPost(replyTarget.getPost());
            comment.setEmployee(employeeService.getActiveEmployee(Session.getSession().empId()).orElseThrow());
            comment.setContent(dto.getContent());

            postCommentRepository.save(comment);
        } else {
            comment.setPost(findByPostId(dto.getPostId()).orElseThrow());
            comment.setEmployee(employeeService.getActiveEmployee(Session.getSession().empId()).orElseThrow());
            comment.setContent(dto.getContent());

            postCommentRepository.save(comment);
        }

        fileService.save(images, FileConstants.Module.POST_COMMENT, comment.getCommentId());

        return comment.getCommentId();
    }

    public void commentUpdate(PostCommentDTO dto, List<MultipartFile> images) {
        PostComment comment = findByCommentId(dto.getCommentId()).orElseThrow();

        if (!Objects.equals(Session.getSession().empId(), comment.getEmployee().getEmpId())) {
            throw new CustomException("댓글 작성자 본인이 아닙니다.");
        }

        comment.setContent(dto.getContent());

        fileService.remove(dto.getDeleteFileIds());
        fileService.save(images, FileConstants.Module.POST_COMMENT, comment.getCommentId());
    }

    public void commentDelete(Long commentId) {
        PostComment comment = findByCommentId(commentId).orElseThrow();

        if (!Objects.equals(Session.getSession().empId(), comment.getEmployee().getEmpId())) {
            throw new CustomException("댓글 작성자 본인이 아닙니다.");
        }

        comment.setIsDeleted(true);
    }

    public Optional<PostComment> findByCommentId(Long commentId) {
        return postCommentRepository.findByCommentIdAndIsDeletedFalse(commentId);
    }

    public void commentLikeCountUpdate(PostDTO dto) {
        PostComment comment = findByCommentId(dto.getCommentId()).orElseThrow();

        if (dto.getIsLiked()) {
            PostLikeEmployeeMapping mapping = postLikeEmployeeMappingRepository.findByComment_CommentIdAndEmployee_EmpId(dto.getCommentId(), Session.getSession().empId()).orElseThrow();
            postLikeEmployeeMappingRepository.delete(mapping);
            postCommentRepository.decrementLikeCount(comment.getCommentId());
        } else {
            PostLikeEmployeeMapping mapping = new PostLikeEmployeeMapping();
            mapping.setComment(comment);
            mapping.setEmployee(employeeService.getActiveEmployee(Session.getSession().empId()).orElseThrow());

            postLikeEmployeeMappingRepository.save(mapping);
            postCommentRepository.incrementLikeCount(comment.getCommentId());
        }
    }
}
