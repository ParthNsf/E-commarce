[
  { 
    $match: { 
      "posts.comments": "Interesting",
      skills: "JavaScript" 
    } 
  },
  { 
    $project: {
      name: 1, 
      posts: 1, 
      skills: 1 
      } 
    }
]
