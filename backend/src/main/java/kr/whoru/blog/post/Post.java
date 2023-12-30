package kr.whoru.blog.post;

import io.hypersistence.tsid.TSID;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("post")
public record Post(String title, String content, @Id Long id) {
    public Post build() {
        var number = TSID.Factory.getTsid().toLong();

        return new Post(title, content, number);
    }
}
