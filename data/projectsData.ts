interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Anonymous QA Forum (Powered by GraphQL and Relay)',
    description: `QA Forum is an anonymous question-answer platform where users can post questions, 
    provide answers, and upvote or downvote questions. The app ensures user anonymity through browser 
    fingerprinting, which uniquely identifies users without the need for personal information.`,
    imgSrc: '/static/images/google.png',
    href: 'https://www.google.com',
  },
  {
    title: 'SecureChat- A Discord Inspired Chat Application',
    description: `SecureChat is a robust full-stack chat application inspired by Discord's architecture. It leverages 
    tRPC for its RPC API and Phoenix/ Elixir for its WebSocket API, enabling real-time communication and event broadcasting 
    to clients. Message passing between services is facilitated by RabbitMQ.

For file storage needs, including user avatars and media, SecureChat utilizes SeaweedFS, which is an open source and self-hosted 
alternative to AWS S3. MongoDB serves as the primary database. On the frontend, SecureChat harnesses the capabilities of Next.js, 
a React meta framework known for its efficient server-side rendering and optimized performance.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/blog/the-time-machine',
  },
]

export default projectsData
