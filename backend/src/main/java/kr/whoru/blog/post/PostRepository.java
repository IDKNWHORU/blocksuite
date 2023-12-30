package kr.whoru.blog.post;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

public interface PostRepository extends CrudRepository<Post, Long>, WithInsert<Post> {
    @Query("""
            select id, title, '' as content
              from post
             order by id
            """)
    Iterable<Post> findAllIdAndTitle();
}
