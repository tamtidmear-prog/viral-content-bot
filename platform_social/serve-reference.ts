import index from "./view-reference.html";

Bun.serve({
  port: 3940,
  routes: {
    "/": index,
  },
});

console.log("Platform API Reference -> http://localhost:3940");
