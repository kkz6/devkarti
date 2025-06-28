import React from 'react';
import Layout from '../layouts/Layout';

export default function About() {
  return (
    <Layout title="About" description="About DevKarti">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About DevKarti</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            Welcome to DevKarti, a personal blog dedicated to science, programming, and technology.
          </p>
          
          <h2>Why DevKarti?</h2>
          <p>
            There are several reasons for creating this blog. Long ago, I wanted to create a science blog, 
            which I could never complete. I wanted to create a course website, which I also never managed to do. 
            Instead of dwelling on things I was never able to complete, this blog represents what I have been 
            able to accomplish.
          </p>
          
          <p>
            This is my first-ever personal blog, created after working in this industry for more than seven years. 
            Now, I am going to share all the ideas I had for my science blog, programming course blog, or whatever 
            I find fascinating here.
          </p>
          
          <h2>What You'll Find Here</h2>
          <p>
            This is a completely personal blog that I dedicate to science, programming, and technology. 
            If I find something fascinating in science, I will write about it in exactly the way I understood it. 
            I will also write more about programming stuff, where you'll find content like programming hacks or 
            something you could never find on StackOverflow or something you followed from another blog and it 
            never worked for you.
          </p>
          
          <p>
            The idea is to have content that is working, and of course, something about new technology with 
            simple features that can make your daily work easy.
          </p>
          
          <h2>About the Author</h2>
          <p>
            I'm Karthick, a developer with over seven years of experience in the industry. I'm passionate about 
            sharing knowledge and helping others learn from my experiences.
          </p>
          
          <p>
            Happy reading!
          </p>
        </div>
      </div>
    </Layout>
  );
} 