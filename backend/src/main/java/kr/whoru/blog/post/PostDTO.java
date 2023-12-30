package kr.whoru.blog.post;

import io.hypersistence.tsid.TSID;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public record PostDTO(String id, String title, String content, String createAt) {
    public PostDTO(Post post) {
        this(TSID.from(post.id()).toString(), post.title(), post.content(),
                LocalDateTime
                        .ofInstant(Instant.ofEpochMilli(TSID.from(post.id()).getUnixMilliseconds()), ZoneId.of("Asia/Seoul"))
                        .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
        );
    }
}
