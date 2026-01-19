package com.project.groupware.controller;

import com.project.groupware.dto.PostCategoryDTO;
import com.project.groupware.dto.PostCommentDTO;
import com.project.groupware.dto.PostDTO;
import com.project.groupware.service.PostService;
import com.project.groupware.utils.PageObj;
import com.project.groupware.valid.groups.common.Save;
import com.project.groupware.valid.groups.common.Update;
import com.project.groupware.valid.groups.post.Like;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping(value = "/api/post", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<HttpStatus> postSave(@Validated(Save.class) @RequestPart("data") PostDTO dto, @RequestPart(name = "images", required = false) List<MultipartFile> images) {
        postService.postSave(dto, images);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/api/post/{postId}")
    public ResponseEntity<PostDTO> getPost(@PathVariable("postId") Long postId) {
        PostDTO post = postService.getPost(postId);

        return ResponseEntity.ok(post);
    }

    @GetMapping("/api/posts/{cateId}")
    public ResponseEntity<PageObj<PostDTO>> getPosts(@PathVariable("cateId") Integer cateId, @PageableDefault Pageable pageable) {
        PageObj<PostDTO> posts = postService.getPosts(cateId, pageable);

        return ResponseEntity.ok(posts);
    }

    @GetMapping("/api/post-categories")
    public ResponseEntity<List<PostCategoryDTO>> postCategories() {
        List<PostCategoryDTO> categories = postService.getPostCategories();

        return ResponseEntity.ok(categories);
    }

    @PatchMapping(value = "/api/post", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<HttpStatus> postUpdate(@Validated(Update.class) @RequestPart("data") PostDTO dto, @RequestPart(name = "images", required = false) List<MultipartFile> images) {
        postService.postUpdate(dto, images);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/api/post/{postId}")
    public ResponseEntity<HttpStatus> postDelete(@PathVariable("postId") Long postId) {
        postService.postDelete(postId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/api/post-like-count-update")
    public ResponseEntity<HttpStatus> postLikeCountUpdate(@RequestBody @Validated(Like.class) PostDTO dto) {
        postService.postLikeCountUpdate(dto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/api/post/{postId}/comments")
    public ResponseEntity<List<PostCommentDTO>> getComments(@PathVariable("postId") Long postId) {
        List<PostCommentDTO> comments = postService.getComments(postId);

        return ResponseEntity.ok(comments);
    }

    @PostMapping("/api/post/comment")
    public ResponseEntity<HttpStatus> commentSave(@Validated(Save.class) @RequestPart("data") PostCommentDTO dto, @RequestPart(name = "images", required = false) List<MultipartFile> images) {
        postService.commentSave(dto, images);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/api/post/comment")
    public ResponseEntity<HttpStatus> commentUpdate(@Validated(Update.class) @RequestPart("data") PostCommentDTO dto, @RequestPart(name = "images", required = false) List<MultipartFile> images) {
        postService.commentUpdate(dto, images);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/api/post/comment/{commentId}")
    public ResponseEntity<HttpStatus> commentDelete(@PathVariable("commentId") Long commentId) {
        postService.commentDelete(commentId);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
