

Fetch the top 3 users with the most posts and, for each of those users, the latest comment they made. This should be achieved with efficient querying.

Answer: 
```
SELECT u.id, u.name, p.title, c.content
    FROM "Users" "u"
    LEFT JOIN "Posts" "p" ON u.id = "p"."userId"
    LEFT JOIN "Comments" "c" ON p.id = "c"."postId"
    WHERE "c"."createdAt" = (
      SELECT MAX("createdAt") FROM "Comments" WHERE "postId" = "p"."id"
    )
    ORDER BY (
      SELECT COUNT(*) FROM "Posts" WHERE "userId" = "u"."id"
    ) DESC
    LIMIT 3;
```

