#!/bin/bash

# Quick Fix Script for White Screen Issue

echo "🔧 EmotionCreator - White Screen Fix"
echo "===================================="
echo ""

# Kill any running dev servers
echo "1. Stopping any running dev servers..."
pkill -f vite 2>/dev/null
sleep 1

# Clear any build artifacts
echo "2. Clearing build cache..."
rm -rf dist .vite 2>/dev/null

# Reinstall dependencies if needed
if [ ! -d "node_modules/firebase" ]; then
    echo "3. Installing missing dependencies..."
    npm install
fi

# Start dev server
echo "3. Starting development server..."
npm run dev &
DEV_PID=$!

# Wait for server to start
echo "4. Waiting for server to start..."
sleep 5

# Check if server is running
if ps -p $DEV_PID > /dev/null; then
    echo ""
    echo "✅ Dev server started successfully!"
    echo ""
    echo "🌐 Open your browser to: http://localhost:5173"
    echo ""
    echo "📋 What to check:"
    echo "   1. You should see a dark background (not white)"
    echo "   2. Hero section with gradient text"
    echo "   3. Animated starfield background"
    echo "   4. Clickable buttons"
    echo ""
    echo "🐛 If still white screen:"
    echo "   1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)"
    echo "   2. Open DevTools (F12) and check Console for errors"
    echo "   3. Check Network tab to see if files are loading"
    echo "   4. See WHITE_SCREEN_FIX.md for detailed troubleshooting"
    echo ""
    echo "Press Ctrl+C to stop the dev server"
else
    echo ""
    echo "❌ Failed to start dev server"
    echo "   Check for errors above"
    echo ""
fi
