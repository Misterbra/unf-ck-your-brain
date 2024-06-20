
# Unf*ck Your Brain

Welcome to **Unf*ck Your Brain**, an interactive project designed to help users overcome distractions, clarify their goals, and adopt a healthy lifestyle to achieve their ambitions.

## Project Description

Unf*ck Your Brain is an interactive application where users are guided by Elyan, a personal AI coach. Through immersive interactions, Elyan helps users explore their distractions, clearly define their goals, and adopt healthy lifestyle habits.

## Features

- **Immersive interaction** with Elyan, the personal AI coach.
- **Quest exploration** and discovery of personal missions.
- **Natural Language Processing API integration** for intelligent and tailored responses.

## Installation

Follow these steps to install and run the project locally:

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher) or yarn
- LM Studio (specific version for the Llama3 API)
- OpenAI account to use the ChatGPT API (if necessary)

### Clone the repository

```bash
git clone https://github.com/Misterbra/unf-ck-your-brain
cd unf-ck-your-brain
```

### Install dependencies
Use npm or yarn to install dependencies:

```bash
npm install
# or
yarn install
```

### Configuration
No need to have an .env file at the root of the project for API keys and other configurations.
Use your OpenAI key directly or use a local model.

### Start LM Studio
If you are using Llama3 with LM Studio, make sure to start LM Studio before starting the application.

Here are the steps to start LM Studio:
1. Download and install LM Studio from LM Studio.
2. Configure LM Studio with the Meta-Llama-3-8B-Instruct-GGUF model.
3. Start LM Studio and ensure it is listening on port 1234 (or configure the port in the .env file).

### Start the application

To start the application in development mode, run:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application in your browser.

### Usage
- **Home page**: Enter your name and choose your API provider to start the adventure.
- **Quests**: Interact with Elyan to explore your passions and discover meaningful missions.
- **Profile**: Track your progress and the quests you have discovered.

### Contribution

Contributions are welcome! If you wish to contribute, please follow these steps:
1. Fork the project.
2. Create a branch for your feature (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -m 'Add my feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Open a Pull Request.

### Author
MisterBra - Lead Developer - [GitHub Profile](https://github.com/Misterbra)

### License
This project is licensed under the MIT License - see the LICENSE file for details.

### Acknowledgments
- OpenAI for the Natural Language Processing API.
- Next.js for the development framework.
