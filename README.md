
# ClassEdge

## Live Site
- [ClassEdge Live Site](https://edumanage.example.com)

<div>
  <h1>Overview</h1>
  <p>This project is a full-stack course marketplace similar to Udemy. It enables students to enroll in courses upon payment, allows teachers to add new courses, and empowers admins to oversee and moderate all activities. The platform ensures a seamless and secure experience for learners and educators alike, offering robust features for course management </p>
</div>

## Features
1. Responsive design for mobile, tablet, and desktop.
2. Secure authentication with JWT.
3. Dynamic homepage with banners, partners, popular classes, and statistics.
4. Detailed class pages with enrollment and payment integration.
5. Comprehensive dashboards for students, teachers, and admins.
6. CRUD operations with custom notifications.
7. Teacher application and approval workflow.
8. Class and user management by admin.
9. Feedback and rating system.
10. Search functionality and pagination.

<div>
  <h2>Technologies</h2>
  <div>
    <img src="https://skillicons.dev/icons?i=html,css,javascript,react,tailwind" />
    <img src="https://skillicons.dev/icons?i=nodejs,express,firebase,mongodb" /><br>
 </div>
  <h1>Tools</h1>
  <img src="https://skillicons.dev/icons?i=vscode,github,git" />
</div>

## Portfolio
- [Portfolio Live](https://charlie-portfolio-17.netlify.app)

## How to Clone and Run the Project

### Prerequisites
- Node.js (v14.x or later)
- npm (v6.x or later)

### Steps
1. **Clone the repository:**
    ```bash
    git clone https://github.com/iamcharlie17/class-edge-client.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd class-edge-client
    ```
3. **Install dependencies:**
    ```bash
    npm install
    ```
4. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add the following variables (replace with your actual values):
     ```plaintext
     REACT_APP_API_URL=your_api_url
     REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
     REACT_APP_JWT_SECRET=your_jwt_secret
     ```
5. **Run the development server:**
    ```bash
    npm start
    ```

6. **Build for production:**
    ```bash
    npm run build
    ```

