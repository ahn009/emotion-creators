#!/bin/bash

# EmotionCreator - Quick Start Script

echo "🚀 EmotionCreator Setup & Test"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  WARNING: .env.local not found!"
    echo "   Please create .env.local and add your Firebase credentials."
    echo "   See FIREBASE_SETUP.md for instructions."
    echo ""
else
    echo "✅ .env.local found"
    
    # Check if Firebase credentials are set
    if grep -q "your_api_key_here" .env.local; then
        echo "⚠️  WARNING: Firebase credentials not configured!"
        echo "   Please update .env.local with your actual Firebase credentials."
        echo "   See FIREBASE_SETUP.md for instructions."
        echo ""
    else
        echo "✅ Firebase credentials appear to be configured"
        echo ""
    fi
fi

# Check if Firebase is installed
if npm list firebase &> /dev/null; then
    echo "✅ Firebase package installed"
else
    echo "❌ Firebase package not found. Installing..."
    npm install firebase
fi

# Check if Supabase is removed
if npm list @supabase/supabase-js &> /dev/null; then
    echo "⚠️  Supabase package still installed. Removing..."
    npm uninstall @supabase/supabase-js
else
    echo "✅ Supabase package removed"
fi

echo ""
echo "================================"
echo "🎯 Setup Status"
echo "================================"
echo ""

# Test build
echo "🔨 Testing build..."
if npm run build &> /dev/null; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Check for errors above."
    exit 1
fi

echo ""
echo "================================"
echo "✨ Ready to Start!"
echo "================================"
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "Then open your browser to:"
echo "  http://localhost:5173"
echo ""
echo "📚 Documentation:"
echo "  - FIREBASE_SETUP.md - Firebase configuration guide"
echo "  - MIGRATION_SUMMARY.md - What changed in this migration"
echo "  - README.md - Project overview"
echo ""
echo "🔥 Don't forget to configure Firebase!"
echo "   See FIREBASE_SETUP.md for step-by-step instructions."
echo ""
