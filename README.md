# MyArtistHub

A comprehensive platform for independent musicians to create, produce, and market their music using AI-powered tools.

## Features

- **AI Album Cover Creator**: Generate unique album artwork using DALL-E AI
- **AI Audio Mastering** (Coming Soon): Professional sound quality with one-click AI mastering
- **Release Checklist** (Coming Soon): Stay organized with interactive release preparation checklists

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn
- OpenAI API key (for DALL-E integration)
- Firebase account (for authentication and storage)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/myartisthub.git
   cd myartisthub
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Copy `.env.local.template` to a new file named `.env.local`
   - Fill in your OpenAI API key and Firebase configuration

   ```
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
   ```

   - If you don't have an OpenAI API key, you can set `USE_REAL_API=false` to use mock data during development

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing DALL-E Integration

1. After setting up the environment variables, navigate to the AI Album Cover Creator at [http://localhost:3000/covers](http://localhost:3000/covers)

2. Enter a descriptive prompt for your album cover (e.g., "Afro house album with neon geometric patterns and a sunset")

3. Click "Generate Cover" and wait for the AI to create your image

4. Download or create a new image as needed

## Deploy on Firebase

1. Log in to Firebase:
   ```bash
   npm run firebase:login
   ```

2. Initialize Firebase (if not already done):
   ```bash
   npm run firebase:init
   ```

3. Build and deploy:
   ```bash
   npm run firebase:deploy
   ```

## Technology Stack

- **Frontend**: React/Next.js
- **Styling**: Tailwind CSS
- **Backend**: Firebase Functions/Vercel Serverless
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **AI Integration**: OpenAI DALL-E for images, more coming soon

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.