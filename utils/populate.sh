curl -v -X POST "localhost:8000/posts/create" \
  -d '{ \
  "postTitle" : "Test Post 1" \
  "postContent" : "Content of post 1" \
}'
