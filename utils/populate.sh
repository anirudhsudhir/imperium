curl -H "Content-Type: application/json" \
  -X POST \
  -d '{"postTitle" : "Test Post 1", "postContent" : "Content of post 1"}' \
  http://localhost:8000/posts/create
