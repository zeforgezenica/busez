# 🚌 Zenica Bus Tracking Application

![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2025-blueviolet?style=for-the-badge)
![Open Source](https://img.shields.io/badge/Open--Source-💻-success?style=for-the-badge)
![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-brightgreen?style=for-the-badge)
![Made with Love](https://img.shields.io/badge/Made%20with-Love-orange?style=for-the-badge)

---

## 🌐 Live Application

🚍 **Visit Here:** [Zenica Bus Tracking](https://kadjebus.zeforge.ba)

Stay informed about **bus schedules and routes** in **Zenica, Bosnia and Herzegovina** with this open-source project.  
The app provides an easy and modern way to check public transport information across the city.

---

## 💡 About the Project

**Zenica Bus Tracking Application** allows users to:

- View live or scheduled bus routes in Zenica.
- Access clean and responsive UI built for both mobile and desktop.
- Experience real-time updates and accurate data visualization.

The project is maintained by **ZeForge Zenica Community** and welcomes open-source contributors!

---

## 🎨 Design Inspiration

Take a look at our design mockups on **Figma**:

- [🎨 Figma Idea #1](https://www.figma.com/design/Evsz1Ttu66byoB9j1dneq6/Untitled?node-id=2-2&t=tdBFS2mRirxmebKC-1)
- [🎨 Figma Idea #2](https://www.figma.com/design/5fO5ky3p3nOG1QhNoGyefi/Kad-je-bus?node-id=0-1&t=CgSKo3MISOQGqgrU-1)

---

## 🤝 Join the Community

Connect with other developers and contributors:

💬 [Join ZeForge Discord Server](https://discord.gg/x2enz95pDF)

---

## 🛠️ Getting Started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/en/download/)
- [pnpm](https://pnpm.io/installation)

---

### 🚀 Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/zeforgezenica/busez.git
cd busez
```

**Install Dependencies**

```bash
pnpm install
```

**Setup Environment Files**

For frontend:

```bash
cp ./frontend/.env.example ./frontend/.env.local
```

For backend:

```bash
cp ./backend/.env.example ./backend/.env
```

Note: Update the environment variables accordingly (API keys, DB credentials, etc.)

> [!NOTE]  
> If using Gmail, you may need to enable "Less secure app access" or use an App Password to authenticate.

4. **Run the Application**:

Run both the frontend and backend together:

```bash
pnpm turbo dev
```

5. **Lint and Test (Optional)**:

Before pushing changes consider running the linter and testing the applications locally

```bash
pnpm turbo run lint
```

```bash
pnpm turbo run test
```

> [!NOTE]  
> This step is optional as it will be done by a github action on push and pull request

**🌍 Access the App**

Once running locally, open:

👉 http://localhost:3000

**💪 Contributing**

We welcome all contributions — whether it’s improving documentation, fixing bugs, or adding new features.

- Fork the repository
- Create a branch for your feature
- Commit and push your changes
- Open a Pull Request

Join us this Hacktoberfest and make your mark in open source!

**⭐ Support the Project**

If you like this project, please star the repository on GitHub to show your support and help others discover it!

```

```
