package kr.whoru.blog.post;

import io.hypersistence.tsid.TSID;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping(value = "/post", produces = "application/json")
public class PostController {
    private final PostRepository postRepository;

    public PostController(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @GetMapping("")
    public ResponseEntity<Object> getPostList() {
        var postIterable = postRepository.findAllIdAndTitle();

        var postDTOList = StreamSupport.stream(postIterable.spliterator(), false)
                .map(PostDTO::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(postDTOList);
    }

    @GetMapping("{postId}")
    public ResponseEntity<Object> getPost(@PathVariable String postId) {
        var number = TSID.from(postId).toLong();
        var post = postRepository.findById(number).orElseThrow();

        return ResponseEntity.ok(new PostDTO(post));
    }

    @PostMapping("")
    public ResponseEntity<Object> createPost(@RequestBody Post post) {
        postRepository.insert(post.build());

        return ResponseEntity.ok(true);
    }
}
