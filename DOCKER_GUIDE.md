# Dream Ticket - Docker Development Guide

## Prerequisites

### Install Docker Desktop for Windows
1. Download Docker Desktop from: https://www.docker.com/products/docker-desktop/
2. Run the installer
3. Restart your computer
4. Open Docker Desktop and wait for it to start

### Verify Docker Installation
```powershell
docker --version
docker-compose --version
```

---

## Quick Start with Docker

### Option 1: Using Docker Compose (Recommended)

#### 1. Navigate to project directory
```powershell
cd "C:\Users\OMO BABA\Desktop\Dream-ticket\DreamTicket"
```

#### 2. Build and start the container
```powershell
docker-compose up --build
```

This will:
- Build the Docker image with Node.js 22
- Install all npm dependencies
- Start the development server
- Expose ports for Metro bundler and Expo

#### 3. Access your app
- Metro bundler: http://localhost:8081
- Expo DevTools: http://localhost:19000

---

### Option 2: Using Docker Commands Directly

#### 1. Pull Node.js image
```powershell
docker pull node:22-alpine
```

#### 2. Navigate to project directory
```powershell
cd "C:\Users\OMO BABA\Desktop\Dream-ticket\DreamTicket"
```

#### 3. Install dependencies in a container
```powershell
docker run -it --rm -v ${PWD}:/app -w /app node:22-alpine npm install
```

#### 4. Start development server
```powershell
docker run -it --rm -v ${PWD}:/app -w /app -p 8081:8081 -p 19000:19000 -p 19001:19001 -p 19002:19002 node:22-alpine npm start
```

---

## Common Docker Commands

### Start the development server
```powershell
docker-compose up
```

### Start in detached mode (background)
```powershell
docker-compose up -d
```

### Stop the containers
```powershell
docker-compose down
```

### View logs
```powershell
docker-compose logs -f
```

### Rebuild after code changes
```powershell
docker-compose up --build
```

### Run npm commands in container
```powershell
# Install a new package
docker-compose run --rm npm install <package-name>

# Run tests
docker-compose run --rm npm test

# TypeScript check
docker-compose run --rm npm run tsc --noEmit

# Add a package
docker-compose run --rm npm install --save react-native-vector-icons
```

### Open shell in container
```powershell
docker-compose exec dreamticket sh
```

Or if container isn't running:
```powershell
docker run -it --rm -v ${PWD}:/app -w /app node:22-alpine sh
```

---

## Development Workflow

### 1. Start Development Server
```powershell
cd "C:\Users\OMO BABA\Desktop\Dream-ticket\DreamTicket"
docker-compose up
```

### 2. Make Code Changes
Edit your TypeScript files in VSCode. Changes will be automatically detected due to volume mounting.

### 3. Run on Device/Emulator

**Using Expo Go (Easiest):**
1. Install Expo Go app on your phone
2. Make sure your phone and computer are on the same network
3. Scan the QR code shown in the terminal or at http://localhost:19000

**Using Android Emulator:**
```powershell
# Connect to emulator from container
docker-compose exec dreamticket npm run android
```

### 4. Stop Development Server
Press `Ctrl+C` or run:
```powershell
docker-compose down
```

---

## Useful Development Commands

### TypeScript Type Checking
```powershell
docker-compose run --rm npm run tsc --noEmit
```

### Lint Your Code
```powershell
docker-compose run --rm npm run lint
```

### Clear Metro Cache
```powershell
docker-compose run --rm npm start -- --reset-cache
```

### Install New Dependency
```powershell
# Regular dependency
docker-compose run --rm npm install <package-name>

# Dev dependency
docker-compose run --rm npm install --save-dev <package-name>
```

---

## Troubleshooting

### Port Already in Use
If you get a port conflict:
```powershell
# Stop all containers
docker-compose down

# Check what's using the port
netstat -ano | findstr :8081

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Container Won't Start
```powershell
# Remove all containers and rebuild
docker-compose down -v
docker-compose up --build
```

### Permission Issues (if any)
```powershell
# Run as administrator or check Docker Desktop settings
# Make sure file sharing is enabled for your drive
```

### Can't Connect to Expo
Make sure:
1. Your firewall allows Docker Desktop
2. Ports 19000-19002 are not blocked
3. Your phone and PC are on the same WiFi network

### Node Modules Issues
```powershell
# Remove node_modules and reinstall
docker-compose down -v
docker-compose run --rm npm install
docker-compose up
```

---

## Directory Structure in Docker

Inside the container, your project is mounted at `/app`:
```
/app
├── App.tsx
├── src/
├── package.json
├── tsconfig.json
├── node_modules/  (installed in container)
└── ...
```

---

## Performance Tips

1. **Use Alpine images** - Already configured (node:22-alpine)
2. **Volume caching** - Already configured for node_modules
3. **Don't install node_modules locally** - Let Docker handle it
4. **Use docker-compose** - Faster than manual docker commands

---

## Verify Setup

After starting your container, verify everything works:

```powershell
# Check Node.js version in container
docker-compose exec dreamticket node -v
# Should print: v22.21.0

# Check npm version
docker-compose exec dreamticket npm -v
# Should print: 10.9.4

# Check TypeScript
docker-compose exec dreamticket npx tsc --version
# Should print: Version 5.x.x

# List installed packages
docker-compose exec dreamticket npm list --depth=0
```

---

## Production Build (Future)

When ready to build for production:

```powershell
# Build Android APK
docker-compose run --rm npm run android -- --variant=release

# Build iOS (requires Mac)
docker-compose run --rm npm run ios -- --configuration Release
```

---

## Cleaning Up

### Remove containers
```powershell
docker-compose down
```

### Remove containers and volumes
```powershell
docker-compose down -v
```

### Remove all unused Docker data
```powershell
docker system prune -a
```

---

## Next Steps

1. **Install Docker Desktop** from https://www.docker.com/products/docker-desktop/
2. **Navigate to project**: `cd "C:\Users\OMO BABA\Desktop\Dream-ticket\DreamTicket"`
3. **Start development**: `docker-compose up --build`
4. **Open browser**: http://localhost:19000
5. **Scan QR code** with Expo Go app on your phone

Happy coding with Docker! 🐳🎫

